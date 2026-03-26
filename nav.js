const navStyle = `<style>
  #global-nav { background: #37b5ff !important; color: white !important; font-family: sans-serif; position: fixed; top: 0; left: 0; width: 100%; z-index: 9999999; display: flex; justify-content: space-between; align-items: center; padding: 0 15px; height: 40px; box-sizing: border-box; border-bottom: 2px solid rgba(0,0,0,0.1); }
  .nav-logo { display: flex; align-items: center; gap: 8px; text-decoration: none; color: white !important; font-weight: 800; font-size: 14px; height: 100%; white-space: nowrap; }
  .nav-logo img { height: 24px; width: auto; border-radius: 3px; display: block; }
  
  #nav-links { display: flex; gap: 5px; align-items: center; height: 100%; }
  .nav-item { position: relative; height: 100%; display: flex; align-items: center; }
  .nav-item a, .drop-btn { color: white !important; text-decoration: none; font-size: 10px; font-weight: 700; padding: 0 10px; cursor: pointer; border: none; background: none; display: flex; align-items: center; height: 100%; transition: 0.2s; text-transform: uppercase; letter-spacing: 0.5px; }
  .nav-item:hover > a, .nav-item:hover > .drop-btn { background: rgba(0,0,0,0.1); }
  
  .dropdown-content { display: none; position: absolute; background: white; min-width: 200px; top: 40px; left: 0; box-shadow: 0 4px 15px rgba(0,0,0,0.2); border-radius: 0 0 4px 4px; border: 1px solid #ddd; }
  .dropdown-content a { color: #333 !important; border-bottom: 1px solid #eee; padding: 12px 15px; height: auto !important; display: block !important; text-transform: none; font-size: 12px; }
  .dropdown-content a:hover { background: #f8fafc; color: #37b5ff !important; }
  .nav-item:hover .dropdown-content { display: block; }

  /* HAMBURGER BUTTON - HIDDEN ON DESKTOP */
  #nav-toggle { display: none; color: black; background: gold; border: none; padding: 5px 12px; border-radius: 4px; font-weight: 900; font-size: 11px; cursor: pointer; text-transform: uppercase; }

  /* FORCE HAMBURGER AT 1100PX REGARDLESS OF DEVICE */
  @media (max-width: 1100px) {
    #nav-toggle { display: block !important; }
    #nav-links { 
        display: none; 
        position: fixed; 
        top: 40px; 
        left: 0; 
        width: 100%; 
        background: #37b5ff; 
        flex-direction: column; 
        height: calc(100vh - 40px); 
        overflow-y: auto; 
        padding: 10px 0; 
        z-index: 9999998;
    }
    #nav-links.active { display: flex !important; }
    .nav-item { width: 100%; height: auto; display: block; }
    .nav-item a, .drop-btn { padding: 15px 25px; justify-content: flex-start; width: 100%; box-sizing: border-box; font-size: 14px; border-bottom: 1px solid rgba(0,0,0,0.05); }
    
    .dropdown-content { 
        display: block !important; 
        position: static; 
        box-shadow: none; 
        background: rgba(255,255,255,0.1); 
        border: none; 
        min-width: 100%;
    }
    .dropdown-content a { color: white !important; padding-left: 45px; border-bottom: 1px solid rgba(255,255,255,0.05); }
    .dropdown-content a:hover { background: rgba(255,255,255,0.2); }
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

    let html = `<div class="nav-item"><a href="${fix('https://loren-6q.github.io/WETNav/')}" data-type="ignore">Home</a></div>`;

    // 1. ACCOUNTING
    if (user === 'BOSS') {
        let group_accounting = `<a href="#" data-type="accounting" data-icon="🏦" data-desc="WET overall accounting. (coming soon)">Accounting</a>`;
        group_accounting += `<a href="${fix('https://wetsalaries.netlify.app/')}" data-type="accounting" data-icon="💰" data-desc="Staff payroll.">Salaries</a>`;
        html += `<div class="nav-item"><span class="drop-btn">Acct ▾</span><div class="dropdown-content">${group_accounting}</div></div>`;
    }

    // 2. ADMIN
    if (['BOSS', 'REC'].includes(user)) {
        let group_admin = `<a href="https://inbox.myallocator.com/en/availability/58137" target="_blank" data-type="admin" data-icon="🔑" data-desc="Channel manager.">MyAllocator</a>`;
        group_admin += `<a href="https://account.booking.com/sign-in" target="_blank" data-type="admin" data-icon="🛂" data-desc="Booking .com Extranet.">B.com Login</a>`;
        group_admin += `<a href="https://inbox.hostelworld.com/" target="_blank" data-type="admin" data-icon="🛂" data-desc="Hostelworld Extranet.">HW Login</a>`;
        html += `<div class="nav-item"><span class="drop-btn">Admin ▾</span><div class="dropdown-content">${group_admin}</div></div>`;
    }

    // 3. BOOKING
    if (['BOSS', 'REC', 'OA'].includes(user)) {
        let group_booking = `<a href="https://sg.loventis.net/Reception" target="_blank" data-type="booking" data-icon="🏩" data-desc="Reservation management.">Loventis (PMS)</a>`;
        group_booking += `<a href="https://docs.google.com/spreadsheets/d/1UqivgGUjV0JAO2vB4QFjdw0c62pSsdlMsna-z4xE_SQ/edit?usp=sharing" target="_blank" data-type="booking" data-icon="💸" data-desc="Are Hostelworld bookings refundable?">Refundability</a>`;
        group_booking += `<a href="${fix('https://loren-6q.github.io/WETParser/')}" data-type="booking" data-icon="📑" data-desc="Clean AirBnB, Booking .com and CC data.">Parser</a>`;
        group_booking += `<a href="${fix('https://loren-6q.github.io/WETReviews/')}" data-type="booking" data-icon="⭐" data-desc="Monitor and respond to guest reviews.">WET Reviews</a>`;
        html += `<div class="nav-item"><span class="drop-btn">Booking ▾</span><div class="dropdown-content">${group_booking}</div></div>`;
    }

    // 4. QUOTES
    if (['BOSS', 'REC'].includes(user)) {
        let group_quotes = `<a href="https://inbox.myallocator.com/booknow/-sxO1cCV5jLMwqZTXY629A" target="_blank" data-type="quotes" data-icon="🏨" data-desc="Direct rates.">WET Booking Engine</a>`;
        group_quotes += `<a href="https://www.booking.com/searchresults.en-gb.html?dest_id=900050772&dest_type=city" target="_blank" data-type="quotes" data-icon="🔵" data-desc="Booking .com search.">B.com Search</a>`;
        group_quotes += `<a href="https://www.hostelworld.com/pwa/s?q=Koh%20Phangan" target="_blank" data-type="quotes" data-icon="🟠" data-desc="Hostelworld search.">HW Search</a>`;
        group_quotes += `<a href="https://www.booking.com/hotel/th/wet-pool-party-haad-rin.html" target="_blank" data-type="quotes" data-icon="🔗" data-desc="Direct link to WET on Booking .com.">WET on B.com</a>`;
        group_quotes += `<a href="https://www.hostelworld.com/pwa/hosteldetails.php/WET-a-Pool-Party-Hostel-by-Wild-Wandering/Koh-Phangan/313418" target="_blank" data-type="quotes" data-icon="🔗" data-desc="Direct link to WET on Hostelworld.">WET on HW</a>`;
        html += `<div class="nav-item"><span class="drop-btn">Quotes ▾</span><div class="dropdown-content">${group_quotes}</div></div>`;
    }

    // 5. STAFFING
    if (['BOSS', 'REC', 'OA'].includes(user)) {
        let group_staffing = `<a href="${fix('https://loren-6q.github.io/WETvCal/')}" data-type="staffing" data-icon="🗓️" data-desc="Calendar for stay dates of temp workers.">V Cal</a>`;
        group_staffing += `<a href="${fix('https://staff-scheduler.onrender.com/')}" target="_blank" data-type="staffing" data-icon="📅" data-desc="Schedule part-time staff.">Scheduler</a>`;
        html += `<div class="nav-item"><span class="drop-btn">Staffing ▾</span><div class="dropdown-content">${group_staffing}</div></div>`;
    }

    // 6. OPS
    if (['BOSS', 'BAR', 'REC'].includes(user)) {
        let group_ops = `<a href="#" data-type="ops" data-icon="💳" data-desc="Point of sale for each department. (coming soon)">POS</a>`;
        group_ops += `<a href="${fix('https://bar-stock-nine.vercel.app/')}" data-type="ops" data-icon="🍺" data-desc="Bar & Hostel stock check, ordering, and inventory.">Stock</a>`;
        group_ops += `<a href="${fix('https://loren-6q.github.io/Full-Moon-Week-Schedule/')}" data-type="ops" data-icon="🌕" data-desc="Full Moon Week Instagram publishing tool.">FMW</a>`;
        html += `<div class="nav-item"><span class="drop-btn">Ops ▾</span><div class="dropdown-content">${group_ops}</div></div>`;
    }

    const bar = document.createElement('nav');
    bar.id = 'global-nav';
    bar.innerHTML = `<a href="${fix('https://loren-6q.github.io/WETNav/')}" class="nav-logo"><img src="https://raw.githubusercontent.com/loren-6q/WETNav/main/logo-icon.png"><span>WET BUSINESS HUB</span></a><button id="nav-toggle">MENU</button><div id="nav-links">${html}</div>`;
    
    document.head.insertAdjacentHTML('beforeend', navStyle);
    document.body.prepend(bar);
    document.body.style.paddingTop = "40px";
    
    const btn = document.getElementById('nav-toggle');
    if (btn) btn.onclick = () => document.getElementById('nav-links').classList.toggle('active');
};
renderNav();
