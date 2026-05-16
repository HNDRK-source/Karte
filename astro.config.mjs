import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import remarkBaseUrl from "./src/lib/remark-base-url.mjs";

const base = process.env.BASE_PATH || "/";
const site = process.env.SITE_URL || "https://www.ulmenschutz.de";

export default defineConfig({
  site,
  base,
  trailingSlash: "always",
  build: { format: "directory" },
  i18n: {
    defaultLocale: "de",
    locales: ["de", "en"],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [tailwind(), sitemap()],
  markdown: {
    remarkPlugins: [[remarkBaseUrl, { base }]],
  },
});
