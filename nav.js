const navStyle = `
<style>
  #global-nav { background: #37b5ff !important; color: white !important; font-family: sans-serif; position: fixed; top: 0; left: 0; width: 100%; z-index: 999999; display: flex; justify-content: space-between; align-items: center; padding: 0 15px; height: 40px; box-sizing: border-box; }
  .nav-logo { display: flex; align-items: center; gap: 8px; text-decoration: none; color: white !important; font-weight: 800; font-size: 16px; }
  .nav-logo img { height: 28px; width: auto; border-radius: 3px; }
  #nav-links { display: flex; gap: 5px; align-items: center; height: 100%; }
  .nav-item { position: relative; height: 100%; display: flex; align-items: center; }
  .nav-item a, .drop-btn { color: white !important; text-decoration: none; font-size: 11px; font-weight: 600; padding: 0 10px; cursor: pointer; border: none; background: none; display: flex; align-items: center; height: 100%; }
  .nav-item:hover > a, .nav-item:hover > .drop-btn { background: rgba(0,0,0,0.1); }
  .dropdown-content { display: none; position: absolute; background: white; min-width: 180px; top: 40px; left: 0; box-shadow: 0 4px 10px rgba(0,0,0,0.2); }
  .dropdown-content a { color: #333 !important; border-bottom: 1px solid #eee; padding: 10px 15px; height: auto !important; display: block !important; }
  .nav-item:hover .dropdown-content { display: block; }
  #nav-toggle { display: none; color: white; background: rgba(0,0,0,0.2); padding: 5px; border-radius: 3px; }
  @media (max-width: 900px) {
    #nav-toggle { display: block; }
    #nav-links { display: none; position: absolute; top: 40px; left: 0; width: 100%; background: #37b5ff; flex-direction: column; height: auto; padding: 10px 0; }
    #nav-links.active { display: flex; }
    .nav-item { width: 100%; height: auto; }
  }
</style>
`;

const renderNav = () => {
    if (document.getElementById('global-nav')) return;

    const user = new URLSearchParams(window.location.search).get('user');
    const fix = (u) => {
        if (!user || u.includes('user=')) return u;
        const sep = u.includes('?') ? '&' : '?';
        const myDomains = ['github.io', 'netlify.app', 'vercel.app', 'wildandwandering.com', 'wetpoolparty.com'];
        if (myDomains.some(d => u.includes(d))) return `${u}${sep}user=${user}`;
        return u;
    };

    // 1. HOME (Points to Dashboard)
    let html = `<div class="nav-item"><a href="${fix('https://loren-6q.github.io/WETNav/')}" data-type="ignore">Home</a></div>`;

    // 2. BOSS TOOLS (Private Apps)
    if (user === 'BOSS') {
        html += `
            <div class="nav-item">
              <span class="drop-btn">BOSS TOOLS ▾</span>
              <div class="dropdown-content">
                <a href="${fix('https://loren-6q.github.io/WETSalaries/')}" data-type="app">Salaries</a>
                <a href="${fix('https://loren-6q.github.io/WETParser/')}" data-type="app">Parser</a>
                <a href="#" data-type="app">Accounting (Soon)</a>
              </div>
            </div>`;
    }

    // 3. PRICING & SYSTEMS (External Links)
    if (user === 'BOSS' || user === 'REC') {
        html += `
            <div class="nav-item">
              <span class="drop-btn">฿ Pricing ▾</span>
              <div class="dropdown-content">
                <a href="https://inbox.myallocator.com/booknow/-sxO1cCV5jLMwqZTXY629A" target="_blank" data-type="link">Booking Engine</a>
                <a href="https://www.booking.com/searchresults..." target="_blank" data-type="link">B.com Search</a>
                <a href="https://www.hostelworld.com/..." target="_blank" data-type="link">HW Search</a>
              </div>
            </div>
            <div class="nav-item">
              <span class="drop-btn">Systems ▾</span>
              <div class="dropdown-content">
                <a href="https://sg.loventis.net/Reception" target="_blank" data-type="link">Loventis</a>
                <a href="https://inbox.myallocator.com/en/availability/58137" target="_blank" data-type="link">MyAllocator</a>
              </div>
            </div>`;
    }

    // 4. STOCK & FMW (Shared Apps)
    if (user === 'BAR' || user === 'BOSS') {
         html += `<div class="nav-item"><a href="${fix('https://bar-stock-nine.vercel.app/')}" data-type="app">Stock</a></div>`;
    }
    html += `<div class="nav-item"><a href="${fix('https://loren-6q.github.io/Full-Moon-Week-Schedule/')}" data-type="app">FMW</a></div>`;

    const bar = document.createElement('nav');
    bar.id = 'global-nav';
    bar.innerHTML = `
        <a href="${fix('https://loren-6q.github.io/WETNav/')}" class="nav-logo">
            <img src="https://raw.githubusercontent.com/loren-6q/WETNav/main/logo-icon.png" onerror="this.remove()">
            <span>WET</span>
        </a>
        <button id="nav-toggle">MENU</button>
        <div id="nav-links">${html}</div>
    `;

    document.head.insertAdjacentHTML('beforeend', navStyle);
    document.body.prepend(bar);
    document.body.style.paddingTop = "40px";

    if (user) {
        document.querySelectorAll('a').forEach(a => { a.href = fix(a.href); });
    }

    const btn = document.getElementById('nav-toggle');
    if (btn) btn.onclick = () => document.getElementById('nav-links').classList.toggle('active');
};

if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', renderNav); } else { renderNav(); }
