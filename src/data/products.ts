import type { Product } from '../types';

export const products: Product[] = [
  {
    id: 'gaming-01',
    name: 'PlayStation 4 Console',
    category: 'Gaming',
    price: 4800.00,
    image: '/images/PS4.jpg',
    description: 'Pre-loved unit in great working condition.\nComes with 1 free game disc of your choice.',
    inStock: true,
  },
  {
    id: 'camera-01',
    name: 'INSTAX Mini 40',
    category: 'Cameras',
    price: 4999.00,
    image: '/images/INSTAX-Mini-40.jpg',
    images: ['/images/INSTAX-Mini-40(2).jpg'],
    description: 'Used only once.\nIn pristine condition — good as brand new.',
    inStock: true,
  },
  {
    id: 'phone-01',
    name: 'Honor x9D',
    category: 'Phones',
    price: 13990.00,
    image: '/images/Honor x9D.jpg',
    images: ['/images/Honor x9D(2).jpg', '/images/Honor x9D(3).jpg'],
    description: 'For only 13,990✨\nHonor x9D - 12+12gbram/256gbrom for sale\n12+12gbram/256gbrom\nSnapdragon 6 Gen 4 MagicOS 10\n8300mah\n5G network\nRear Cameras: 108MP main sensor (F1.75) + 5MP ultra-wide sensor. Front Camera: 16MP selfie camera.\nSMOOOOOOTH SMOOOTH GAMITON\nUnit alone\nNO ISSUE AT ALL ‼️\nHAMIS HAMIS PA GD 💯\nCheck all you want upon meet up',
    inStock: true,
  },
  {
    id: 'mouse-01',
    name: 'Logitech MX Master 3S',
    category: 'Mouse',
    price: 99.99,
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=800&q=80',
    inStock: true,
  },
  {
    id: 'audio-01',
    name: 'Sony WH-1000XM5 Headphones',
    category: 'Audio',
    price: 349.99,
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80',
    inStock: true,
  },
  {
    id: 'charging-01',
    name: 'Anker 65W USB-C Charger',
    category: 'Chargers',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80',
    inStock: true,
  },
  {
    id: 'storage-01',
    name: 'Samsung T7 Portable SSD',
    category: 'Storage',
    price: 119.99,
    image: 'https://images.unsplash.com/photo-1531492746076-161ca9bcad58?auto=format&fit=crop&w=800&q=80',
    inStock: false,
  },
  {
    id: 'accessory-01',
    name: 'Aluminum Laptop Stand',
    category: 'Accessories',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=800&q=80',
    inStock: true,
  },
  {
    id: 'audio-02',
    name: 'JBL Flip 6 Speaker',
    category: 'Audio',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=800&q=80',
    inStock: true,
  },
  {
    id: 'accessory-02',
    name: 'Logitech Brio 4K Webcam',
    category: 'Accessories',
    price: 159.99,
    image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=800&q=80',
    inStock: false,
  },
  {
    id: 'phone-02',
    name: 'iPhone 12',
    category: 'Phones',
    price: 15500.00,
    image: '/images/iPhone 12.jpg',
    images: ["/images/iPhone 12.jpg(2)", "/images/iPhone 12.jpg(3)"],
    description: "ONHAND NOW \n100%BH \nOpenline any sim\nFace id working\nTrue tone working\nsafe to reset\nwith case and cord",
    inStock: true
  },
  {
    id: 'tablet-01',
    name: 'Redmi Pad 2',
    category: 'iPads/Tablets',
    price: 13500.00,
    image: '/images/Redmi pad 2.jpg',
    images: ["/images/Redmi pad 2(2).jpg"],
    description: "ONHAND NOW! \nRedmi pad 2 4/256gb \nwifi used \nbrand new",
    inStock: true
  },
  {
    id: 'laptop-01',
    name: 'Apple MacBook Pro 2017 (Touch Bar & Touch ID)',
    category: 'Laptops',
    price: 23999.00,
    image: '/images/Apple MacBook Pro 2017.jpg',
    images: ["/images/Apple MacBook Pro 2017(2).jpg", "/images/Apple MacBook Pro 2017(3).jpg"],
    description: `
    \n✨ Specs: • 13.3" Retina Display (2560×1600) • Touch Bar + Touch ID (Fingerprint Sensor) • Intel Core i5 Processor • 16GB RAM • 256GB Apple PCIe SSD ( Fast Boot) • Intel Iris Plus Graphics 650 • 4× Thunderbolt 3 (USB-C) Ports • Backlit Keyboard • Force Touch Trackpad • Wi-Fi & Bluetooth • macOS Ready • Microsft Office Ready (Activated)
    \n✅ Fast, smooth, and reliable for work, school, programming, online meetings, photo editing, and everyday use.
    \nIncludes: Charger
    \nNo Issue, Good Battery
    \nPM for more photos or any questions. First come, first served!`,
    inStock: true
  }

];
