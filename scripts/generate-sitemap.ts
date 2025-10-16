import fs from "fs";
import { resolve } from "path";

const BASE_URL = "https://coffee-k.netlify.app";

// Only include the root URL since other routes are client-side rendered
const allRoutes = ["/"];

// Generate sitemap.xml
const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
  .map(
    (url) => `  <url>
    <loc>${BASE_URL}${url}</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>`,
  )
  .join("\n")}
</urlset>
`;

fs.writeFileSync(resolve("public/sitemap.xml"), sitemapContent);
console.log("✓ sitemap.xml generated!");
