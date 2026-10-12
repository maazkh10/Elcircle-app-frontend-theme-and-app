document.addEventListener("DOMContentLoaded", async () => {
  const root = document.getElementById("care-rewards-root");
  if (!root) return;

  const customerEmail = window.CareRewardsConfig?.customerEmail || "";
  console.log("[Care Rewards] Logged in Customer Email:", customerEmail);

  root.innerHTML = `
    <button class="care-floating-btn" id="care-open-btn">
      <span>ELCIRCLE 88</span>
    </button>
    <div class="care-overlay" id="care-overlay"></div>
    <div class="care-drawer" id="care-drawer">
      <div class="care-top-section">
        <button class="care-close-btn" id="care-close-btn">✕</button>
        <span class="care-program-heading">ELCIRCLE 88 PLATINUM PROGRAM</span>
        <div class="care-header-row">
          <div>
            <p class="care-label">Your Balance</p>
            <h1 id="care-points" class="care-serif">— Points</h1>
            <h3 id="" class="care-serif">ELCircle Points</h3>
          </div>
          <div class="care-header-tier">
            <div class="care-tier-icon">
              <img src="https://cdn.shopify.com/s/files/1/0649/2838/3074/files/gold-removebg-preview.png?v=1781766593" alt="Gold Tier" style="width:42px;height:42px;display:block;">
            </div>
            <div class="care-tier-meta">
              <span class="care-tier-label">Current Tier</span>
              <span class="care-tier-name">Gold</span>
            </div>
          </div>
        </div>
      </div>
      <div class="care-body">
        <div class="care-view-panel active" id="panel-main">
          <a href="https://dashboard-customer.myshopify.com/pages/reward-page" class="care-card">
            <div class="care-card-left">
              <span class="care-emoji">◇</span>
              <div>
                <h3 class="care-serif">Your rewards</h3>
                <p>You have 2 rewards available</p>
              </div>
            </div>
            <span class="care-arrow">›</span>
          </a>
          <div class="care-card" data-target="panel-earn">
            <div class="care-card-left">
              <span class="care-emoji">⌬</span>
              <div>
                <h3 class="care-serif">Ways to earn</h3>
                <p>Purchases, referrals & reviews</p>
              </div>
            </div>
            <span class="care-arrow">›</span>
          </div>
          <div class="care-card" data-target="panel-redeem">
            <div class="care-card-left">
              <span class="care-emoji">⛁</span>
              <div>
                <h3 class="care-serif">Ways to redeem</h3>
                <p>Discounts & free shipping</p>
              </div>
            </div>
            <span class="care-arrow">›</span>
          </div>
          <div class="care-card" data-target="panel-tier">
            <div class="care-card-left">
              <span class="care-emoji">⚛</span>
              <div>
                <h3 class="care-serif">Gold Tier</h3>
                <p>100 points away from Gold</p>
              </div>
            </div>
            <span class="care-arrow">›</span>
          </div>
          <div class="care-card" data-target="panel-activity">
            <div class="care-card-left">
              <span class="care-emoji">☰</span>
              <div>
                <h3 class="care-serif">Recent Activity</h3>
                <p>Track your points ledger history</p>
              </div>
            </div>
            <span class="care-arrow">›</span>
          </div>
        </div>
        <div class="care-view-panel" id="panel-earn">
          <button class="care-back-btn">← Back to account</button>
          <h2 class="care-sub-title care-serif">Ways to earn</h2>
          <p class="care-sub-desc">Accumulate points globally across brand stores inside your ecosystem layout framework.</p>
          <div class="care-list-item">
            <div class="care-item-meta"><h4 class="care-serif">Place an Order</h4><p>Earn 5 points for every $1 spent.</p></div>
            <span class="care-badge">Active</span>
          </div>
          <div class="care-list-item">
            <div class="care-item-meta"><h4 class="care-serif">Write a Product Review</h4><p>Earn 50 points for shared feedback.</p></div>
            <span class="care-badge">50 PTS</span>
          </div>
        </div>
        <div class="care-view-panel" id="panel-redeem">
          <button class="care-back-btn">← Back to account</button>
          <h2 class="care-sub-title care-serif">Ways to redeem</h2>
          <p class="care-sub-desc">Exchange accumulated care points directly for structural store balance discounts.</p>
          <div class="care-list-item">
            <div class="care-item-meta"><h4 class="care-serif">$5 Off Order Checkout</h4><p>Cost: 100 points</p></div>
            <span class="care-badge action-required">Redeem</span>
          </div>
          <div class="care-list-item">
            <div class="care-item-meta"><h4 class="care-serif">$20 Off Order Checkout</h4><p>Cost: 350 points</p></div>
            <span class="care-badge action-required">Redeem</span>
          </div>
        </div>
        <div class="care-view-panel" id="panel-tier">
          <button class="care-back-btn">← Back to account</button>
          <h2 class="care-sub-title care-serif">Sparkle Tier</h2>
          <p class="care-sub-desc">You are currently placed in our premium status tier benefits ecosystem.</p>
          <div class="care-progress-container">
            <div style="display:flex; justify-content:space-between; font-size:13px;">
              <span><strong>Sparkle</strong> Member</span>
              <span style="color:#8c8c8c">100 pts to Gold</span>
            </div>
            <div class="care-progress-track"><div class="care-progress-bar"></div></div>
          </div>
          <div style="margin-top: 16px; width:100%;">
            <div class="care-list-item">
              <div class="care-item-meta"><h4 class="care-serif">Silver Status</h4><p>Baseline tier placement</p></div>
              <span class="care-badge">Passed</span>
            </div>
            <div class="care-list-item">
              <div class="care-item-meta"><h4 class="care-serif">Sparkle Status</h4><p>Current active placement level status</p></div>
              <span class="care-badge" style="color:#111; font-weight:600;">Active Level</span>
            </div>
            <div class="care-list-item">
              <div class="care-item-meta">
                <h4 class="care-serif">Dimond Status</h4>
                <p>Unlocks at 500 lifetime accrued points</p>
              </div>
              <span class="care-badge">Locked</span>
            </div>
          </div>
        </div>
        <div class="care-view-panel" id="panel-activity">
          <button class="care-back-btn">← Back to account</button>
          <h2 class="care-sub-title care-serif">Recent History Ledger Log</h2>
          <p class="care-sub-desc">Historical records of structural order point coin allocations and reductions.</p>
          <div id="care-activity-container">
            <p style="color:#8c8c8c; font-size:13px;">Loading activity history...</p>
          </div>
        </div>
      </div>
    </div>
  `;

  // Drawer Controls
  const drawer = document.getElementById("care-drawer");
  const overlay = document.getElementById("care-overlay");
  const openBtn = document.getElementById("care-open-btn");
  const closeBtn = document.getElementById("care-close-btn");
  const cards = document.querySelectorAll(".care-card[data-target]");
  const backBtns = document.querySelectorAll(".care-back-btn");
  const panels = document.querySelectorAll(".care-view-panel");

  cards.forEach(card => {
    card.addEventListener("click", () => {
      const targetId = card.getAttribute("data-target");
      if (!targetId) return;
      panels.forEach(p => p.classList.remove("active"));
      document.getElementById(targetId).classList.add("active");
    });
  });

  backBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      panels.forEach(p => p.classList.remove("active"));
      document.getElementById("panel-main").classList.add("active");
    });
  });

  openBtn.addEventListener("click", () => {
    drawer.classList.add("open");
    overlay.classList.add("show");
  });

  const closeDrawer = () => {
    drawer.classList.remove("open");
    overlay.classList.remove("show");
    setTimeout(() => {
      panels.forEach(p => p.classList.remove("active"));
      document.getElementById("panel-main").classList.add("active");
    }, 400);
  };

  closeBtn.addEventListener("click", closeDrawer);
  overlay.addEventListener("click", closeDrawer);

  // Stop if user is not logged in on storefront
  if (!customerEmail) {
    document.getElementById("care-points").innerText = "0";
    document.getElementById("care-activity-container").innerHTML = `
      <div style="padding: 12px 0;">
        <p style="color:#8c8c8c; font-size:13px; margin-bottom: 8px;">Please log in to view points and activity.</p>
        <a href="/account/login" style="color:#111; font-weight:600; text-decoration:underline; font-size:13px;">Log in to your account →</a>
      </div>
    `;
    return;
  }

  // Execute API Fetch
  try {
    const apiUrl = `https://regina-cycadlike-senatorially.ngrok-free.dev/api/loyalty/points?email=${encodeURIComponent(customerEmail)}`;
    console.log("[Care Rewards] Fetching points from:", apiUrl);

    const response = await fetch(apiUrl, {
      headers: { 
        "Accept": "application/json",
        "ngrok-skip-browser-warning": "true" 
      }
    });

    const data = await response.json();
    console.log("[Care Rewards Data Received]:", data);

    if (data.success) {
      const livePoints = data.points ?? data.totalpoints ?? 0;
      document.getElementById("care-points").innerText = livePoints;

      const activityContainer = document.getElementById("care-activity-container");

if (data.history && data.history.trim().length > 0) {
  const lines = data.history
    .split(/\r?\n/)
    .map(line => line.trim())
    .filter(line => line.length > 0);

  activityContainer.innerHTML = lines.map(line => {
    // Regex matches: [Date] Details
    const match = line.match(/^\[(.*?)\]\s*(.*)$/);
    if (match) {
      const dateStr = match[1];
      const detailsStr = match[2];

      return `
        <div style="display:flex; justify-content:space-between; align-items:center; padding:14px 0; border-bottom:1px solid #f0f0f0;">
          <div style="display:flex; flex-direction:column; gap:4px;">
            <span style="font-size:13px; font-weight:500; color:#111;">${detailsStr}</span>
            <span style="font-size:11px; color:#8c8c8c;">${dateStr}</span>
          </div>
        </div>
      `;
    }

    return `
      <div style="padding:12px 0; border-bottom:1px solid #f0f0f0; font-size:13px; color:#333;">
        ${line}
      </div>
    `;
  }).join("");
} else {
  activityContainer.innerHTML = `<p style="color:#8c8c8c; font-size:13px;">No transaction history found.</p>`;
}

    } else {
      document.getElementById("care-points").innerText = "0";
      document.getElementById("care-activity-container").innerHTML = `<p style="color:#8c8c8c; font-size:13px;">Unable to fetch activity.</p>`;
    }
  } catch (err) {
    console.error("Error fetching loyalty data:", err);
    document.getElementById("care-points").innerText = "0";
    document.getElementById("care-activity-container").innerHTML = `<p style="color:#8c8c8c; font-size:13px;">Error loading points ledger.</p>`;
  }
});