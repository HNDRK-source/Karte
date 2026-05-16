import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://www.ulmenschutz.de",
  trailingSlash: "always",
  build: { format: "directory" },
  i18n: {
    defaultLocale: "de",
    locales: ["de", "en"],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [tailwind(), sitemap()],
});
