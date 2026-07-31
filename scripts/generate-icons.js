// One-off icon generator for GearHub.
// Produces public/favicon.svg, favicon.png, icon-192.png, icon-512.png
// and prints the SVG body path for reuse in the React component.
// Pure Node — only zlib for PNG encoding.

const zlib = require('zlib');
const fs = require('fs');
const path = require('path');

// --- Geometry (viewBox 0 0 100 100) --------------------------------
const CX = 50;
const CY = 48;
const R_OUTER = 34; // ring outer radius
const R_INNER = 25; // ring inner radius
const R_TOOTH = 41; // tooth tip radius
const TEETH = 8;
const TOOTH_HALF = 8; // half-width of a tooth, in degrees
const STEP = 360 / TEETH;
const START = 22.5; // first tooth center angle

const rad = (d) => (d * Math.PI) / 180;
const polar = (r, d) => [CX + r * Math.cos(rad(d)), CY + r * Math.sin(rad(d))];

function arc(r, from, to, steps) {
  const pts = [];
  for (let i = 0; i <= steps; i++) {
    pts.push(polar(r, from + ((to - from) * i) / steps));
  }
  return pts;
}

// Build the outer contour (ring + teeth + bottom tag point), then the
// inner contour traced back the other way. Concatenated, this is a single
// closed ring polygon (the tag point is folded into the outer contour).
function buildContour() {
  const outer = [polar(R_OUTER, 0)];
  let prevEnd = 0;
  for (let k = 0; k < TEETH; k++) {
    const center = START + STEP * k;
    const toothStart = center - TOOTH_HALF;
    const toothEnd = center + TOOTH_HALF;

    if (prevEnd < 90 && toothStart > 90) {
      outer.push(polar(R_OUTER, prevEnd));
      outer.push([50, 99]); // tag point apex
      outer.push(polar(R_OUTER, toothStart));
    } else if (prevEnd !== toothStart) {
      outer.push(...arc(R_OUTER, prevEnd, toothStart, 2));
    }

    outer.push(polar(R_TOOTH, toothStart));
    outer.push(...arc(R_TOOTH, toothStart, toothEnd, 4));
    outer.push(polar(R_OUTER, toothEnd));
    prevEnd = toothEnd;
  }
  if (prevEnd < 360) outer.push(...arc(R_OUTER, prevEnd, 360, 2));

  const inner = arc(R_INNER, 0, 360, 48).reverse();
  return outer.concat(inner);
}

const contour = buildContour();

