const navStyle = `
<style>
  #global-nav { background: #111; color: white; font-family: sans-serif; position: fixed; top: 0; left: 0; width: 100%; z-index: 9999; display: flex; justify-content: space-between; align-items: center; padding: 0 20px; height: 50px; box-sizing: border-box; border-bottom: 2px solid #333; }
  .nav-logo { font-weight: bold; color: gold; text-decoration: none; font-size: 14px; letter-spacing: 1px; }
  #nav-links { display: flex; gap: 8px; align-items: center; }
  .nav-item { position: relative; }
  .nav-item > a, .drop-btn { color: #ccc; text-decoration: none; font-size: 12px; padding: 15px 5px; display: block; cursor: pointer; border: none; background: none; white-space: nowrap; }
  .nav-item:hover > a, .nav-item:hover > .drop-btn { color: gold; }
  .dropdown-content { display: none; position: absolute; background: #222; min-width: 190px; top: 50px; left: 0; border: 1px solid #333; box-shadow: 0 8px 16px rgba(0,0,0,0.5); }
  .dropdown-content a { color: white; padding: 12px 16px; text-decoration: none; display: block; font-size: 12px; border-bottom: 1px solid #333; }
  .dropdown-content a:hover { background: #333; color: gold; }
  .nav-item:hover .dropdown-content { display: block; }
  #nav-toggle { display: none; background: none; border: 1px solid #444; color: white; padding: 5px 10px; cursor: pointer; }
  @media (max-width: 900px) {
    #nav-links { display: none; flex-direction: column; position: absolute; top: 50px; left: 0; width: 100%; background: #111; padding: 10px 0; border-bottom: 2px solid #333; }
    #nav-links.active { display: flex; }
    #nav-toggle { display: block; }
    .dropdown-content { position: relative; top: 0; width: 100%; background: #181818; border: none; }
    .nav-item { width: 100%; text-align: center; }
  }
</style>
`;

window.addEventListener('load', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const user = urlParams.get('user');
    const userSuffix = user ? `user=${user}` : "";

    const fixLink = (url) => {
        if (!user || url.startsWith('#')) return url;
        try {
            const newUrl = new URL(url);
            // Only attach user code to your business domains
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
              <span class="drop-btn" style="color:gold;">BOSS MENU ▾</span>
              <div class="dropdown-content">
                <a href="${fixLink('https://loren-6q.github.io/WETSalaries/')}">Salaries</a>
                <a href="${fixLink('https://loren-6q.github.io/WETParser/')}">Parser</a>
                <a href="${fixLink('https://bar-stock-nine.vercel.app/')}">Stock</a>
                <a href="#">Accounting (Soon)</a>
              </div>
            </div>`;
    }

    if (user === 'BOSS' || user === 'REC') {
        linksHTML += `
            <div class="nav-item">
              <span class="drop-btn">฿ Pricing ▾</span>
              <div class="dropdown-content">
                <a href="https://inbox.myallocator.com/booknow/-sxO1cCV5jLMwqZTXY629A" target="_blank">WET Booking Engine</a>
                <a href="https://www.booking.com/searchresults.en-gb.html?dest_id=900050772&dest_type=city&checkin=2026-12-31&checkout=2027-01-01&group_adults=1&no_rooms=1&group_children=0&order=price" target="_blank">Booking.com</a>
                <a href="https://www.hostelworld.com/pwa/s?q=Koh%20Phangan..." target="_blank">Hostelworld</a>
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

    if (user === 'BOSS' || user === 'BAR') {
        linksHTML += `<div class="nav-item"><a href="${fixLink('https://bar-stock-nine.vercel.app/')}">Stock</a></div>`;
    }

    linksHTML += `<div class="nav-item"><a href="${fixLink('https://loren-6q.github.io/Full-Moon-Week-Schedule/')}">FMW</a></div>`;

    const fullNav = `
    <nav id="global-nav">
      <a href="${fixLink('https://wetpoolparty.com')}" class="nav-logo">WET POOL PARTY</a>
      <button id="nav-toggle">☰</button>
      <div id="nav-links">${linksHTML}</div>
    </nav>`;

    document.head.insertAdjacentHTML('beforeend', navStyle);
    document.body.insertAdjacentHTML('afterbegin', navHTML);
    document.body.style.paddingTop = "50px";

    // Auto-fix every link on the page to keep the user role active
    if (user) {
        document.querySelectorAll('a').forEach(a => { a.href = fixLink(a.href); });
    }

    const toggle = document.getElementById('nav-toggle');
    const links = document.getElementById('nav-links');
    if(toggle) toggle.addEventListener('click', () => links.classList.toggle('active'));
});
