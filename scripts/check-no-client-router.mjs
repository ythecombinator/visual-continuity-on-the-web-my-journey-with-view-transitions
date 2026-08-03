import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const BANNED = [
  "react-router",
  "useNavigate",
  "history.pushState",
  "history.replaceState",
  "@tanstack/react-router",
];

function walk(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      if (entry === "node_modules" || entry === "dist") continue;
      walk(full, files);
    } else if (/\.(tsx?|jsx?|json)$/.test(entry)) {
      files.push(full);
    }
  }
  return files;
}

const violations = [];
for (const file of walk(ROOT)) {
  if (file.includes("check-no-client-router")) continue;
  const content = readFileSync(file, "utf8");
  for (const term of BANNED) {
    if (content.includes(term)) {
      violations.push({ file, term });
    }
  }
}

if (violations.length > 0) {
  console.error("Client router violations found:");
  for (const v of violations) {
    console.error(`  ${v.term} in ${v.file}`);
  }
  process.exit(1);
}

console.log("No client router patterns detected.");
