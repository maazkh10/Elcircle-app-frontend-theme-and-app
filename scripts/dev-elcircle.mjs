import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const backend = [process.env.ELCIRCLE_BACKEND_ROOT,
  resolve(root, "../Elcircle-app-backend"),
  resolve(root, "../clone-backed/Elcircle-app-backend")
].find(path => path && existsSync(resolve(path, "scripts/dev-new-store.mjs")));
if (!backend) {
  console.error("Clone Elcircle-app-backend beside this repository and run npm install there first. See OFFICE-SETUP.md.");
  process.exit(1);
}
console.log("Starting the combined Elcircle Loyalty app for El Circle 88.");
const child = spawn(process.execPath, [process.env.npm_execpath, "run", "dev"], {
  cwd: backend, env: process.env, stdio: "inherit", windowsHide: true,
});
child.on("error", error => { console.error(error.message); process.exitCode = 1; });
child.on("exit", code => { process.exitCode = code || 0; });
