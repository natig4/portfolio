// Verifies messages/en.json and messages/he.json have the same keys, the same
// array lengths and the same ICU placeholders.
//   node scripts/check-messages.mjs           → structure check
//   node scripts/check-messages.mjs --strict  → also fail on TODO / [TBD] markers
import { readFile } from "node:fs/promises";

const strict = process.argv.includes("--strict");
const load = async (locale) =>
  JSON.parse(
    await readFile(
      new URL(`../messages/${locale}.json`, import.meta.url),
      "utf8",
    ),
  );

const [en, he] = await Promise.all([load("en"), load("he")]);
const problems = [];

const placeholders = (text) =>
  [...text.matchAll(/\{(\w+)/g)]
    .map((m) => m[1])
    .sort()
    .join(",");

function compare(a, b, path) {
  if (Array.isArray(a) || Array.isArray(b)) {
    if (!Array.isArray(a) || !Array.isArray(b))
      problems.push(`${path}: array in one locale only`);
    else if (a.length !== b.length)
      problems.push(`${path}: ${a.length} items in en, ${b.length} in he`);
    return;
  }
  if (typeof a === "object" && a && typeof b === "object" && b) {
    for (const key of new Set([...Object.keys(a), ...Object.keys(b)])) {
      if (!(key in a)) problems.push(`${path}.${key}: missing in en`);
      else if (!(key in b)) problems.push(`${path}.${key}: missing in he`);
      else compare(a[key], b[key], `${path}.${key}`);
    }
    return;
  }
  if (typeof a !== typeof b) {
    problems.push(`${path}: type differs (${typeof a} vs ${typeof b})`);
  } else if (typeof a === "string" && placeholders(a) !== placeholders(b)) {
    problems.push(
      `${path}: placeholders differ ({${placeholders(a)}} vs {${placeholders(b)}})`,
    );
  }
}

function findMarkers(node, path, locale) {
  if (typeof node === "string") {
    if (/\bTODO\b|\[TBD\]/.test(node))
      problems.push(`${locale}${path}: unfinished copy`);
  } else if (node && typeof node === "object") {
    for (const [key, value] of Object.entries(node))
      findMarkers(value, `${path}.${key}`, locale);
  }
}

compare(en, he, "");
if (strict) {
  findMarkers(en, "", "en");
  findMarkers(he, "", "he");
}

if (problems.length) {
  console.error(
    `Message catalogs are out of sync:\n  ${problems.join("\n  ")}`,
  );
  process.exit(1);
}
console.log("messages: en and he are in sync");
