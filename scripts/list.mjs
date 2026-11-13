import { readdirSync, existsSync } from "node:fs";
import { join } from "node:path";

// Every folder in participants/ with a card.html is one card on the wall.
// Folders starting with "_" (like _template) are skipped.
export function listParticipants(root) {
  const dir = join(root, "participants");
  return readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isDirectory() && !d.name.startsWith("_"))
    .filter((d) => existsSync(join(dir, d.name, "card.html")))
    .map((d) => d.name)
    .sort((a, b) => a.localeCompare(b));
}
