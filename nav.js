const navStyle = `
<style>
  #global-nav { background: #111; color: white; font-family: sans-serif; position: fixed; top: 0; left: 0; width: 100%; z-index: 9999; display: flex; justify-content: space-between; align-items: center; padding: 0 20px; height: 50px; box-sizing: border-box; border-bottom: 2px solid #333; }
  .nav-logo { font-weight: bold; color: gold; text-decoration: none; letter-spacing: 1px; font-size: 14px; display: flex; align-items: center; }
  #nav-links { display: flex; gap: 10px; align-items: center; }
  
  /* Dropdown logic */
  .nav-item { position: relative; }
  .nav-item > a, .drop-btn { color: #ccc; text-decoration: none; font-size: 13px; padding: 15px 8px; display: block; cursor: pointer; border: none; background: none; transition: 0.3s; }
  .nav-item:hover > a, .nav-item:hover > .drop-btn { color: gold; }
  
  .dropdown-content { display: none; position: absolute; background: #222; min-width: 180px; top: 50px; left: 0; border: 1px solid #333; box-shadow: 0 8px 16px rgba(0,0,0,0.5); }
  .dropdown-content a { color: white; padding: 12px 16px; text-decoration: none; display: block; font-size: 13px; border-bottom: 1px solid #333; }
  .dropdown-content a:hover { background: #333; color: gold; }
  .nav-item:hover .dropdown-content { display: block; }

  #nav-toggle { display: none; background: none; border: 1px solid #444; color: white; padding: 5px 10px; cursor: pointer; border-radius: 4px; }

  @media (max-width: 768px) {
    #nav-links { display: none; flex-direction: column; position: absolute; top: 50px; left: 0; width: 100%; background: #111; padding: 10px 0; border-bottom: 2px solid #333; }
    #nav-links.active { display: flex; }
    #nav-toggle { display: block; }
    .dropdown-content { position: relative; top: 0; width: 100%; box-shadow: none; border: none; background: #181818; }
    .nav-item { width: 100%; text-align: center; }
  }
</style>
`;

window.addEventListener('load', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const isAdmin = urlParams.get('admin') === 'true';

    let navHTML = `
    <nav id="global-nav">
      <a href="https://www.wildandwandering.com/wet/bookwet" class="nav-logo">WET POOL PARTY</a>
      <button id="nav-toggle">MENU ☰</button>
      <div id="nav-links">
        
        <div class="nav-item">
          <span class="drop-btn">฿ Pricing ▾</span>
          <div class="dropdown-content">
            <a href="https://www.booking.com/searchresults.en-gb.html?dest_id=900050772&dest_type=city&checkin=2026-12-31&checkout=2027-01-01&group_adults=1&no_rooms=1&group_children=0&order=price" target="_blank">Booking.com Search</a>
            <a href="https://www.hostelworld.com/pwa/s?q=Koh%20Phangan,%20Thailand&country=Thailand&city=Koh%20Phangan&type=city&id=2017&from=2026-05-31&to=2026-06-01&guests=1&district=232&page=1" target="_blank">Hostelworld Search</a>
          </div>
        </div>

        <div class="nav-item">
          <span class="drop-btn">Logins ▾</span>
          <div class="dropdown-content">
            <a href="https://account.booking.com/sign-in" target="_blank">Booking Login</a>
            <a href="https://inbox.hostelworld.com/" target="_blank">HW Inbox</a>
            <a href="https://inbox.myallocator.com/en/availability/58137" target="_blank">MyAllocator</a>
            <a href="https://sg.loventis.net/Reception" target="_blank">Loventis</a>
          </div>
        </div>

        <div class="nav-item"><a href="https://bar-stock-nine.vercel.app/">Stock</a></div>
        <div class="nav-item"><a href="https://staff-scheduler.onrender.com/">Staff Scheduler</a></div>
        <div class="nav-item"><a href="https://loren-6q.github.io/Full-Moon-Week-Schedule/">FMW</a></div>
    `;

    // ADMIN ONLY SECTION - Hidden unless ?admin=true
    if (isAdmin) {
        navHTML += `
        <div class="nav-item">
          <span class="drop-btn" style="color:gold; font-weight:bold;">Admin Tools ▾</span>
          <div class="dropdown-content">
            <a href="https://loren-6q.github.io/WETSalaries/?admin=true">Salaries</a>
            <a href="https://loren-6q.github.io/WETParser/?admin=true">Parser</a>
            <a href="#">Accounting (Soon)</a>
            <a href="#">POS (Soon)</a>
          </div>
        </div>
        `;
    }

    navHTML += `</div></nav>`;

    document.head.insertAdjacentHTML('beforeend', navStyle);
    document.body.insertAdjacentHTML('afterbegin', navHTML);
    
    // Adjust body padding to make room for the bar
    document.body.style.paddingTop = "50px";

    const toggle = document.getElementById('nav-toggle');
    const links = document.getElementById('nav-links');
    if(toggle) {
        toggle.addEventListener('click', () => {
            links.classList.toggle('active');
        });
    }
});
