const navStyle = `
<style>
  #global-nav { background: #37b5ff !important; color: white !important; font-family: sans-serif; position: fixed; top: 0; left: 0; width: 100%; z-index: 999999; display: flex; justify-content: space-between; align-items: center; padding: 0 15px; height: 40px; box-sizing: border-box; border-bottom: 2px solid rgba(0,0,0,0.1); }
  .nav-logo { display: flex; align-items: center; gap: 8px; text-decoration: none; color: white !important; font-weight: 800; font-size: 16px; height: 100%; }
  .nav-logo img { height: 28px; width: auto; border-radius: 3px; display: block; }
  #nav-links { display: flex; gap: 5px; align-items: center; height: 100%; }
  .nav-item { position: relative; height: 100%; display: flex; align-items: center; }
  .nav-item a, .drop-btn { color: white !important; text-decoration: none; font-size: 11px; font-weight: 600; padding: 0 10px; cursor: pointer; border: none; background: none; display: flex; align-items: center; height: 100%; transition: 0.2s; }
  .nav-item:hover > a, .nav-item:hover > .drop-btn { background: rgba(0,0,0,0.1); }
  .dropdown-content { display: none; position: absolute; background: white; min-width: 180px; top: 40px; left: 0; box-shadow: 0 4px 10px rgba(0,0,0,0.2); border-radius: 0 0 4px 4px; border: 1px solid #ddd; }
  .dropdown-content a { color: #333 !important; border-bottom: 1px solid #eee; padding: 10px 15px; height: auto !important; display: block !important; }
  .dropdown-content a:hover { background: #f0f0f0; color: #37b5ff !important; }
  .nav-item:hover .dropdown-content { display: block; }
  @media (max-width: 950px) {
    #nav-links { display: none; position: absolute; top: 40px; left: 0; width: 100%; background: #37b5ff; flex-direction: column; height: auto; padding: 10px 0; }
    #nav-links.active { display: flex; }
    .nav-item { width: 100%; height: auto; }
    .nav-item a, .drop-btn { padding: 12px 20px; justify-content: center; }
  }
</style>
`;

const renderNav = () => {
    if (document.getElementById('global-nav')) return;
    const user = new URLSearchParams(window.location.search).get('user') || 'Staff';
    const fix = (u) => {
        if (!user || u.includes('user=')) return u;
        const sep = u.includes('?') ? '&' : '?';
        if (['github.io', 'netlify.app', 'vercel.app', 'wildandwandering.com', 'wetpoolparty.com'].some(d => u.includes(d))) return `${u}${sep}user=${user}`;
        return u;
    };

    let html = `<div class="nav-item"><a href="${fix('https://loren-6q.github.io/WETNav/')}" data-type="ignore">Home</a></div>`;

    // 1. ADMIN (BOSS)
    if (user === 'BOSS') {
        html += `
            <div class="nav-item">
              <span class="drop-btn" style="background:rgba(255,255,255,0.2)">ADMIN ▾</span>
              <div class="dropdown-content">
                <a href="${fix('https://wetsalaries.netlify.app/')}" data-type="admin" data-icon="💰" data-desc="Staff Payroll">Salaries</a>
                <a href="${fix('https://loren-6q.github.io/WETParser/')}" data-type="admin" data-icon="📑" data-desc="Data Conversion">Parser</a>
                <a href="#" data-type="admin" data-icon="🏦" data-desc="Financials">Accounting</a>
              </div>
            </div>`;
    }

    // 2. PRICING (BOSS, REC)
    if (user === 'BOSS' || user === 'REC') {
        html += `
            <div class="nav-item">
              <span class="drop-btn">฿ Pricing ▾</span>
              <div class="dropdown-content">
                <a href="https://inbox.myallocator.com/booknow/-sxO1cCV5jLMwqZTXY629A" target="_blank" data-type="sys-front" data-icon="🏨" data-desc="Live Rates">WET Booking Engine</a>
                <a href="https://www.booking.com/searchresults.en-gb.html?dest_id=900050772&dest_type=city" target="_blank" data-type="sys-front" data-icon="🔵" data-desc="B.com Search">B.com Search</a>
                <a href="https://www.hostelworld.com/pwa/s?q=Koh%20Phangan" target="_blank" data-type="sys-front" data-icon="🟠" data-desc="HW Search">HW Search</a>
              </div>
            </div>`;
    }

    // 3. SYSTEMS (BOSS, REC)
    if (user === 'BOSS' || user === 'REC') {
        html += `
            <div class="nav-item">
              <span class="drop-btn">Systems ▾</span>
              <div class="dropdown-content">
                <a href="https://sg.loventis.net/Reception" target="_blank" data-type="sys-back" data-icon="🏩" data-desc="PMS Portal">Loventis (PMS)</a>
                <a href="https://inbox.myallocator.com/en/availability/58137" target="_blank" data-type="sys-back" data-icon="🔑" data-desc="Channel Manager">MyAllocator</a>
                <a href="https://docs.google.com/spreadsheets/d/1UqivgGUjV0JAO2vB4QFjdw0c62pSsdlMsna-z4xE_SQ/edit?usp=sharing" target="_blank" data-type="sys-back" data-icon="💸" data-desc="Refund Sheet">Refundability</a>
                <a href="https://account.booking.com/sign-in" target="_blank" data-type="sys-back" data-icon="🛂" data-desc="B.com Backend">B.com Login</a>
                <a href="https://inbox.hostelworld.com/" target="_blank" data-type="sys-back" data-icon="🛂" data-desc="HW Backend">HW Login</a>
              </div>
            </div>`;
    }

    // 4. OPS (BAR, BOSS)
    if (user === 'BAR' || user === 'BOSS') {
         html += `<div class="nav-item"><a href="${fix('https://bar-stock-nine.vercel.app/')}" data-type="ops" data-icon="🍺" data-desc="Bar Inventory">Stock</a></div>`;
    }
    
    // 5. SHARED
    html += `<div class="nav-item"><a href="${fix('https://loren-6q.github.io/WETvCal/')}" data-type="ops" data-icon="🗓️" data-desc="Venue Calendar">V Cal</a></div>`;
    html += `<div class="nav-item"><a href="${fix('https://loren-6q.github.io/Full-Moon-Week-Schedule/')}" data-type="ops" data-icon="🌕" data-desc="FMW Schedule">FMW</a></div>`;

    const bar = document.createElement('nav');
    bar.id = 'global-nav';
    bar.innerHTML = `<a href="${fix('https://loren-6q.github.io/WETNav/')}" class="nav-logo"><img src="https://raw.githubusercontent.com/loren-6q/WETNav/main/logo-icon.png"><span>BUSINESS APP HUB</span></a><div id="nav-links">${html}</div>`;
    document.head.insertAdjacentHTML('beforeend', navStyle);
    document.body.prepend(bar);
    document.body.style.paddingTop = "40px";
};
renderNav();
