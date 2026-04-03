/* Font Import */
const fontLink = document.createElement('link');
fontLink.rel = 'stylesheet';
fontLink.href = 'https://fonts.googleapis.com/css2?family=Archivo+Narrow:wght@600;700&display=swap';
document.head.appendChild(fontLink);

const navStyle = `<style>
  #global-nav { background: #37b5ff !important; color: white !important; font-family: 'Archivo Narrow', sans-serif; position: fixed; top: 0; left: 0; width: 100%; z-index: 1000000; display: flex; justify-content: space-between; align-items: center; padding: 0 10px; height: 40px; box-sizing: border-box; }
  .nav-logo { display: flex; align-items: center; gap: 6px; text-decoration: none; color: white !important; font-weight: 700; font-size: 14px; white-space: nowrap; }
  .nav-logo img { height: 22px; width: auto; border-radius: 3px; }
  #nav-links { display: flex; gap: 0; align-items: center; height: 100%; }
  .nav-item { position: relative; height: 100%; display: flex; align-items: center; }
  .nav-item a, .drop-btn { color: white !important; text-decoration: none; font-size: 10.5px; font-weight: 600; padding: 0 6px; cursor: pointer; border: none; background: none; display: flex; align-items: center; height: 100%; text-transform: uppercase; transition: 0.2s; white-space: nowrap; }
  .nav-item:hover > a, .nav-item:hover > .drop-btn { background: rgba(0,0,0,0.1); }
  .dropdown-content { display: none; position: absolute; background: white; min-width: 170px; top: 40px; left: 0; box-shadow: 0 4px 15px rgba(0,0,0,0.2); border-radius: 0 0 4px 4px; border: 1px solid #ddd; }
  .dropdown-content a { color: #333 !important; border-bottom: 1px solid #eee; padding: 10px 12px !important; height: auto !important; display: block !important; text-transform: none; font-size: 12.5px; }
  .dropdown-content a:hover { background: #f8fafc; color: #37b5ff !important; }
  .nav-item:hover .dropdown-content { display: block; }
  #nav-toggle { display: none; color: black; background: gold; border: none; padding: 4px 8px; border-radius: 4px; font-weight: 700; font-size: 10px; cursor: pointer; font-family: 'Archivo Narrow', sans-serif; }
  #nav-close { display: none; width: 100%; text-align: right; padding: 12px 20px; box-sizing: border-box; background: #f1f5f9; color: #475569; font-weight: 700; cursor: pointer; border: none; font-size: 14px; border-bottom: 1px solid #e2e8f0; }

  @media (max-width: 700px) {
    #nav-toggle { display: block !important; }
    #nav-links { display: block !important; position: fixed; top: 0; right: -310px; width: 300px; height: 100vh; background: white !important; transition: transform 0.3s ease-in-out; padding: 0; box-shadow: -5px 0 25px rgba(0,0,0,0.4); overflow-y: auto; z-index: 1000001; }
    #nav-links.active { transform: translateX(-310px); }
    #nav-close { display: block; }
    .nav-item { display: block; height: auto; border-bottom: 1px solid #eee; }
    .nav-item a, .drop-btn { color: #1e293b !important; padding: 15px 20px; font-size: 14px; width: 100%; background: #f8fafc; justify-content: space-between; height: auto; }
    .dropdown-content { display: block !important; position: static; background: white; box-shadow: none; border: none; }
    .dropdown-content a { padding: 12px 20px 12px 40px !important; color: #64748b !important; background: white !important; border-bottom: 1px solid #f1f5f9; }
  }
</style>`;

