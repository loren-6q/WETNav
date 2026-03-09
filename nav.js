const navStyle = `
<style>
  #global-nav { background: #37b5ff !important; color: white !important; font-family: sans-serif; position: fixed; top: 0; left: 0; width: 100%; z-index: 999999; display: flex; justify-content: space-between; align-items: center; padding: 0 15px; height: 40px; box-sizing: border-box; }
  .nav-logo { display: flex; align-items: center; gap: 8px; text-decoration: none; color: white !important; font-weight: 800; font-size: 16px; height: 100%; }
  .nav-logo img { height: 30px; width: auto; display: block; }
  .nav-logo span { line-height: 40px; }
  
  #nav-links { display: flex; gap: 5px; align-items: center; height: 100%; }
  .nav-item { position: relative; height: 100%; display: flex; align-items: center; }
  .nav-item a, .drop-btn { color: white !important; text-decoration: none; font-size: 11px; font-weight: 600; padding: 0 10px; cursor: pointer; border: none; background: none; display: flex; align-items: center; height: 100%; transition: 0.2s; }
  .nav-item:hover > a, .nav-item:hover > .drop-btn { background: rgba(0,0,0,0.1); }
  
  .dropdown-content { display: none; position: absolute; background: white; min-width: 180px; top: 40px; left: 0; box-shadow: 0 4px 10px rgba(0,0,0,0.2); border-radius: 0 0 4px 4px; }
  .dropdown-content a { color: #333 !important; border-bottom: 1px solid #eee; padding: 10px 15px; height: auto !important; display: block !important; }
  .dropdown-content a:hover { background: #f0f0f0; color: #37b5ff !important; }
  .nav-item:hover .dropdown-content { display: block; }

  #nav-toggle { display: none; color: white; background: rgba(0,0,0,0.2); border: none; padding: 4px 8px; border-radius: 3px; font-weight: bold; font-size: 10px; cursor: pointer; }

  @media (max-width: 900px) {
    #nav-toggle { display: block; }
    #nav-links { display: none; position: absolute; top: 40px; left: 0; width: 100%; background: #37b5ff; flex-direction: column; height: auto; padding: 10px 0; border-bottom: 2px solid rgba(0,0,0,0.1); }
    #nav-links.active { display: flex; }
    .nav-item { width: 100%; height: auto; }
    .nav-item a, .drop-btn { padding: 12px 20px; justify-content: center; }
    .dropdown-content { position: relative; top: 0; width: 100%; background: #f9f9f9; box-shadow: none; }
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

    let html = `<div class="nav-item"><a href="${fix('https://www.wildandwandering.com/wet/bookwet')}">Home</a></div>`;

    if (user === 'BOSS') {
        html += `
            <div class="nav-item">
              <span class="drop-btn" style="background:rgba(255,255,255,0.2)">BOSS TOOLS ▾</span>
              <div class="dropdown-content">
                <a href="${fix('https://loren-6q.github.io/WETSalaries/')}">Salaries</a>
                <a href="${fix('https://loren-6q.github.io/WETParser/')}">Parser</a>
                <a href="${fix('https://bar-stock-nine.vercel.app/')}">Stock Control</a>
                <a href="#">Accounting (Soon)</a>
              </div>
            </div>`;
    }

    if (user === 'BOSS' || user === 'REC') {
        html += `
            <div class="nav-item">
              <span class="drop-btn">฿ Pricing ▾</span>
              <div class="dropdown-content">
                <a href="https://inbox.myallocator.com/booknow/-sxO1cCV5jLMwqZTXY629A" target="_blank">WET Booking Engine</a>
                <a href="https://www.booking.com/searchresults.en-gb.html?dest_id=900050772&dest_type=city&checkin=2026-12-31&checkout=2027-01-01&group_adults=1&no_rooms=1&group_children=0&order=price" target="_blank">Booking.com Search</a>
                <a href="https://www.hostelworld.com/pwa/s?q=Koh%20Phangan..." target="_blank">Hostelworld Search</a>
              </div>
            </div>
            <div class="nav-item">
              <span class="drop-btn">Hotel Systems ▾</span>
              <div class="dropdown-content">
                <a href="https://sg.loventis.net/Reception" target="_blank">Loventis (PMS)</a>
                <a href="https://inbox.myallocator.com/en/availability/58137" target="_blank">MyAllocator</a>
                <a href="https://account.booking.com/sign-in" target="_blank">B.com Login</a>
                <a href="https://inbox.hostelworld.com/" target="_blank">HW Login</a>
              </div>
            </div>`;
    }

    if (user === 'BAR' || user === 'BOSS') {
         html += `<div class="nav-item"><a href="${fix('https://bar-stock-nine.vercel.app/')}">Stock</a></div>`;
    }

    html += `<div class="nav-item"><a href="${fix('https://loren-6q.github.io/Full-Moon-Week-Schedule/')}">FMW</a></div>`;

    const bar = document.createElement('nav');
    bar.id = 'global-nav';
    bar.innerHTML = `
        <a href="https://wetpoolparty.com" class="nav-logo">
            <img src="https://raw.githubusercontent.com/loren-6q/WETNav/main/logo-icon.png" alt="WET Logo">
            <span>BUSINESS SUITE</span>
        </a>
        <button id="nav-toggle">MENU</button>
        <div id="nav-links">${html}</div>
    `;

    document.head.insertAdjacentHTML('beforeend', navStyle);
    document.body.prepend(bar);
    document.body.style.paddingTop = "40px";

    // Global persistence
    if (user) {
        document.querySelectorAll('a').forEach(a => { a.href = fix(a.href); });
    }

    const btn = document.getElementById('nav-toggle');
    if (btn) btn.onclick = () => document.getElementById('nav-links').classList.toggle('active');
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderNav);
} else {
    renderNav();
}
