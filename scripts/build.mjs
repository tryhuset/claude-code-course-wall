// Static build for GitHub Pages: copies the site into dist/ and writes participants.json.
import { cpSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { listParticipants } from "./list.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
rmSync(dist, { recursive: true, force: true });
mkdirSync(dist);
for (const f of ["index.html", "wall.css", "wall.js", "participants"]) cpSync(join(root, f), join(dist, f), { recursive: true });
const people = listParticipants(root);
writeFileSync(join(dist, "participants.json"), JSON.stringify(people));
console.log(`Built ${people.length} cards into dist/`);
