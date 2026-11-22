import type { NextConfig } from "next";
import { siteConfig } from "./src/config/site";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  // Ergänzt das Meta-Tag aus dem Layout: greift auch für Dateien,
  // Bilder und Antworten ohne HTML-Kopf.
  async headers() {
    if (!siteConfig.noindex) return [];
    return [
      {
        source: "/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
