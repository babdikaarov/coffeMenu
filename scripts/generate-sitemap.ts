// scripts/generate-sitemap.ts
import fs from "fs";
import { resolve } from "path";

const BASE_URL = "https://coffee-k.netlify.app";

// Define all your static routes
const routes = ["/", "/menu"];

// Optionally, read dynamic menu items from CMS
const menuItemsPath = resolve("content/menu-items");
let menuSlugs: string[] = [];

if (fs.existsSync(menuItemsPath)) {
  const files = fs.readdirSync(menuItemsPath);
  menuSlugs = files
    .filter((f) => f.endsWith(".md"))
    .map((f) => "/menu/" + f.replace(".md", ""));
}

// Combine all routes
const allRoutes = [...routes, ...menuSlugs];

// Generate sitemap.xml
const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
  .map(
    (url) => `
  <url>
    <loc>${BASE_URL}${url}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`,
  )
  .join("")}
</urlset>
`;

fs.writeFileSync(resolve("public/sitemap.xml"), sitemapContent);
console.log("✓ sitemap.xml generated!");
