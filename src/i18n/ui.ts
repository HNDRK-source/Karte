export const languages = { de: "Deutsch", en: "English" } as const;
export const defaultLang = "de" as const;
export type Lang = keyof typeof languages;

export const ui = {
  de: {
    "site.title": "Ulmenschutz",
    "site.tagline": "Initiative zum Schutz der Ulme",
    "nav.home": "Start",
    "nav.ulme": "Die Ulme",
    "nav.ulmenkrankheit": "Ulmenkrankheit",
    "nav.ulmenschutz": "Ulmenschutz",
    "nav.dutchtrig": "DutchTrig®",
    "nav.besitzer": "Für Ulmenbesitzer",
    "nav.kommunen": "Für Kommunen",
    "nav.private": "Für Private",
    "nav.karte": "Karte",
    "nav.mitmachen": "Mitmachen",
    "nav.wissen": "Wissen",
    "nav.ueberuns": "Über uns",
    "nav.impressum": "Impressum",
    "nav.datenschutz": "Datenschutz",
    "nav.barrierefreiheit": "Barrierefreiheit",
    "footer.rights": "Alle Rechte vorbehalten.",
    "lang.switch": "Sprache wechseln",
    "home.hero.title": "Schützt die Ulmen.",
    "home.hero.lead":
      "Die Ulme gehört zu unseren ökologisch wertvollsten Bäumen – und seit Jahrzehnten zu den am stärksten bedrohten. Mit Monitoring, Pflege und biologischer Schutzimpfung kann ihr Bestand gesichert werden.",
    "home.path.learn.title": "Erfahren",
    "home.path.learn.text": "Was ist die Ulme, was bedroht sie und wie funktioniert ihr Schutz?",
    "home.path.protect.title": "Ulmenschutz & Schutzimpfung",
    "home.path.protect.text": "Das integrierte Schutzprogramm und die biologische DutchTrig®-Impfung.",
    "home.path.join.title": "Mitmachen",
    "home.path.join.text": "Ulmen melden, Patenschaft übernehmen, Initiative unterstützen.",
    "map.loading": "Karte wird geladen …",
    "map.error": "Karte konnte nicht geladen werden.",
  },
  en: {
    "site.title": "Elm Protection",
    "site.tagline": "Initiative for the protection of elm trees",
    "nav.home": "Home",
    "nav.ulme": "The Elm",
    "nav.ulmenkrankheit": "Elm Disease",
    "nav.ulmenschutz": "Elm Protection",
    "nav.dutchtrig": "DutchTrig®",
    "nav.besitzer": "For Elm Owners",
    "nav.kommunen": "For Municipalities",
    "nav.private": "For Private Owners",
    "nav.karte": "Map",
    "nav.mitmachen": "Get Involved",
    "nav.wissen": "Knowledge",
    "nav.ueberuns": "About",
    "nav.impressum": "Imprint",
    "nav.datenschutz": "Privacy",
    "nav.barrierefreiheit": "Accessibility",
    "footer.rights": "All rights reserved.",
    "lang.switch": "Switch language",
    "home.hero.title": "Protect the elms.",
    "home.hero.lead":
      "The elm is one of our most ecologically valuable trees – and for decades one of the most threatened. Monitoring, care and biological vaccination can secure its future.",
    "home.path.learn.title": "Learn",
    "home.path.learn.text": "What is the elm, what threatens it and how does its protection work?",
    "home.path.protect.title": "Protection & Vaccination",
    "home.path.protect.text": "The integrated protection programme and the biological DutchTrig® vaccination.",
    "home.path.join.title": "Get involved",
    "home.path.join.text": "Report elms, become a sponsor, support the initiative.",
    "map.loading": "Loading map …",
    "map.error": "The map could not be loaded.",
  },
} as const;

export function t(lang: Lang, key: keyof (typeof ui)["de"]): string {
  return ui[lang][key] ?? ui[defaultLang][key];
}

// Astro stellt BASE_URL als Konstante zur Verfügung (z. B. "/" oder "/Karte/").
// Wir entfernen den abschließenden Slash, damit wir absolute Pfade einfach anhängen können.
const B = (import.meta.env.BASE_URL ?? "/").replace(/\/$/, "");

function r(lang: Lang, path: string): string {
  const prefix = lang === "en" ? "/en" : "";
  return B + prefix + path;
}

export const routes = {
  de: {
    home: r("de", "/"),
    ulme: r("de", "/ulme/"),
    ulmenkrankheit: r("de", "/ulmenkrankheit/"),
    ulmenschutz: r("de", "/ulmenschutz/"),
    dutchtrig: r("de", "/dutchtrig/"),
    "fuer-kommunen": r("de", "/fuer-kommunen/"),
    "fuer-private": r("de", "/fuer-private/"),
    karte: r("de", "/karte/"),
    mitmachen: r("de", "/mitmachen/"),
    wissen: r("de", "/wissen/"),
    "ueber-uns": r("de", "/ueber-uns/"),
    impressum: r("de", "/impressum/"),
    datenschutz: r("de", "/datenschutz/"),
    barrierefreiheit: r("de", "/barrierefreiheit/"),
  },
  en: {
    home: r("en", "/"),
    ulme: r("en", "/ulme/"),
    ulmenkrankheit: r("en", "/ulmenkrankheit/"),
    ulmenschutz: r("en", "/ulmenschutz/"),
    dutchtrig: r("en", "/dutchtrig/"),
    "fuer-kommunen": r("en", "/fuer-kommunen/"),
    "fuer-private": r("en", "/fuer-private/"),
    karte: r("en", "/karte/"),
    mitmachen: r("en", "/mitmachen/"),
    wissen: r("en", "/wissen/"),
    "ueber-uns": r("en", "/ueber-uns/"),
    impressum: r("en", "/impressum/"),
    datenschutz: r("en", "/datenschutz/"),
    barrierefreiheit: r("en", "/barrierefreiheit/"),
  },
};

export function altLang(lang: Lang): Lang {
  return lang === "de" ? "en" : "de";
}

// Aktuellen Pfad in die jeweils andere Sprache übersetzen, base-aware.
export function switchLang(currentPath: string, to: Lang): string {
  const inner = currentPath.startsWith(B) ? currentPath.slice(B.length) : currentPath;
  const isEn = inner === "/en" || inner.startsWith("/en/");
  if (to === "en") {
    if (isEn) return currentPath;
    const path = inner === "/" || inner === "" ? "/" : inner;
    return B + "/en" + path;
  } else {
    if (!isEn) return currentPath;
    const stripped = inner.replace(/^\/en/, "") || "/";
    return B + stripped;
  }
}
