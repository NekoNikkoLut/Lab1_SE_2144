// GearHubLogo.tsx
// Reusable logo icon for GearHub — shopping bag with a gear-shaped handle.
// Uses currentColor so it inherits text color from its parent (theme-friendly,
// works automatically in light/dark mode without a separate asset).
//
// Usage:
//   <GearHubLogo size={32} />
//   <GearHubLogo size={20} className="text-teal-700" />

import type { SVGProps } from "react";

interface GearHubLogoProps extends SVGProps<SVGSVGElement> {
  size?: number;
}

export default function GearHubLogo({
  size = 32,
  className = "",
  ...props
}: GearHubLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 96 106"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="GearHub logo"
      {...props}
    >
      {/* Bag body */}
      <path
        d="M8 30 L88 30 L80 100 L16 100 Z"
        stroke="currentColor"
        strokeWidth={5}
        strokeLinejoin="round"
      />

      {/* Gear handle group, centered above the bag opening */}
      <g transform="translate(48, 26)">
        {/* Outer gear ring (solid teeth) */}
        <circle r={20} stroke="currentColor" strokeWidth={6} />
        <circle
          r={20}
          stroke="currentColor"
          strokeWidth={6}
          strokeDasharray="5 9"
        />
        {/* Inner hub */}
        <circle r={8} stroke="currentColor" strokeWidth={5} />
      </g>
    </svg>
  );
}