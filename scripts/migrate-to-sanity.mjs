/**
 * PlasterPro Ghana — Sanity Data Migration Script
 *
 * Uploads all local images and creates all Sanity documents in one shot.
 *
 * Usage:
 *   SANITY_TOKEN=your_editor_token node scripts/migrate-to-sanity.mjs
 */

import { createClient } from "@sanity/client";
import { createReadStream, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ASSETS_DIR = join(__dirname, "../src/assets");

// ── Sanity client (write access) ──────────────────────────────────────────────

if (!process.env.SANITY_TOKEN) {
  console.error("\n❌  SANITY_TOKEN env var is required.");
  console.error(
    "    Usage: SANITY_TOKEN=your_token node scripts/migrate-to-sanity.mjs\n"
  );
  process.exit(1);
}

const client = createClient({
  projectId: "jx4w8pg1",
  dataset: "production",
  token: process.env.SANITY_TOKEN,
  apiVersion: "2024-01-01",
  useCdn: false,
});

// ── Helpers ───────────────────────────────────────────────────────────────────

const assetCache = new Map(); // filename → uploaded asset _id

function rkey() {
  return Math.random().toString(36).slice(2, 10);
}

async function uploadImage(filename) {
  if (assetCache.has(filename)) return assetCache.get(filename);

  const filepath = join(ASSETS_DIR, filename);
  if (!existsSync(filepath)) {
    console.warn(`  ⚠  Not found, skipping: ${filename}`);
    return null;
  }

  const ext = filename.split(".").pop().toLowerCase();
  const contentType =
    ext === "jpg" || ext === "jpeg" ? "image/jpeg" : "image/png";

  process.stdout.write(`  ↑  ${filename} ...`);
  const asset = await client.assets.upload(
    "image",
    createReadStream(filepath),
    { filename, contentType }
  );
  console.log(" ✓");

  assetCache.set(filename, asset._id);
  return asset._id;
}

async function buildImageArray(filenames) {
  const refs = [];
  for (const f of filenames) {
    const id = await uploadImage(f);
    if (id) {
      refs.push({
        _type: "image",
        _key: rkey(),
        asset: { _type: "reference", _ref: id },
      });
    }
  }
  return refs;
}

async function upsert(doc) {
  return client.createOrReplace(doc);
}

// ── Data ──────────────────────────────────────────────────────────────────────

const showcaseData = [
  {
    _id: "showcase-pop-cement",
    title: "POP Cement (Plaster of Paris Cement)",
    description:
      "High-quality Plaster of Paris (POP) ceiling designs for modern homes and offices. Enhances aesthetics and improves interior ambiance.",
    badge: "Best Seller",
    displayOrder: 1,
    detailDescription:
      "Plaster of Paris (POP) Cement is a fine, white powder derived from gypsum (calcium sulfate dihydrate), which, when mixed with water, forms a quick-setting paste that hardens over time. It is widely used for ceiling molding, wall coatings, false ceilings, and decorative elements.",
    keyFeatures: [
      "Smooth Finish – Ideal for interior walls and ceilings.",
      "Fast Drying – Sets in 10-15 minutes, fully cures within 24 hours.",
      "Lightweight & Crack-Resistant – Reduces surface shrinkage.",
      "Fire-Resistant & Non-Toxic – Enhances safety in buildings.",
    ],
    commonUses:
      "False ceilings, wall decorations, cornices, medallions, and molding designs.",
    imageFiles: [
      "popcement.jpeg",
      "popcement 1.jpeg",
      "popcement 2.jpeg",
      "popcement 3.jpeg",
      "sativo.jpeg",
    ],
  },
  {
    _id: "showcase-room-lighting",
    title: "Room Lighting Solutions",
    description:
      "Professional installation of stylish and energy-efficient lighting for residential and commercial spaces.",
    badge: "New",
    displayOrder: 2,
    detailDescription:
      "Professional lighting solutions designed to enhance the ambiance and functionality of any space. Our options include modern fixtures for both aesthetic appeal and practical illumination.",
    keyFeatures: [
      "Energy-Efficient Designs – Reduces electricity consumption.",
      "Customizable Brightness – Adjustable to suit different needs.",
      "Modern Aesthetics – Enhances interior design.",
      "Professional Installation – Ensures safety and optimal positioning.",
    ],
    commonUses:
      "Living rooms, offices, kitchens, showrooms, and commercial spaces.",
    imageFiles: ["lighting1.jpg", "lighting2.jpg", "lighting3.jpg", "lighting4.jpg"],
  },
  {
    _id: "showcase-hardware-installation",
    title: "Hardware Installation Services",
    description:
      "Expert installation of various building hardware, including ceiling frames, wall brackets, and electrical fittings.",
    badge: "Premium",
    displayOrder: 3,
    detailDescription:
      "Professional installation services for all types of building hardware components. Our experienced team ensures proper fitting and functionality.",
    keyFeatures: [
      "Expert Technicians – Trained in industry best practices.",
      "Quality Assurance – Rigorous testing after installation.",
      "Time-Efficient – Minimizes disruption to your space.",
      "Comprehensive Service – Handles all hardware types.",
    ],
    commonUses:
      "Ceiling frames, wall brackets, electrical fittings, doors and windows hardware.",
    imageFiles: [
      "metalic channel.jpeg",
      "metalic channel 1.jpeg",
      "metalic channel 2.jpeg",
      "drywallscrews.jpg",
      "galvanisedprofiles.jpg",
      "tappingscrew.jpg",
      "tappingscrew2.jpeg",
    ],
  },
  {
    _id: "showcase-repairs-maintenance",
    title: "Repairs & Maintenance",
    description:
      "Reliable repairs and maintenance services for ceilings, walls, and lighting fixtures to keep your space in top condition.",
    badge: "Community",
    displayOrder: 4,
    detailDescription:
      "Complete repair and maintenance services to keep your property in pristine condition. We handle all aspects of ceiling, wall, and lighting maintenance.",
    keyFeatures: [
      "Prompt Response – Quick attention to urgent issues.",
      "Preventative Care – Identifies potential problems early.",
      "Skilled Technicians – Experienced in various repair types.",
      "Quality Materials – Uses only industry-approved products.",
    ],
    commonUses:
      "Damaged ceilings, wall cracks, lighting issues, routine maintenance checks.",
    imageFiles: ["poptruck.jpg", "fiber 1.jpeg", "fiber.jpeg"],
  },
  {
    _id: "showcase-plasterboard",
    title: "Plasterboard (Gypsum Board / Drywall)",
    description:
      "Sandwich-like panels with a gypsum core for partition walls, ceilings, and wall linings. Easy to install with excellent finishing properties.",
    badge: "Versatile",
    displayOrder: 5,
    detailDescription:
      "Plasterboard, also called drywall or gypsum board, is a sandwich-like panel consisting of a gypsum core pressed between two sheets of paper or fiberglass. It is commonly used for partition walls, ceilings, and wall linings.",
    keyFeatures: [
      "Quick & Easy Installation – Reduces construction time.",
      "Smooth, Paintable Surface – Ideal for finishing.",
      "Fire-Resistant & Soundproofing Capabilities – Improves safety and acoustics.",
      "Moisture-Resistant Options Available – Perfect for bathrooms & kitchens.",
    ],
    commonUses:
      "Wall partitions, false ceilings, and commercial & residential interiors.",
    imageFiles: ["plasterboard.jpeg", "plasterboard 1.jpeg", "plasterboard 3.jpeg"],
  },
  {
    _id: "showcase-fiber-ceiling",
    title: "Fiber Ceiling Boards",
    description:
      "Compressed mineral fiber boards providing acoustic insulation, fire resistance, and durability for commercial and office ceilings.",
    badge: "Commercial",
    displayOrder: 6,
    detailDescription:
      "Fiber ceiling boards are made of compressed mineral fibers, which provide excellent acoustic insulation, fire resistance, and durability. They are ideal for commercial and office ceilings.",
    keyFeatures: [
      "Durable & Moisture-Resistant – Great for humid environments.",
      "Excellent Acoustic Performance – Reduces noise pollution.",
      "Fire-Resistant – Enhances safety in buildings.",
      "Eco-Friendly – Made with natural & recycled materials.",
    ],
    commonUses:
      "Suspended ceilings in offices, schools, hospitals, and shopping malls.",
    imageFiles: ["fiber 1.jpeg", "fiber.jpeg", "poptruck.jpg"],
  },
  {
    _id: "showcase-home-charm-paints",
    title: "Home Charm Paints",
    description:
      "Premium wall coatings with long-lasting color, smooth finishes, and protection against environmental damage.",
    badge: "Eco-Friendly",
    displayOrder: 7,
    detailDescription:
      "Home Charm Paints are premium-quality wall coatings designed to provide long-lasting color, smooth finishes, and protection against environmental damage.",
    keyFeatures: [
      "Vibrant, Long-Lasting Colors – Fade-resistant technology.",
      "Easy to Apply & Quick Drying – Low maintenance and hassle-free.",
      "Washable & Stain-Resistant – Great for high-traffic areas.",
      "Low VOC (Volatile Organic Compounds) – Eco-friendly and non-toxic.",
    ],
    commonUses:
      "Interior & exterior walls, ceilings, trims, and decorative finishes.",
    imageFiles: ["Homecharmp.jpeg", "white glue.jpeg", "popbucket.jpg"],
  },
  {
    _id: "showcase-decorative-panels",
    title: "Decorative Panels",
    description:
      "Artistic, textured 3D panels to enhance wall and ceiling aesthetics with various patterns, textures, and finishes.",
    badge: "Luxury",
    displayOrder: 8,
    detailDescription:
      "Decorative panels are artistic, textured panels used to enhance wall and ceiling aesthetics. They come in various patterns, textures, and finishes.",
    keyFeatures: [
      "Visually Appealing & Luxurious Designs – Elevates interior décor.",
      "Durable & Impact-Resistant – Long-lasting beauty.",
      "Moisture & Fire-Resistant Options Available – Suitable for various environments.",
    ],
    commonUses:
      "Feature walls, luxury ceilings, hotel lobbies, and interior design accents.",
    imageFiles: [
      "kitchenInterior.jpg",
      "outdoorinetrior.jpg",
      "basement.jpeg",
      "ceiling2.jpg",
      "ceiling3.jpg",
      "room curtains.jpeg",
    ],
  },
];

const productsData = [
  {
    _id: "product-pop-ceiling-installation",
    title: "POP Ceiling Installation",
    description:
      "High-quality Plaster of Paris (POP) ceiling designs for modern homes and offices.",
    category: "Ceilings",
    rating: 4.8,
    displayOrder: 1,
    imageFiles: ["ceiling1.jpg", "ceiling2.jpg", "ceiling3.jpg", "ceiling4.jpg"],
  },
  {
    _id: "product-room-lighting",
    title: "Room Lighting Solutions",
    description:
      "Professional installation of stylish and energy-efficient lighting for interiors.",
    category: "Lighting",
    rating: 4.6,
    displayOrder: 2,
    imageFiles: ["lighting1.jpg", "lighting2.jpg", "lighting3.jpg", "lighting4.jpg"],
  },
  {
    _id: "product-tapping-screws",
    title: "Tapping Screws",
    description:
      "Durable tapping screws for securing metal and wood surfaces with precision.",
    category: "Hardware",
    rating: 4.3,
    displayOrder: 3,
    imageFiles: ["tappingscrew.jpg", "drywallscrews.jpg", "wwallangle.jpg", "galvanisedprofiles.jpg"],
  },
  {
    _id: "product-drywall-screws",
    title: "Drywall Screws",
    description:
      "Reliable drywall screws for securing plasterboard installations with ease.",
    category: "Hardware",
    rating: 4.7,
    displayOrder: 4,
    imageFiles: ["drywallscrews.jpg", "tappingscrew.jpg", "tappingscrew2.jpeg"],
  },
  {
    _id: "product-wall-angle-brackets",
    title: "Wall Angle Brackets",
    description:
      "Premium wall angle brackets for strong and lasting interior structures.",
    category: "Hardware",
    rating: 4.5,
    displayOrder: 5,
    imageFiles: ["wwallangle.jpg", "galvanisedprofiles.jpg", "tappingscrew.jpg"],
  },
  {
    _id: "product-galvanized-profiles",
    title: "Galvanized Profiles",
    description:
      "Corrosion-resistant galvanized profiles for durable ceiling and wall support.",
    category: "Profiles",
    rating: 4.9,
    displayOrder: 6,
    imageFiles: ["galvanisedprofiles.jpg", "wwallangle.jpg", "ceiling2.jpg", "ceiling3.jpg"],
  },
  {
    _id: "product-hardware-installation",
    title: "Hardware Installation Services",
    description:
      "Expert installation of various building hardware for residential and commercial spaces.",
    category: "Services",
    rating: 5.0,
    displayOrder: 7,
    imageFiles: ["roomdeco1.jpg", "roomdeco.jpg", "curtains.jpg", "tappingscrew.jpg"],
  },
  {
    _id: "product-repairs-maintenance",
    title: "Repairs & Maintenance",
    description:
      "Professional repair and maintenance services for ceilings, walls, and lighting fixtures.",
    category: "Services",
    rating: 4.4,
    displayOrder: 8,
    imageFiles: ["poptruck.jpg", "ceiling1.jpg", "drywallscrews.jpg", "wwallangle.jpg"],
  },
  {
    _id: "product-metallic-channels",
    title: "Metallic Channels",
    description:
      "Galvanized steel and aluminum profiles used for suspending ceilings, holding ceiling boards, and supporting gypsum or fiber ceiling panels.",
    category: "Profiles",
    rating: 4.7,
    displayOrder: 9,
    imageFiles: ["metalic channel.jpeg", "metalic channel 1.jpeg", "metalic channel 2.jpeg"],
  },
  {
    _id: "product-pop-cement",
    title: "POP Cement (Plaster of Paris Cement)",
    description:
      "Fine white powder that sets quickly into a hard surface. Ideal for ceiling molding, wall coatings, false ceilings, and decorative elements.",
    category: "Materials",
    rating: 4.8,
    displayOrder: 10,
    imageFiles: [
      "popcement.jpeg",
      "popcement 1.jpeg",
      "popcement 2.jpeg",
      "popcement 3.jpeg",
      "sativo.jpeg",
    ],
  },
  {
    _id: "product-plasterboard",
    title: "Plasterboard (Gypsum Board / Drywall)",
    description:
      "Sandwich-like panels with a gypsum core for partition walls, ceilings, and wall linings. Easy to install with excellent finishing properties.",
    category: "Materials",
    rating: 4.6,
    displayOrder: 11,
    imageFiles: ["plasterboard.jpeg", "plasterboard 1.jpeg", "plasterboard 3.jpeg"],
  },
  {
    _id: "product-fiber-ceiling-boards",
    title: "Fiber Ceiling Boards",
    description:
      "Compressed mineral fiber boards providing excellent acoustic insulation, fire resistance, and durability for commercial and office ceilings.",
    category: "Ceilings",
    rating: 4.5,
    displayOrder: 12,
    imageFiles: ["fiber.jpeg", "fiber 1.jpeg", "poptruck.jpg"],
  },
  {
    _id: "product-home-charm-paints",
    title: "Home Charm Paints",
    description:
      "Premium wall coatings with long-lasting color, smooth finishes, and protection against environmental damage. Low VOC and eco-friendly.",
    category: "Paints",
    rating: 4.7,
    displayOrder: 13,
    imageFiles: ["Homecharmp.jpeg", "white glue.jpeg", "popbucket.jpg"],
  },
  {
    _id: "product-decorative-panels",
    title: "Decorative Panels",
    description:
      "Artistic, textured 3D panels to enhance wall and ceiling aesthetics with various patterns, textures, and finishes for luxury interiors.",
    category: "Ceilings",
    rating: 4.6,
    displayOrder: 14,
    imageFiles: [
      "kitchenInterior.jpg",
      "outdoorinetrior.jpg",
      "basement.jpeg",
      "ceiling2.jpg",
      "ceiling3.jpg",
      "room curtains.jpeg",
    ],
  },
];

const siteSettingsData = {
  _id: "siteSettings",
  _type: "siteSettings",
  heroHeadline: "Elevate Your Space with PlasterPro Ghana",
  heroSubtext:
    "Welcome to PlasterPro Ghana. Your number one home of quality ceiling products. Blending traditional craftsmanship with modern digital convenience.",
  scrollingBanner: [
    "BUILDING MATERIALS",
    "INTERIOR DESIGN",
    "POP CEILINGS",
    "LIGHTING SOLUTIONS",
    "WALL FIXTURES",
    "PLASTERPRO GHANA",
  ],
  address: "East Legon Hills, Accra",
  phone1: "+233 249 718 356",
  phone2: "+233 244 493 6551",
  email: "plasterproent@gmail.com",
  whatsappNumber: "233249718356",
  mondayFridayHours: "9:00 AM - 5:00 PM",
  saturdayHours: "10:00 AM - 5:00 PM",
  sundayStatus: "Closed",
  faqs: [
    {
      _key: rkey(),
      question: "What is POP Ceiling Installation?",
      answer:
        "POP Ceiling Installation involves using high-quality Plaster of Paris to create elegant, modern ceilings that enhance interior spaces.",
    },
    {
      _key: rkey(),
      question: "How do Room Lighting Solutions improve my space?",
      answer:
        "Our Room Lighting Solutions are designed to provide energy-efficient and stylish lighting, improving both the aesthetics and functionality of your space.",
    },
    {
      _key: rkey(),
      question: "What services are included in Hardware Installation?",
      answer:
        "We offer expert installation of various building hardware, including ceiling frames, wall brackets, and other essential fittings to ensure your space is secure and visually appealing.",
    },
    {
      _key: rkey(),
      question: "How can I book Repairs & Maintenance services?",
      answer:
        "You can easily contact us via our website form or email us directly to schedule repairs and maintenance for your ceilings, walls, or lighting fixtures.",
    },
  ],
};

// ── Run migration ─────────────────────────────────────────────────────────────

async function migrate() {
  console.log("\n🚀  PlasterPro Ghana — Sanity Migration\n");

  // 1. Site Settings
  console.log("── Site Settings ─────────────────────────────");
  await upsert(siteSettingsData);
  console.log("  ✓ siteSettings created\n");

  // 2. Showcase Items
  console.log("── Showcase Items (8) ────────────────────────");
  for (const item of showcaseData) {
    console.log(`\n  [${item.displayOrder}/8] ${item.title}`);
    const images = await buildImageArray(item.imageFiles);
    await upsert({
      _id: item._id,
      _type: "showcaseItem",
      title: item.title,
      description: item.description,
      badge: item.badge,
      displayOrder: item.displayOrder,
      detailDescription: item.detailDescription,
      keyFeatures: item.keyFeatures,
      commonUses: item.commonUses,
      images,
    });
    console.log(`  ✓ Saved`);
  }

  // 3. Products
  console.log("\n── Products (14) ─────────────────────────────");
  for (const product of productsData) {
    console.log(`\n  [${product.displayOrder}/14] ${product.title}`);
    const images = await buildImageArray(product.imageFiles);
    await upsert({
      _id: product._id,
      _type: "product",
      title: product.title,
      description: product.description,
      category: product.category,
      rating: product.rating,
      displayOrder: product.displayOrder,
      images,
    });
    console.log(`  ✓ Saved`);
  }

  console.log("\n✅  Migration complete!");
  console.log(
    "   All documents are published and live on https://plasterprogh.netlify.app\n"
  );
}

migrate().catch((err) => {
  console.error("\n❌  Migration failed:", err.message);
  process.exit(1);
});
