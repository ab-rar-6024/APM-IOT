// One-off script to seed the original placeholder blog/news content into Supabase
// so it's visible and editable in /admin instead of starting from an empty table.
// Usage: node scripts/seed-posts.mjs

import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function loadEnvLocal() {
  const envPath = path.join(__dirname, "..", ".env.local");
  const content = fs.readFileSync(envPath, "utf8");
  const env = {};
  for (const line of content.split("\n")) {
    const match = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (match) env[match[1]] = match[2].replace(/^"|"$/g, "");
  }
  return env;
}

const env = loadEnvLocal();
const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

function slugify(input) {
  return input.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80);
}

const blogs = [
  {
    title: "The AIS-140 Standard: Navigating the Regulations for Indian Commercial Fleets",
    category: "Regulations",
    date: "2026-06-25",
    excerpt:
      "Understanding what AIS-140 compliance entails, why the government mandated it, and how to choose the right certified tracking hardware for your transport vehicles.",
    image_url: "/images/verticals/frame-7113.png",
  },
  {
    title: "Why Fleet Operators are Switching to Embedded IoT M2M eSIMs",
    category: "Connectivity",
    date: "2026-05-18",
    excerpt:
      "Traditional SIM cards fail in extreme highway environments. Discover how soldered M2M eSIM cards solve connection drops and prevent tampering.",
    image_url: "/images/verticals/frame-7117.png",
  },
  {
    title: "Maximizing Safety in Heavy Transport: The Role of Auto Dipper Sensors",
    category: "Safety",
    date: "2026-04-10",
    excerpt:
      "Highway glare is a major cause of night-time collisions in India. Learn how light-adaptive auto dippers improve safety and reduce fatigue for long-haul drivers.",
    image_url: "/images/verticals/frame-7116.png",
  },
  {
    title: "The Evolution of Automated Vehicle Fitness Lanes (ATS)",
    category: "Infrastructure",
    date: "2026-03-12",
    excerpt:
      "Emissions, brake checking, and alignment can now be verified in minutes. Explore the technology behind government-mandated ATS testing lanes.",
    image_url: "/images/verticalb2g/frame-7119.png",
  },
  {
    title: "Understanding High Security Registration Plates (HSRP)",
    category: "Regulations",
    date: "2026-02-28",
    excerpt:
      "HSRP is now mandatory across several states in India. Learn about the security features, the chromium hologram, laser etching, and snap locks.",
    image_url: "/images/verticals/frame-7122.png",
  },
  {
    title: "Driving License Automation: How Sensor Tracks Work",
    category: "Infrastructure",
    date: "2026-01-15",
    excerpt:
      "RTO tracks are getting sensor upgrades. Discover how inductive loops and camera vision software grade driving license applicants without human bias.",
    image_url: "/images/verticalb2g/frame-7120.png",
  },
];

const news = [
  {
    title: "APM Group Achieves ARAI Certification for Next-Generation Speed Limiters",
    location: "Pune, India",
    date: "2026-06-10",
    excerpt:
      "APM Group's latest iteration of speed limitation devices has officially cleared the ARAI testing criteria, certifying it for immediate rollout across all commercial transport categories in several states.",
    image_url: "/images/verticalb2c/frame-7113.png",
  },
  {
    title: "Nationwide Fitment & Service Network Reaches 1,600+ Certified Dealers",
    location: "New Delhi, India",
    date: "2026-05-02",
    excerpt:
      "To support mandatory HSRP fitment and AIS-140 GPS compliance installations, APM Group has certified 150 new authorized partner points, pushing our total active dealer network count past 1,600 nodes nationwide.",
    image_url: "/images/verticals/frame-7114.png",
  },
  {
    title: "Launching the Rover View Edge AI Driver Drowsiness Platform",
    location: "Bengaluru, India",
    date: "2026-03-20",
    excerpt:
      "Rover View, our latest edge AI hardware module, has been officially launched. The camera uses advanced computer vision algorithms to predict and flag driver drowsiness and distraction in real-time.",
    image_url: "/images/verticals/frame-7123.png",
  },
  {
    title: "State-of-the-Art Automated ATS Testing Lanes Deployed in Southern States",
    location: "Hyderabad, India",
    date: "2026-01-08",
    excerpt:
      "Two new automated testing lanes have gone live under government public-private partnerships. The lanes integrate emissions, suspension, and brake tests, linking data directly to the central licensing databases.",
    image_url: "/images/verticalb2g/frame-7119.png",
  },
];

async function run() {
  const { data: existing } = await supabase.from("posts").select("slug");
  const existingSlugs = new Set((existing || []).map((r) => r.slug));

  const rows = [
    ...blogs.map((b) => ({
      type: "blog",
      title: b.title,
      slug: slugify(b.title),
      category: b.category,
      location: null,
      excerpt: b.excerpt,
      content: null,
      image_url: b.image_url,
      published: true,
      created_at: new Date(b.date).toISOString(),
      updated_at: new Date(b.date).toISOString(),
    })),
    ...news.map((n) => ({
      type: "news",
      title: n.title,
      slug: slugify(n.title),
      category: null,
      location: n.location,
      excerpt: n.excerpt,
      content: null,
      image_url: n.image_url,
      published: true,
      created_at: new Date(n.date).toISOString(),
      updated_at: new Date(n.date).toISOString(),
    })),
  ].filter((r) => !existingSlugs.has(r.slug));

  if (rows.length === 0) {
    console.log("Nothing to insert — all slugs already exist.");
    return;
  }

  const { data, error } = await supabase.from("posts").insert(rows).select();
  if (error) {
    console.error("Insert failed:", error.message);
    process.exit(1);
  }
  console.log(`Inserted ${data.length} posts.`);
}

run();
