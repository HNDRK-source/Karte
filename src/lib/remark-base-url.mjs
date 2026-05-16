// Prefixes absolute Markdown links/images (starting with "/") with the
// configured Astro `base`, so internal cross-links work under a sub-path
// deploy like GitHub Pages.
import { visit } from "unist-util-visit";

export default function remarkBaseUrl(opts) {
  const base = (opts?.base || "/").replace(/\/$/, ""); // "" or "/Karte"
  if (!base) return () => {};
  return (tree) => {
    visit(tree, ["link", "image"], (node) => {
      const url = node.url;
      if (typeof url !== "string") return;
      if (!url.startsWith("/") || url.startsWith("//")) return;
      node.url = base + url;
    });
  };
}
