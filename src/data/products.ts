export type Category = "electronics" | "home" | "outdoor";

export interface Product {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  price: number;
  category: Category;
  thumbnail: string;
  hero: string;
  gallery: string[];
}

export const categories: { slug: Category; label: string }[] = [
  { slug: "electronics", label: "Electronics" },
  { slug: "home", label: "Home" },
  { slug: "outdoor", label: "Outdoor" },
];

export const products: Product[] = [
  {
    id: "p1",
    title: "Wireless Headphones",
    description: "Noise-cancelling over-ear headphones with 30h battery.",
    longDescription:
      "Premium wireless headphones with adaptive noise cancellation, multipoint Bluetooth, and a fold-flat design for travel. Includes USB-C fast charging and a hard-shell carry case.",
    price: 249.99,
    category: "electronics",
    thumbnail: "https://picsum.photos/seed/vt-headphones/400/400",
    hero: "https://picsum.photos/seed/vt-headphones/1200/800",
    gallery: [
      "https://picsum.photos/seed/vt-headphones/1200/800",
      "https://picsum.photos/seed/vt-headphones-side/1200/800",
      "https://picsum.photos/seed/vt-headphones-case/1200/800",
    ],
  },
  {
    id: "p2",
    title: "Mechanical Keyboard",
    description: "Hot-swappable switches with per-key RGB lighting.",
    longDescription:
      "A compact 75% mechanical keyboard with gasket mount, PBT keycaps, and QMK/VIA support. Ideal for long typing sessions and late-night deploys.",
    price: 189.0,
    category: "electronics",
    thumbnail: "https://picsum.photos/seed/vt-keyboard/400/400",
    hero: "https://picsum.photos/seed/vt-keyboard/1200/800",
    gallery: [
      "https://picsum.photos/seed/vt-keyboard/1200/800",
      "https://picsum.photos/seed/vt-keyboard-angle/1200/800",
      "https://picsum.photos/seed/vt-keyboard-keys/1200/800",
    ],
  },
  {
    id: "p3",
    title: "4K Monitor",
    description: "27-inch IPS panel with USB-C power delivery.",
    longDescription:
      "Color-accurate 4K display with 99% sRGB coverage, built-in KVM, and a fully adjustable stand. Perfect for design reviews and side-by-side diffs.",
    price: 429.0,
    category: "electronics",
    thumbnail: "https://picsum.photos/seed/vt-monitor/400/400",
    hero: "https://picsum.photos/seed/vt-monitor/1200/800",
    gallery: [
      "https://picsum.photos/seed/vt-monitor/1200/800",
      "https://picsum.photos/seed/vt-monitor-stand/1200/800",
      "https://picsum.photos/seed/vt-monitor-ports/1200/800",
    ],
  },
  {
    id: "p4",
    title: "Smart Speaker",
    description: "Room-filling sound with voice assistant integration.",
    longDescription:
      "Multi-room audio speaker with far-field microphones, physical mute switch, and line-in support for legacy audio gear.",
    price: 129.99,
    category: "electronics",
    thumbnail: "https://picsum.photos/seed/vt-speaker/400/400",
    hero: "https://picsum.photos/seed/vt-speaker/1200/800",
    gallery: [
      "https://picsum.photos/seed/vt-speaker/1200/800",
      "https://picsum.photos/seed/vt-speaker-top/1200/800",
    ],
  },
  {
    id: "p5",
    title: "Ceramic Desk Lamp",
    description: "Warm dimmable light with touch controls.",
    longDescription:
      "Hand-glazed ceramic base with a linen shade. Three color temperatures and memory dimming for consistent evening focus.",
    price: 79.5,
    category: "home",
    thumbnail: "https://picsum.photos/seed/vt-lamp/400/400",
    hero: "https://picsum.photos/seed/vt-lamp/1200/800",
    gallery: [
      "https://picsum.photos/seed/vt-lamp/1200/800",
      "https://picsum.photos/seed/vt-lamp-glow/1200/800",
    ],
  },
  {
    id: "p6",
    title: "Pour-Over Kettle",
    description: "Gooseneck spout with precise temperature control.",
    longDescription:
      "Stainless steel electric kettle with 1°C increments, hold mode, and a balanced handle for slow pours.",
    price: 98.0,
    category: "home",
    thumbnail: "https://picsum.photos/seed/vt-kettle/400/400",
    hero: "https://picsum.photos/seed/vt-kettle/1200/800",
    gallery: [
      "https://picsum.photos/seed/vt-kettle/1200/800",
      "https://picsum.photos/seed/vt-kettle-pour/1200/800",
    ],
  },
  {
    id: "p7",
    title: "Linen Throw Blanket",
    description: "Breathable stonewashed linen in neutral tones.",
    longDescription:
      "Softened European linen with a relaxed weave. Machine washable and designed to layer on sofas or reading chairs.",
    price: 64.0,
    category: "home",
    thumbnail: "https://picsum.photos/seed/vt-blanket/400/400",
    hero: "https://picsum.photos/seed/vt-blanket/1200/800",
    gallery: [
      "https://picsum.photos/seed/vt-blanket/1200/800",
      "https://picsum.photos/seed/vt-blanket-fold/1200/800",
    ],
  },
  {
    id: "p8",
    title: "Stackable Storage Bins",
    description: "Modular bins with label slots and reinforced corners.",
    longDescription:
      "Set of six stackable bins for pantry or closet organization. Frosted sides hide clutter while keeping contents visible at a glance.",
    price: 42.0,
    category: "home",
    thumbnail: "https://picsum.photos/seed/vt-bins/400/400",
    hero: "https://picsum.photos/seed/vt-bins/1200/800",
    gallery: [
      "https://picsum.photos/seed/vt-bins/1200/800",
      "https://picsum.photos/seed/vt-bins-stack/1200/800",
    ],
  },
  {
    id: "p9",
    title: "Trail Running Shoes",
    description: "Lightweight grip for wet and rocky terrain.",
    longDescription:
      "Rock plate protection, drainage ports, and a secure heel counter. Built for long ascents and quick descents.",
    price: 139.0,
    category: "outdoor",
    thumbnail: "https://picsum.photos/seed/vt-shoes/400/400",
    hero: "https://picsum.photos/seed/vt-shoes/1200/800",
    gallery: [
      "https://picsum.photos/seed/vt-shoes/1200/800",
      "https://picsum.photos/seed/vt-shoes-sole/1200/800",
    ],
  },
  {
    id: "p10",
    title: "Packable Rain Jacket",
    description: "Waterproof shell that packs into its own pocket.",
    longDescription:
      "2.5-layer membrane with taped seams and adjustable hood. Packs down smaller than a water bottle.",
    price: 118.0,
    category: "outdoor",
    thumbnail: "https://picsum.photos/seed/vt-jacket/400/400",
    hero: "https://picsum.photos/seed/vt-jacket/1200/800",
    gallery: [
      "https://picsum.photos/seed/vt-jacket/1200/800",
      "https://picsum.photos/seed/vt-jacket-packed/1200/800",
    ],
  },
  {
    id: "p11",
    title: "Insulated Water Bottle",
    description: "24h cold / 12h hot with a leak-proof cap.",
    longDescription:
      "Double-wall vacuum insulation with a powder-coated finish. Wide mouth fits ice cubes and is easy to clean.",
    price: 34.0,
    category: "outdoor",
    thumbnail: "https://picsum.photos/seed/vt-bottle/400/400",
    hero: "https://picsum.photos/seed/vt-bottle/1200/800",
    gallery: [
      "https://picsum.photos/seed/vt-bottle/1200/800",
      "https://picsum.photos/seed/vt-bottle-cap/1200/800",
    ],
  },
  {
    id: "p12",
    title: "Camping Headlamp",
    description: "Rechargeable beam with red-light night mode.",
    longDescription:
      "Multiple brightness levels, tilt adjustment, and IPX4 weather resistance. Runtime up to 40 hours on low.",
    price: 49.99,
    category: "outdoor",
    thumbnail: "https://picsum.photos/seed/vt-headlamp/400/400",
    hero: "https://picsum.photos/seed/vt-headlamp/1200/800",
    gallery: [
      "https://picsum.photos/seed/vt-headlamp/1200/800",
      "https://picsum.photos/seed/vt-headlamp-beam/1200/800",
    ],
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(category: Category): Product[] {
  return products.filter((p) => p.category === category);
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

export function productTransitionName(
  id: string,
  part: "image" | "title" | "price",
): string {
  return `product-${id}-${part}`;
}

export function productTransitionNameStaleDetail(
  id: string,
  part: "image" | "title" | "price",
): string {
  return `stale-detail-${part}-${id}`;
}
