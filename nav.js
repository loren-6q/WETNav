const navStyle = `
<style>
  #global-nav { background: #37b5ff !important; color: white !important; font-family: sans-serif; position: fixed; top: 0; left: 0; width: 100%; z-index: 999999; display: flex; justify-content: space-between; align-items: center; padding: 0 15px; height: 40px; box-sizing: border-box; border-bottom: 2px solid rgba(0,0,0,0.1); }
  .nav-logo { display: flex; align-items: center; gap: 8px; text-decoration: none; color: white !important; font-weight: 800; font-size: 14px; height: 100%; }
  .nav-logo img { height: 24px; width: auto; border-radius: 3px; display: block; }
  #nav-links { display: flex; gap: 5px; align-items: center; height: 100%; }
  .nav-item { position: relative; height: 100%; display: flex; align-items: center; }
  .nav-item a, .drop-btn { color: white !important; text-decoration: none; font-size: 10px; font-weight: 700; padding: 0 10px; cursor: pointer; border: none; background: none; display: flex; align-items: center; height: 100%; transition: 0.2s; text-transform: uppercase; letter-spacing: 0.5px; }
  .nav-item:hover > a, .nav-item:hover > .drop-btn { background: rgba(0,0,0,0.1); }
  .dropdown-content { display: none; position: absolute; background: white; min-width: 200px; top: 40px; left: 0; box-shadow: 0 4px 15px rgba(0,0,0,0.2); border-radius: 0 0 4px 4px; }
  .dropdown-content a { color: #333 !important; border-bottom: 1px solid #eee; padding: 12px 15px; height: auto !important; display: block !important; text-transform: none; letter-spacing: normal; font-size: 12px; }
  .dropdown-content a:hover { background: #f8fafc; color: #37b5ff !important; }
  .nav-item:hover .dropdown-content { display: block; }
  @media (max-width: 950px) {
    #nav-links { display: none; position: absolute; top: 40px; left: 0; width: 100%; background: #37b5ff; flex-direction: column; height: auto; padding: 10px 0; }
    #nav-links.active { display: flex; }
    .nav-item { width: 100%; height: auto; }
    .nav-item a, .drop-btn { padding: 15px 20px; justify-content: center; }
    .dropdown-content { position: relative; top: 0; width: 100%; background: #f1f5f9; box-shadow: none; }
  }
</style>
`;