function pathD(points) {
  return (
    points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0].toFixed(2)} ${p[1].toFixed(2)}`).join(' ') + ' Z'
  );
}

const HANG_HOLE = { x: 50, y: 18.5, r: 4.5 };
const hangHoleD =
  `M${HANG_HOLE.x - HANG_HOLE.r} ${HANG_HOLE.y} ` +
  `a${HANG_HOLE.r} ${HANG_HOLE.r} 0 1 0 ${HANG_HOLE.r * 2} 0 ` +
  `a${HANG_HOLE.r} ${HANG_HOLE.r} 0 1 0 ${-HANG_HOLE.r * 2} 0 Z`;

const bodyD = pathD(contour);

// --- Raster helpers -------------------------------------------------
function windingNumber(poly, x, y) {
  let wn = 0;
  const n = poly.length;
  for (let i = 0; i < n; i++) {
    const a = poly[i];
    const b = poly[(i + 1) % n];
    const cross = (b[0] - a[0]) * (y - a[1]) - (x - a[0]) * (b[1] - a[1]);
    if (a[1] <= y) {
      if (b[1] > y && cross > 0) wn++;
    } else if (b[1] <= y && cross < 0) {
      wn--;
    }
  }
  return wn;
}

function inRoundedRect(x, y, rx) {
  const dx = Math.max(rx - x, x - (100 - rx), 0);
  const dy = Math.max(rx - y, y - (100 - rx), 0);
  return dx * dx + dy * dy <= rx * rx;
}

function inMark(x, y) {
  const winding = windingNumber(contour, x, y);
  if (winding === 0) return false;
  if (Math.hypot(x - HANG_HOLE.x, y - HANG_HOLE.y) <= HANG_HOLE.r) return false;
  return true;
}

const AMBER = [242, 165, 26];
const GRAPHITE = [25, 28, 24];

function renderPng(size) {
  const scale = size / 100;
  const ss = 4; // supersampling factor
  const rgba = Buffer.alloc(size * size * 4);

  for (let py = 0; py < size; py++) {
    for (let px = 0; px < size; px++) {
      let r = 0;
      let g = 0;
      let b = 0;
      let a = 0;
      for (let sy = 0; sy < ss; sy++) {
        for (let sx = 0; sx < ss; sx++) {
          const u = (px + (sx + 0.5) / ss) / scale;
          const v = (py + (sy + 0.5) / ss) / scale;
          if (!inRoundedRect(u, v, 22)) continue;
          const color = inMark(u, v) ? GRAPHITE : AMBER;
          r += color[0];
          g += color[1];
          b += color[2];
          a += 255;
        }
      }
      const n = ss * ss;
      const o = (py * size + px) * 4;
      rgba[o] = Math.round(r / n);
      rgba[o + 1] = Math.round(g / n);
      rgba[o + 2] = Math.round(b / n);
      rgba[o + 3] = Math.round(a / n);
    }
  }
  return rgba;
}

// --- PNG encoding ---------------------------------------------------
function crc32(buf) {
  let table = crc32.table;
  if (!table) {
    table = crc32.table = new Int32Array(256);
    for (let n = 0; n < 256; n++) {
      let c = n;
      for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
      table[n] = c;
    }
  }
  let crc = -1;
  for (let i = 0; i < buf.length; i++) crc = table[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  return (crc ^ -1) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const typeBuf = Buffer.from(type, 'ascii');
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])));
  return Buffer.concat([len, typeBuf, data, crcBuf]);
}

function encodePng(size, rgba) {
  const sig = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8;
  ihdr[9] = 6; // RGBA
  const raw = Buffer.alloc((size * 4 + 1) * size);
  for (let y = 0; y < size; y++) {
    raw[y * (size * 4 + 1)] = 0;
    rgba.copy(raw, y * (size * 4 + 1) + 1, y * size * 4, (y + 1) * size * 4);
  }
  const idat = zlib.deflateSync(raw);
  return Buffer.concat([sig, chunk('IHDR', ihdr), chunk('IDAT', idat), chunk('IEND', Buffer.alloc(0))]);
}

// --- ASCII preview --------------------------------------------------
function asciiPreview() {
  const w = 44;
  const lines = [];
  for (let py = 0; py < w; py++) {
    let line = '';
    for (let px = 0; px < w; px++) {
      const u = (px / w) * 104 - 2;
      const v = (py / w) * 104 - 2;
      line += inMark(u, v) ? '#' : inRoundedRect(u, v, 22) ? '.' : ' ';
    }
    lines.push(line);
  }
  return lines.join('\n');
}

// --- Write outputs --------------------------------------------------
const publicDir = path.join(__dirname, '..', 'public');

const faviconSvg =
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">\n` +
  `  <rect width="100" height="100" rx="22" fill="#F2A51A"/>\n` +
  `  <path fill-rule="evenodd" fill="#191C18" d="${bodyD} ${hangHoleD}"/>\n` +
  `</svg>\n`;

fs.writeFileSync(path.join(publicDir, 'favicon.svg'), faviconSvg);
fs.writeFileSync(path.join(publicDir, 'favicon.png'), encodePng(64, renderPng(64)));
fs.writeFileSync(path.join(publicDir, 'icon-192.png'), encodePng(192, renderPng(192)));
fs.writeFileSync(path.join(publicDir, 'icon-512.png'), encodePng(512, renderPng(512)));

console.log('--- ASCII preview (44px) ---');
console.log(asciiPreview());
console.log('--- bodyD ---');
console.log(bodyD);
console.log('--- files written ---');
