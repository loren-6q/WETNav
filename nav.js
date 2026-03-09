const navStyle = `
<style>
  #global-nav { background: #37b5ff; color: white; font-family: sans-serif; position: fixed; top: 0; left: 0; width: 100%; z-index: 9999; display: flex; justify-content: space-between; align-items: center; padding: 0 15px; height: 40px; box-sizing: border-box; border-bottom: 2px solid rgba(0,0,0,0.1); }
  .nav-logo { display: flex; align-items: center; gap: 8px; text-decoration: none; height: 100%; }
  .nav-logo img { height: 32px; width: auto; filter: drop-shadow(0px 1px 2px rgba(0,0,0,0.2)); }
  .nav-logo span { font-weight: 800; color: white; letter-spacing: 0.5px; font-size: 18px; text-shadow: 1px 1px 2px rgba(0,0,0,0.2); }
  
  #nav-links { display: flex; gap: 2px; align-items: center; height: 100%; }
  .nav-item { position: relative; height: 100%; display: flex; align-items: center; }
  .nav-item > a, .drop-btn { color: white; text-decoration: none; font-size: 11px; font-weight: 600; padding: 0 10px; height: 100%; display: flex; align-items: center; cursor: pointer; border: none; background: none; white-space: nowrap; transition: 0.2s; }
  .nav-item:hover > a, .nav-item:hover > .drop-btn { background: rgba(255,255,255,0.2); color: #111; }
  
  .dropdown-content { display: none; position: absolute; background: white; min-width: 200px; top: 40px; left: 0; border: 1px solid #ddd; box-shadow: 0 4px 12px rgba(0,0,0,0.15); border-radius: 0 0 4px 4px; overflow: hidden; }
  .dropdown-content a { color: #333; padding: 10px 14px; text-decoration: none; display: block; font-size: 11px; border-bottom: 1px solid #eee; transition: 0.2s; }
  .dropdown-content a:hover { background: #f8f8f8; color: #37b5ff; padding-left: 18px; }
  .nav-item:hover .dropdown-content { display: block; }

  #nav-toggle { display: none; background: white; border: none; color: #37b5ff; padding: 4px 8px; cursor: pointer; border-radius: 3px; font-weight: bold; }

  @media (max-width: 950px) {
    #nav-links { display: none; flex-direction: column; position: absolute; top: 40px; left: 0; width: 100%; background: #37b5ff; padding: 5px 0; border-bottom: 3px solid rgba(0,0,0,0.1); height: auto; }
    #nav-links.active { display: flex; }
    #nav-toggle { display: block; }
    .dropdown-content { position: relative; top: 0; width: 100%; background: rgba(255,255,255,0.9); border: none; box-shadow: none; }
    .nav-item { width: 100%; height: auto; border-bottom: 1px solid rgba(255,255,255,0.1); }
    .nav-item > a, .drop-btn { padding: 12px 20px; width: 100%; box-sizing: border-box; }
  }
</style>
`;

const initNav = () => {
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

    // ROLE: BOSS
    if (user === 'BOSS') {
        linksHTML += `
            <div class="nav-item">
              <span class="drop-btn" style="color:#111; font-weight:800; background:rgba(255,255,255,0.7)">BOSS TOOLS ▾</span>
              <div class="dropdown-content">
                <a href="${fixLink('https://loren-6q.github.io/WETSalaries/')}">Salaries & Payroll</a>
                <a href="${fixLink('https://loren-6q.github.io/WETParser/')}">Parser Tool</a>
                <a href="${fixLink('https://bar-stock-nine.vercel.app/')}">Stock Control</a>
                <a href="#">Accounting (Soon)</a>
              </div>
            </div>`;
    }

    // ROLE: BOSS or RECEPTION
    if (user === 'BOSS' || user === 'REC') {
        linksHTML += `
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
                <a href="https://inbox.myallocator.com/en/availability/58137" target="_blank">MyAllocator (Channel)</a>
                <a href="https://account.booking.com/sign-in" target="_blank">B.com Login</a>
                <a href="https://inbox.hostelworld.com/" target="_blank">HW Login</a>
              </div>
            </div>`;
    }

    // ROLE: BOSS or BAR
    if (user === 'BAR' || user === 'BOSS') {
         linksHTML += `<div class="nav-item"><a href="${fixLink('https://bar-stock-nine.vercel.app/')}">Stock</a></div>`;
    }

    linksHTML += `<div class="nav-item"><a href="${fixLink('https://loren-6q.github.io/Full-Moon-Week-Schedule/')}">FMW</a></div>`;

    const fullNav = `
    <nav id="global-nav">
      <a href="${fixLink('https://wetpoolparty.com')}" class="nav-logo">
        <img src="https://raw.githubusercontent.com/loren-6q/WETNav/main/logo-icon.png" onerror="this.style.display='none'">
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

    const toggle = document.getElementById('nav-toggle');
    const links = document.getElementById
