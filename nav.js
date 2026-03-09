const navStyle = `
<style>
  #global-nav { background: #111; color: white; font-family: sans-serif; position: fixed; top: 0; left: 0; width: 100%; z-index: 9999; display: flex; justify-content: space-between; align-items: center; padding: 0 20px; height: 50px; box-sizing: border-box; border-bottom: 2px solid #333; }
  .nav-logo { font-weight: bold; color: gold; text-decoration: none; font-size: 14px; letter-spacing: 1px; }
  #nav-links { display: flex; gap: 10px; align-items: center; }
  .nav-item { position: relative; }
  .nav-item > a, .drop-btn { color: #ccc; text-decoration: none; font-size: 13px; padding: 15px 8px; display: block; cursor: pointer; border: none; background: none; }
  .nav-item:hover > a, .nav-item:hover > .drop-btn { color: gold; }
  .dropdown-content { display: none; position: absolute; background: #222; min-width: 180px; top: 50px; left: 0; border: 1px solid #333; box-shadow: 0 8px 16px rgba(0,0,0,0.5); }
  .dropdown-content a { color: white; padding: 12px 16px; text-decoration: none; display: block; font-size: 13px; border-bottom: 1px solid #333; }
  .dropdown-content a:hover { background: #333; color: gold; }
  .nav-item:hover .dropdown-content { display: block; }
  #nav-toggle { display: none; background: none; border: 1px solid #444; color: white; padding: 5px 10px; cursor: pointer; }
  @media (max-width: 768px) {
    #nav-links { display: none; flex-direction: column; position: absolute; top: 50px; left: 0; width: 100%; background: #111; padding: 10px 0; border-bottom: 2px solid #333; }
    #nav-links.active { display: flex; }
    #nav-toggle { display: block; }
    .dropdown-content { position: relative; top: 0; width: 100%; background: #181818; border: none; }
    .nav-item { width: 100%; text-align: center; }
  }
</style>
`;

window.addEventListener('load', () => {
    // 1. GET CURRENT USER
    const urlParams = new URLSearchParams(window.location.search);
    const user = urlParams.get('user');
    const userSuffix = user ? `user=${user}` : "";

    // Helper to add user to any link
    const fixLink = (url) => {
        if (!user) return url;
        const separator = url.includes('?') ? '&' : '?';
        return `${url}${separator}${userSuffix}`;
    };

    // 2. BUILD DYNAMIC LINKS
    let linksHTML = `<div class="nav-item"><a href="${fixLink('https://www.wildandwandering.com/wet/bookwet')}">Home</a></div>`;

    // ROLE BASED CONTENT
    switch (user) {
        case 'BOSS':
            linksHTML += `
                <div class="nav-item">
                  <span class="drop-btn" style="color:gold;">BOSS MENU ▾</span>
                  <div class="dropdown-content">
                    <a href="${fixLink('https://loren-6q.github.io/WETSalaries/')}">Salaries</a>
                    <a href="${fixLink('https://loren-6q.github.io/WETParser/')}">Parser</a>
                    <a href="${fixLink('https://bar-stock-nine.vercel.app/')}">Stock</a>
                    <a href="#">Accounting</a>
                  </div>
                </div>`;
            // Note: Boss also gets access to REC and BAR tools below
            
        case 'REC':
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
            if (user === 'REC') break; // Only break if NOT boss

        case 'BAR':
            linksHTML += `
                <div class="nav-item"><a href="${fixLink('https://bar-stock-nine.vercel.app/')}">Stock</a></div>
                <div class="nav-item"><a href="#">Bar POS</a></div>`;
            break;
    }

    linksHTML += `<div class="nav-item"><a href="${fixLink('https://loren-6q.github.io/Full-Moon-Week-Schedule/')}">FMW</a></div>`;

    // 3. INJECT NAV
    const fullNav = `
    <nav id="global-nav">
      <a href="${fixLink('https://wetpoolparty.com')}" class="nav-logo">WET POOL PARTY</a>
      <button id="nav-toggle">☰</button>
      <div id="nav-links">${linksHTML}</div>
    </nav>`;

    document.head.insertAdjacentHTML('beforeend', navStyle);
    document.body.insertAdjacentHTML('afterbegin', fullNav);
    document.body.style.paddingTop = "50px";

    // 4. PERSISTENCE LOGIC: Fix all other links on the page automatically
    if (user) {
        document.querySelectorAll('a').forEach(a => {
            if (a.hostname === window.location.hostname || a.href.includes('netlify.app') || a.href.includes('github.io') || a.href.includes('vercel.app')) {
                a.href = fixLink(a.href);
            }
        });
    }

    // Toggle menu
    const toggle = document.getElementById('nav-toggle');
    const links = document.getElementById('nav-links');
    if(toggle) toggle.addEventListener('click', () => links.classList.toggle('active'));
});
