const navStyle = `
<style>
  #global-nav { background: #37b5ff !important; color: white !important; font-family: sans-serif; position: fixed; top: 0; left: 0; width: 100%; z-index: 99999; display: flex; justify-content: space-between; align-items: center; padding: 0 15px; height: 40px; box-sizing: border-box; border-bottom: 2px solid rgba(0,0,0,0.1); }
  .nav-logo { display: flex; align-items: center; gap: 8px; text-decoration: none; height: 100%; }
  .nav-logo img { height: 30px; width: auto; border-radius: 4px; display: block; }
  .nav-logo span { font-weight: 800; color: white; letter-spacing: 0.5px; font-size: 16px; }
  
  #nav-links { display: flex; gap: 2px; align-items: center; height: 100%; }
  .nav-item { position: relative; height: 100%; display: flex; align-items: center; }
  .nav-item > a, .drop-btn { color: white !important; text-decoration: none; font-size: 11px; font-weight: 600; padding: 0 10px; height: 100%; display: flex; align-items: center; cursor: pointer; border: none; background: none; white-space: nowrap; }
  .nav-item:hover > a, .nav-item:hover > .drop-btn { background: rgba(0,0,0,0.1); }
  
  .dropdown-content { display: none; position: absolute; background: white; min-width: 180px; top: 40px; left: 0; border: 1px solid #ddd; box-shadow: 0 4px 12px rgba(0,0,0,0.2); }
  .dropdown-content a { color: #333 !important; padding: 10px 14px; text-decoration: none; display: block; font-size: 11px; border-bottom: 1px solid #eee; }
  .dropdown-content a:hover { background: #f0f0f0; color: #37b5ff !important; }
  .nav-item:hover .dropdown-content { display: block; }

  #nav-toggle { display: none; background: white; border: none; color: #37b5ff; padding: 2px 8px; cursor: pointer; border-radius: 3px; font-weight: bold; font-size: 10px; }

  @media (max-width: 950px) {
    #nav-links { display: none; flex-direction: column; position: absolute; top: 40px; left: 0; width: 100%; background: #37b5ff; height: auto; padding: 10px 0; }
    #nav-links.active { display: flex; }
    #nav-toggle { display: block; }
    .dropdown-content { position: relative; top: 0; width: 100%; background: #f9f9f9; box-shadow: none; }
    .nav-item { width: 100%; height: auto; }
    .nav-item > a, .drop-btn { padding: 12px 20px; width: 100%; }
  }
</style>
`;

const initNav = () => {
    // Prevent multiple injections
    if (document.getElementById('global-nav')) return;

    const urlParams = new URLSearchParams(window.location.search);
    const user = urlParams.get('user');

    const fixLink = (url) => {
        if (!user || url.startsWith('#')) return url;
        try {
            const newUrl = new URL(url);
            const myDomains = ['github.io', 'netlify.app', 'vercel.app', 'wildandwandering.com', 'wetpoolparty.com'];
            if (myDomains.some(d => newUrl.hostname.includes(d))) {
                newUrl.searchParams.set('user', user);
                return newUrl.toString();
            }
        } catch(e) { return url; }
        return url;
    };

    let linksHTML = `<div class="nav-item"><a href="${fixLink('https://www.wildandwandering.com/wet/bookwet')}">Home</a></div>`;

    if (user === 'BOSS') {
        linksHTML += `
            <div class="nav-item">
              <span class="drop-btn" style="background:rgba(255,255,255,0.2)">BOSS TOOLS ▾</span>
              <div class="dropdown-content">
                <a href="${fixLink('https://loren-6q.github.io/WETSalaries/')}">Salaries</a>
                <a href="${fixLink('https://loren-6q.github.io/WETParser/')}">Parser</a>
                <a href="${fixLink('https://bar-stock-nine.vercel.app/')}">Stock Control</a>
              </div>
            </div>`;
    }

    if (user === 'BOSS' || user === 'REC') {
        linksHTML += `
            <div class="nav-item">
              <span class="drop-btn">฿ Pricing ▾</span>
              <div class="dropdown-content">
                <a href="https://inbox.myallocator.com/booknow/-sxO1cCV5jLMwqZTXY629A" target="_blank">Booking Engine</a>
                <a href="https://www.booking.com/searchresults.en-gb.html?dest_id=900050772&dest_type=city&checkin=2026-12-31&checkout=2027-01-01&group_adults=1&no_rooms=1&group_children=0&order=price" target="_blank">Booking.com</a>
                <a href="https://www.hostelworld.com/pwa/s?q=Koh%20Phangan..." target="_blank">Hostelworld</a>
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
         linksHTML += `<div class="nav-item"><a href="${fixLink('https://bar-stock-nine.netlify.app/')}">Stock</a></div>`;
    }

    linksHTML += `<div class="nav-item"><a href="${fixLink('https://loren-6q.github.io/Full-Moon-Week-Schedule/')}">FMW</a></div>`;

    const fullNav = `
    <nav id="global-nav">
      <a href="${fixLink('https://wetpoolparty.com')}" class="nav-logo">
        <img src="logo-icon.png" onerror="this.style.display='none'">
        <span>WET</span>
      </a>
      <button id="nav-toggle">MENU</button>
      <div id="nav-links">${linksHTML}</div>
    </nav>`;

    document.head.insertAdjacentHTML('beforeend', navStyle);
    document.body.insertAdjacentHTML('afterbegin', fullNav);
    document.body.style.paddingTop = "40px";

    if (user) {
        document.querySelectorAll('a').forEach(a => { a.href = fixLink(a.href); });
    }

    const btn = document.getElementById('nav-toggle');
    const links = document.getElementById('nav-links');
    if (btn) btn.onclick = () => links.classList.toggle('active');
};

// Start the engine
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNav);
} else {
    initNav();
}