const renderNav = () => {
    if (document.getElementById('global-nav')) return;
    const user = new URLSearchParams(window.location.search).get('user') || 'Staff';
    const fix = (u) => {
        if (!user || u.includes('user=')) return u;
        const sep = u.includes('?') ? '&' : '?';
        const domains = ['github.io', 'netlify.app', 'vercel.app', 'wildandwandering.com', 'wetpoolparty.com', 'onrender.com'];
        if (domains.some(d => u.includes(d))) return u + sep + 'user=' + user;
        return u;
    };

    let html = '<div class="nav-item"><a href="' + fix('https://loren-6q.github.io/WETNav/') + '" data-type="ignore">Home</a></div>';

    // 1. ACCOUNTING (BOSS)
    if (user === 'BOSS') {
        html += '<div class="nav-item"><span class="drop-btn">Accounting ▾</span><div class="dropdown-content">' +
                '<a href="#" data-type="admin" data-icon="🏦" data-desc="WET overall accounting. (coming soon)">Accounting</a>' +
                '<a href="' + fix('https://wetsalaries.netlify.app/') + '" data-type="admin" data-icon="💰" data-desc="Staff payroll.">Salaries</a>' +
                '</div></div>';
    }

    // 2. ADMIN (BOSS, REC)
    if (user === 'BOSS' || user === 'REC') {
        html += '<div class="nav-item"><span class="drop-btn">Admin ▾</span><div class="dropdown-content">' +
                '<a href="https://inbox.myallocator.com/en/availability/58137" target="_blank" data-type="sys-back" data-icon="🔑" data-desc="Channel manager.">MyAllocator</a>' +
                '<a href="https://account.booking.com/sign-in" target="_blank" data-type="sys-back" data-icon="🛂" data-desc="Booking .com Extranet.">B.com Login</a>' +
                '<a href="https://inbox.hostelworld.com/" target="_blank" data-type="sys-back" data-icon="🛂" data-desc="Hostelworld Extranet.">HW Login</a>' +
                '</div></div>';
    }

    // 3. BOOKING (BOSS, REC)
    if (user === 'BOSS' || user === 'REC') {
        html += '<div class="nav-item"><span class="drop-btn">Booking ▾</span><div class="dropdown-content">' +
                '<a href="https://sg.loventis.net/Reception" target="_blank" data-type="sys-back" data-icon="🏩" data-desc="Reservation management.">Loventis (PMS)</a>' +
                '<a href="https://docs.google.com/spreadsheets/d/1UqivgGUjV0JAO2vB4QFjdw0c62pSsdlMsna-z4xE_SQ/edit?usp=sharing" target="_blank" data-type="sys-back" data-icon="💸" data-desc="Are Hostelworld bookings refundable?">Refundability</a>' +
                '<a href="' + fix('https://loren-6q.github.io/WETParser/') + '" data-type="admin" data-icon="📑" data-desc="Clean AirBnB, Booking .com and CC data.">Parser</a>' +
                '</div></div>';
    }

    // 4. STAFFING (BOSS, REC)
    if (user === 'BOSS' || user === 'REC') {
        html += '<div class="nav-item"><span class="drop-btn">Staffing ▾</span><div class="dropdown-content">' +
                '<a href="' + fix('https://loren-6q.github.io/WETvCal/') + '" data-type="ops" data-icon="🗓️" data-desc="Calendar for stay dates of temp workers.">V Cal</a>' +
                '<a href="' + fix('https://staff-scheduler.onrender.com/') + '" target="_blank" data-type="ops" data-icon="📅" data-desc="Schedule part-time staff.">Scheduler</a>' +
                '</div></div>';
    }

    // 5. PRICE QUOTES (BOSS, REC)
    if (user === 'BOSS' || user === 'REC') {
        html += '<div class="nav-item"><span class="drop-btn">Quotes ▾</span><div class="dropdown-content">' +
                '<a href="https://inbox.myallocator.com/booknow/-sxO1cCV5jLMwqZTXY629A" target="_blank" data-type="sys-front" data-icon="🏨" data-desc="Direct rates.">WET Booking Engine</a>' +
                '<a href="https://www.booking.com/searchresults.en-gb.html?dest_id=900050772&dest_type=city" target="_blank" data-type="sys-front" data-icon="🔵" data-desc="Booking .com search.">B.com Search</a>' +
                '<a href="https://www.hostelworld.com/pwa/s?q=Koh%20Phangan" target="_blank" data-type="sys-front" data-icon="🟠" data-desc="Hostelworld search.">HW Search</a>' +
                '<a href="https://www.booking.com/hotel/th/wet-pool-party-haad-rin.html" target="_blank" data-type="sys-front" data-icon="🔗" data-desc="Direct link to WET on Booking .com.">WET on B.com</a>' +
                '<a href="https://www.hostelworld.com/pwa/hosteldetails.php/WET-a-Pool-Party-Hostel-by-Wild-Wandering/Koh-Phangan/313418" target="_blank" data-type="sys-front" data-icon="🔗" data-desc="Direct link to WET on Hostelworld.">WET on HW</a>' +
                '</div></div>';
    }

    // 6. OPERATIONS (BOSS, BAR)
    if (user === 'BOSS' || user === 'BAR') {
        html += '<div class="nav-item"><span class="drop-btn">Ops ▾</span><div class="dropdown-content">' +
                '<a href="#" data-type="ops" data-icon="💳" data-desc="Point of sale for each department. (coming soon)">POS</a>' +
                '<a href="' + fix('https://bar-stock-nine.vercel.app/') + '" data-type="ops" data-icon="🍺" data-desc="Bar & Hostel stock check, ordering, and inventory.">Stock</a>' +
                '<a href="' + fix('https://loren-6q.github.io/Full-Moon-Week-Schedule/') + '" data-type="ops" data-icon="🌕" data-desc="Full Moon Week Instagram publishing tool.">FMW</a>' +
                '</div></div>';
    }

    const bar = document.createElement('nav');
    bar.id = 'global-nav';
    bar.innerHTML = '<a href="' + fix('https://loren-6q.github.io/WETNav/') + '" class="nav-logo"><img src="https://raw.githubusercontent.com/loren-6q/WETNav/main/logo-icon.png"><span>WET BUSINESS HUB</span></a><div id="nav-links">' + html + '</div>';
    
    document.head.insertAdjacentHTML('beforeend', navStyle);
    document.body.prepend(bar);
    document.body.style.paddingTop = "40px";

    const btn = document.getElementById('nav-toggle');
    if (btn) btn.onclick = () => document.getElementById('nav-links').classList.toggle('active');
};
renderNav();
