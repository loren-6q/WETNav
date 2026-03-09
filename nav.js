const navStyle = `
<style>
  #global-nav { background: #111; color: white; font-family: sans-serif; position: fixed; top: 0; left: 0; width: 100%; z-index: 9999; display: flex; justify-content: space-between; align-items: center; padding: 10px 20px; box-sizing: border-box; border-bottom: 2px solid #333; }
  #nav-links { display: flex; gap: 20px; }
  #nav-links a { color: #ccc; text-decoration: none; font-size: 14px; transition: 0.3s; }
  #nav-links a:hover { color: gold; }
  #nav-toggle { display: none; background: none; border: 1px solid #444; color: white; padding: 5px 10px; cursor: pointer; border-radius: 4px; }
  
  @media (max-width: 768px) {
    #nav-links { display: none; flex-direction: column; position: absolute; top: 100%; left: 0; width: 100%; background: #111; padding: 20px; border-bottom: 2px solid #333; }
    #nav-links.active { display: flex; }
    #nav-toggle { display: block; }
  }
</style>
`;

const navHTML = `
<nav id="global-nav">
  <div style="font-weight: bold; color: gold; letter-spacing: 1px;">WET POOL PARTY</div>
  <button id="nav-toggle">MENU ☰</button>
  <div id="nav-links">
    <a href="https://www.wildandwandering.com/wet/bookwet">Home</a>
    <a href="https://www.booking.com/searchresults.en-gb.html?dest_id=900050772&dest_type=city&checkin=2026-12-31&checkout=2027-01-01&group_adults=1&no_rooms=1&group_children=0&order=price">฿ B.com</a>
    <a href="https://www.hostelworld.com/pwa/s?q=Koh%20Phangan,%20Thailand&country=Thailand&city=Koh%20Phangan&type=city&id=2017&from=2026-05-31&to=2026-06-01&guests=1&district=232&page=1">฿ HW</a>
    
    &nbsp; &nbsp;
    
    <a href="https://account.booking.com/sign-in?op_token=EgVvYXV0aCKyAQoUNlo3Mm9IT2QzNk5uN3prM3BpcmgSCWF1dGhvcml6ZRoaaHR0cHM6Ly9hZG1pbi5ib29raW5nLmNvbS8qOnsiYXV0aF9hdHRlbXB0X2lkIjoiYTc4N2I1ZTItYWI3OC00MDgxLTgzYWItYjFmNzkxOGQ4MzA5In0yK3pRQV9ka1RSVFFzMGJwN2Fpc3JvN2tPTGtRbGRSMndnQjExYTVEaDFucUk6BFMyNTZCBGNvZGUqEzC4x9vZoagoOgBCAFjS7amQzTM">B.com Login</a>
    <a href="https://inbox.hostelworld.com/">HW Login</a>

    &nbsp; &nbsp;

   <a href="https://inbox.myallocator.com/en/availability/58137">MyAll.</a>
   <a href="https://sg.loventis.net/Reception">Lov.</a>
    

    &nbsp; &nbsp;

    <a href="https://wetsalaries.netlify.app/">Salaries</a>
    <a href="https://wetparser.netlify.app/">Parser</a>
    <a href="https://bar-stock-nine.vercel.app/">Stock</a>
    <a href="https://staff-scheduler.onrender.com/">Vol Scheduler</a>
    <a href="https://loren-6q.github.io/Full-Moon-Week-Schedule/">FMW</a>
  </div>
</nav>
`;

window.addEventListener('load', () => {
    document.head.insertAdjacentHTML('beforeend', navStyle);
    document.body.insertAdjacentHTML('afterbegin', navHTML);
    document.body.style.paddingTop = "40px";

    const toggle = document.getElementById('nav-toggle');
    const links = document.getElementById('nav-links');
    
    toggle.addEventListener('click', () => {
        links.classList.toggle('active');
    });
});