import { existsSync, readFileSync, readdirSync, mkdirSync, writeFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { dirname, resolve, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const backend = [process.env.ELCIRCLE_BACKEND_ROOT, resolve(root, "../Elcircle-app-backend"),
  resolve(root, "../clone-backed/Elcircle-app-backend")]
  .find(path => path && existsSync(join(path, "shopify.app.elcircle-loyalty.toml")));
if (!backend) throw new Error("The adjacent Elcircle backend project was not found.");
const config = readFileSync(join(backend, "shopify.app.elcircle-loyalty.toml"), "utf8");
const url = config.match(/^application_url\s*=\s*"([^"]+)"/m)?.[1];
if (url !== "https://elcircle-app-backend-ee6d.vercel.app") {
  throw new Error("The Shopify config must use the permanent Elcircle Vercel URL before publishing.");
}
const check = process.argv.includes("--check");
let changes = 0;
function copy(source, target) {
  for (const entry of readdirSync(source, { withFileTypes: true })) {
    const from = join(source, entry.name), to = join(target, entry.name);
    if (entry.isDirectory()) copy(from, to);
    else if (entry.isFile() && /\.(js|css|liquid|json|svg|png|jpe?g|webp)$/i.test(entry.name)) {
      const content = readFileSync(from);
      if (existsSync(to) && readFileSync(to).equals(content)) continue;
      changes++;
      if (!check) { mkdirSync(dirname(to), { recursive: true }); writeFileSync(to, content); }
    }
  }
}
for (const folder of ["assets", "blocks"]) {
  copy(join(root, "extensions/rewards-floating-widget", folder),
    join(backend, "extensions/points-theme-extension", folder));
}
console.log(`${changes} theme files ${check ? "would be synchronized" : "synchronized"} to the combined backend.`);
console.log(`Shopify app: Elcircle Loyalty; permanent backend: ${url}`);
if (check) console.log("Check only: no files changed and nothing deployed.");
else {
  const result = spawnSync(process.execPath, [join(backend, "node_modules/@shopify/cli/bin/run.js"),
    "app", "deploy", "--path", backend, "--config", "elcircle-loyalty", "--allow-updates", "--no-input"],
    { cwd: backend, env: { ...process.env, PWD: backend, INIT_CWD: backend,
      npm_config_local_prefix: backend }, stdio: "inherit" });
  if (result.error) throw result.error;
  process.exitCode = result.status ?? 1;
  if (result.status === 0) console.log("Theme published. Refresh the storefront. Commit and push both repositories to save the source changes.");
}