const renderNav = () => {
    if (document.getElementById('global-nav')) return;
    const user = new URLSearchParams(window.location.search).get('user') || 'Staff';
    const fix = (u) => {
        if (!user || u === '#' || u.includes('user=')) return u;
        const sep = u.includes('?') ? '&' : '?';
        const domains = ['github.io', 'netlify.app', 'vercel.app', 'wildandwandering.com', 'wetpoolparty.com', 'onrender.com'];
        return domains.some(d => u.includes(d)) ? u + sep + 'user=' + user : u;
    };

    let html = `<button id="nav-close">✕ CLOSE MENU</button>`;
    html += `<div class="nav-item"><a href="${fix('https://loren-6q.github.io/WETNav/')}" data-type="ignore">Home</a></div>`;

    // 1. ACCOUNTING
    if (user === 'BOSS') {
        let items = `<a href="#" data-type="accounting" data-icon="🏦" data-desc="Accounting.">Accounting</a>` +
                    `<a href="${fix('https://loren-6q.github.io/WETSalaries/')}" data-type="accounting" data-icon="💰" data-desc="Staff payroll.">Salaries</a>`;
        html += `<div class="nav-item"><span class="drop-btn">Acct ▾</span><div class="dropdown-content">${items}</div></div>`;
    }

    // 2. ADMIN
    if (user === 'BOSS' || user === 'REC') {
        let items = `<a href="https://inbox.myallocator.com/en/availability/58137" target="_blank" data-type="admin" data-icon="🌐" data-desc="Channel manager.">MyAllocator</a>` +
                    `<a href="https://account.booking.com/sign-in" target="_blank" data-type="admin" data-icon="🛂" data-desc="B.com Extranet.">B.com Login</a>` +
                    `<a href="https://inbox.hostelworld.com/" target="_blank" data-type="admin" data-icon="🛂" data-desc="HW Extranet.">HW Login</a>`;
        html += `<div class="nav-item"><span class="drop-btn">Admin ▾</span><div class="dropdown-content">${items}</div></div>`;
    }

    // 3. BOOKING
    if (['BOSS', 'REC', 'OA'].includes(user)) {
        let items = `<a href="https://sg.loventis.net/Reception" target="_blank" data-type="booking" data-icon="🏩" data-desc="Loventis (PMS)">Loventis (PMS)</a>` +
                    `<a href="https://docs.google.com/spreadsheets/d/1UqivgGUjV0JAO2vB4QFjdw0c62pSsdlMsna-z4xE_SQ/edit?usp=sharing" target="_blank" data-type="booking" data-icon="💸" data-desc="Refund tracking.">Refundability</a>` +
                    `<a href="${fix('https://loren-6q.github.io/WETParser/')}" data-type="booking" data-icon="📑" data-desc="Data cleaning.">Parser</a>`;
        if (['BOSS', 'OA'].includes(user)) items += `<a href="${fix('https://loren-6q.github.io/WETReviews/')}" data-type="booking" data-icon="⭐" data-desc="Guest feedback.">WET Reviews</a>`;
        html += `<div class="nav-item"><span class="drop-btn">Booking ▾</span><div class="dropdown-content">${items}</div></div>`;
    }

    // 4. PRICE QUOTES
    if (['BOSS', 'REC', 'OA', 'BAR'].includes(user)) {
        let items = "";
        if (['BOSS', 'REC', 'OA'].includes(user)) items += `<a href="${fix('https://loren-6q.github.io/WETPricer/')}" data-type="quotes" data-icon="🏷️" data-desc="Quote tool.">WET Pricer</a>`;
        items += `<a href="https://inbox.myallocator.com/booknow/-sxO1cCV5jLMwqZTXY629A" target="_blank" data-type="quotes" data-icon="🏨" data-desc="Direct rates.">WET Booking Engine</a>`;
        if (['BOSS', 'REC', 'OA'].includes(user)) {
            items += `<a href="https://www.booking.com/searchresults.en-gb.html?dest_id=900050772" target="_blank" data-type="quotes" data-icon="🔵" data-desc="B.com search.">B.com Search</a>` +
                     `<a href="https://www.hostelworld.com/pwa/s?q=Koh%20Phangan" target="_blank" data-type="quotes" data-icon="🟠" data-desc="HW search.">HW Search</a>` +
                     `<a href="https://www.booking.com/hotel/th/wet-pool-party-haad-rin.html" target="_blank" data-type="quotes" data-icon="🔗" data-desc="WET on B.com.">WET on B.com</a>` +
                     `<a href="https://www.hostelworld.com/pwa/hosteldetails.php/WET-a-Pool-Party-Hostel-by-Wild-Wandering/Koh-Phangan/313418" target="_blank" data-type="quotes" data-icon="🔗" data-desc="WET on HW.">WET on HW</a>`;
        }
        html += `<div class="nav-item"><span class="drop-btn">Quotes ▾</span><div class="dropdown-content">${items}</div></div>`;
    }

    // 5. STAFFING
    if (['BOSS', 'REC', 'OA'].includes(user)) {
        let items = `<a href="${fix('https://loren-6q.github.io/WETvCal/')}" data-type="staffing" data-icon="🗓️" data-desc="Temp staff.">V Cal</a>` +
                    `<a href="${fix('https://staff-scheduler.onrender.com/')}" target="_blank" data-type="staffing" data-icon="📅" data-desc="Scheduler.">Scheduler</a>`;
        html += `<div class="nav-item"><span class="drop-btn">Staffing ▾</span><div class="dropdown-content">${items}</div></div>`;
    }

    // 6. OPS
    if (['BOSS', 'BAR', 'REC', 'OA', 'HK'].includes(user)) {
        let items = "";
        if (['BOSS', 'REC', 'BAR'].includes(user)) items += `<a href="#" data-type="ops" data-icon="💳" data-desc="Point of sale.">POS</a>`;
        if (['BOSS', 'REC', 'BAR', 'OA'].includes(user)) items += `<a href="${fix('https://bar-stock-nine.vercel.app/')}" data-type="ops" data-icon="🍺" data-desc="Stock check.">Stock</a>`;
        if (['BOSS', 'OA'].includes(user)) items += `<a href="${fix('https://loren-6q.github.io/Full-Moon-Week-Schedule/')}" data-type="ops" data-icon="🌕" data-desc="Instagram tool.">FMW</a>`;
        if (['BOSS', 'REC', 'HK'].includes(user)) items += `<a href="${fix('https://loren-6q.github.io/WETDoors/')}" data-type="ops" data-icon="🔒" data-desc="Access control.">Doors</a>`;
        html += `<div class="nav-item"><span class="drop-btn">Ops ▾</span><div class="dropdown-content">${items}</div></div>`;
    }

    const bar = document.createElement('nav');
    bar.id = 'global-nav';
    bar.innerHTML = `<a href="${fix('https://loren-6q.github.io/WETNav/')}" class="nav-logo"><img src="https://raw.githubusercontent.com/loren-6q/WETNav/main/logo-icon.png"><span>WET HUB</span></a><button id="nav-toggle">MENU</button><div id="nav-links">${html}</div>`;
    document.head.insertAdjacentHTML('beforeend', navStyle);
    document.body.prepend(bar);
    document.body.style.paddingTop = "40px";
    const menu = document.getElementById('nav-links');
    document.getElementById('nav-toggle').onclick = () => menu.classList.add('active');
    document.getElementById('nav-close').onclick = () => menu.classList.remove('active');
};
renderNav();
