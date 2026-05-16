// Erzeugt public/data/ulmen.geojson aus der Standort-Tabelle.
//   - Historische Bäume werden ausgeschlossen.
//   - Koordinaten werden auf 3 Nachkommastellen gerundet ("unscharf", ca. 110 m).
//   - Veranstaltungen werden als eigene Kategorie hinzugefügt.
import XLSX from "xlsx";
import { writeFileSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";

const INPUT = process.argv[2] ?? "data/Standorte_Ulmenschutz.xlsx";
const OUTPUT = "public/data/ulmen.geojson";
const PRECISION = 3;

const round = (n) => Math.round(n * 10 ** PRECISION) / 10 ** PRECISION;

// Manuelle Verlagerungen zum Schutz besonders sensibler Standorte
// (z. B. private Grundstücke, wo selbst eine 110-m-Unschärfe noch zu konkret wäre).
// Schlüssel ist die BaumNr aus der Quelldatei, Wert ist [lon, lat] des Ersatzpunktes.
const OVERRIDES = {
  // Cecilienhof / Privatgrundstück → Straßendreieck
  // Am Pfingstberg / Höhenstraße / Große Weinmeisterstraße, Potsdam.
  "U15 (1)": [13.063, 52.420],
  "U16 (2)": [13.063, 52.420],
  "U17 (3)": [13.063, 52.420],
  "U19 (5)": [13.063, 52.420],
};

function parseCoords(s) {
  const cleaned = String(s).replace(/\t/g, "").trim();
  const m = cleaned.match(/(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)/);
  if (!m) return null;
  return [parseFloat(m[1]), parseFloat(m[2])];
}

const wb = XLSX.readFile(INPUT);
const rows = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], { defval: "" });

const treeFeatures = rows
  .filter((r) => String(r["Historischer Baum"]).trim().toLowerCase() !== "ja")
  .map((r) => {
    const nr = String(r["BaumNr"]).trim();
    const override = OVERRIDES[nr];
    let coords;
    if (override) {
      coords = override;
    } else {
      const ll = parseCoords(r["Ort GPS I iOS"]);
      if (!ll) return null;
      const [lat, lon] = ll;
      coords = [round(lon), round(lat)];
    }
    return {
      type: "Feature",
      properties: {
        category: "ulme",
        nr,
        art: String(r["Baumart"]).trim(),
      },
      geometry: { type: "Point", coordinates: coords },
    };
  })
  .filter(Boolean);

const events = [
  { name: "Messe Augsburg",            lat: 48.354, lon: 10.929 },
  { name: "Gartenreich Wörlitz",       lat: 51.844, lon: 12.420 },
  { name: "Schloss Cecilienhof Potsdam", lat: 52.418, lon: 13.073 },
];

const eventFeatures = events.map((e) => ({
  type: "Feature",
  properties: { category: "veranstaltung", name: e.name },
  geometry: { type: "Point", coordinates: [e.lon, e.lat] },
}));

const out = { type: "FeatureCollection", features: [...treeFeatures, ...eventFeatures] };

mkdirSync(resolve("public/data"), { recursive: true });
writeFileSync(OUTPUT, JSON.stringify(out, null, 2) + "\n");
console.log(`Wrote ${OUTPUT}: ${treeFeatures.length} Ulmen, ${eventFeatures.length} Veranstaltungen.`);
