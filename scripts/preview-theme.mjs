import { createServer } from "node:http";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const asset = fileURLToPath(new URL("../extensions/rewards-floating-widget/assets/care-rewards.js", import.meta.url));
const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Elcircle private room preview</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Montserrat:wght@400;500;600&display=swap">
<style>body{margin:0;background:#e8e2d8;font-family:Montserrat,Arial,sans-serif} .preview-label{position:fixed;left:24px;top:24px;max-width:210px;color:#5d513d;font-size:12px;line-height:1.8;letter-spacing:.08em} @media(max-width:740px){.preview-label{display:none}}</style>
<script>window.CareRewardsConfig={customerFirstName:"Preview",customerLastName:"Guest",customerEmail:"preview@example.invalid",apiBaseUrl:"/preview-api"};</script>
<script src="/care-rewards.js" defer></script></head><body><div class="preview-label">ELCIRCLE 88<br><strong>LOCAL PREVIEW</strong><br>Not published. Sample data only.<br>Save the source and refresh to preview edits.</div><div id="care-rewards-root"></div>
<script>window.addEventListener("load",()=>{document.querySelector('#care-open')?.click();document.querySelector('[data-action="appointment"]')?.click()});</script>
</body></html>`;

const server = createServer((request, response) => {
  response.setHeader("Cache-Control", "no-store");
  const path = new URL(request.url, "http://127.0.0.1").pathname;
  if (path === "/") { response.setHeader("Content-Type", "text/html; charset=utf-8"); response.end(html); }
  else if (path === "/care-rewards.js") { response.setHeader("Content-Type", "text/javascript; charset=utf-8"); response.end(readFileSync(asset)); }
  else if (path === "/preview-api/loyalty/points") {
    response.setHeader("Content-Type", "application/json");
    response.end(JSON.stringify({success:true,points:2500,storeCredit:1500,lifetimeSpend:5000,tier:"Silver",history:[]}));
  } else { response.statusCode = 404; response.end("Not found"); }
});
server.listen(43210, "127.0.0.1", () => console.log("Local theme preview: http://127.0.0.1:43210 — no publishing or real bookings."));
