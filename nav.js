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
  .nav-item a, .drop-btn { color: white !important; text-decoration: none; font-size: 10.5px; font-weight: 600; padding: 0 7px; cursor: pointer; border: none; background: none; display: flex; align-items: center; height: 100%; text-transform: uppercase; transition: 0.2s; white-space: nowrap; }
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

    if (user === 'BOSS') {
        let items = `<a href="#" data-type="accounting" data-icon="🏦" data-desc="WET overall accounting." data-manual="Company ledger.">Accounting</a>` +
                    `<a href="${fix('https://loren-6q.github.io/BizAnalyzer/')}" data-type="accounting" data-icon="📈" data-desc="Hostel/Hotel Investment Analyzer." data-manual="Hostel/Hotel Investment Analyzer. Used to crunch numbers and see scenarios to see if a business is worth investing in.">Biz Analyzer</a>` +
                    `<a href="${fix('https://loren-6q.github.io/WETSalaries/')}" data-type="accounting" data-icon="💰" data-desc="Staff payroll and repayment tracking." data-manual="<h3>APP FOR STAFF PAYROLL</h3><h3>🗓Calendar Tab</h3><div><ul><li>Monthly chart of all salary paid</li><li>2nd chart of all advances and repayments.</li><li>Click 'Ex-Staff' to group/expand former employees.</li><li>Click department at the top to only display that department</li><li>Click year at the top right to move between years.</li></ul><h3>📕Log Tab</h3></div><div><ul><li>Raw data of every transaction (adding salary, advance, or repayment)</li><li>Click Batch Mode to group into batches that match bank transactions</li><li>Filters at the top for dates and departments/employees</li></ul><h3>💸Debt Center</h3></div><div><ul><li>Tracks all advances and repayments</li><li>Click a staff member to expand to see ALL transactions</li><li>Filter and sort at the top</li></ul><h3>📂Reports</h3></div><div><ul><li>1st chart - Salaries by department</li><li>2nd chart - All advances</li><li>3rd chart - All repayments</li><li>4th chart - Yearly salaries by staff. Click name to see montly breakdown</li><li>Click year in top right to switch years</li></ul><h3><span style='font-size: 18.72px;'>🧑‍💼Staff</span></h3></div><div><ul><li><span style='font-size: 18.72px;'>List of all staff, department, and salary</span></li><li><span style='font-size: 18.72px;'>Click any name to edit</span></li><li><span style='font-size: 18.72px;'>Blue check box moves from current to former staff</span></li><li><span style='font-size: 18.72px;'>Click Inactive visible to toggle if ex-staff is displayed or not</span></li><li><span style='font-size: 18.72px;'>Click Depts to edit departments</span></li><li><span style='font-size: 18.72px;'>Click Add Staff to create 'New Entry'</span></li></ul><h3><span style='font-size: 18.72px;'>➕Add Salary (Button)</span></h3></div><div><ul><li><span style='font-size: 18.72px;'>Pop-up to pay salaries</span></li><li><span style='font-size: 18.72px;'>Prefills all with current salary</span></li><li><span style='font-size: 18.72px;'>Check or uncheck staff as needed</span></li><li><span style='font-size: 18.72px;'>Adding repayment (REP) subtracts from salary but can be overridden</span></li><li><span style='font-size: 18.72px;'>Top row - adjust the pay date and pay period</span></li><li><span style='font-size: 18.72px;'>Bottom row - totals the salaries being paid</span></li><li><span style='font-size: 18.72px;'>OWED column shows outstanding advances</span></li><li><span style='font-size: 18.72px;'>⚠ icon appears for staff who have already received payment this pay period</span></li></ul></div>">Salaries</a>`;
        html += `<div class="nav-item"><span class="drop-btn">Acct ▾</span><div class="dropdown-content">${items}</div></div>`;
    }

    if (user === 'BOSS') {
        let items = `<a href="https://inbox.myallocator.com/en/availability/58137" target="_blank" data-type="admin" data-icon="🌐" data-desc="Channel manager syncing." data-manual="Manage availability.">MyAllocator</a>` +
                    `<a href="https://account.booking.com/sign-in" target="_blank" data-type="admin" data-icon="🛂" data-desc="Booking .com Extranet." data-manual="Booking.com login.">B.com Login</a>` +
                    `<a href="https://inbox.hostelworld.com/" target="_blank" data-type="admin" data-icon="🛂" data-desc="HW Extranet." data-manual="Hostelworld login.">HW Login</a>`;
        html += `<div class="nav-item"><span class="drop-btn">Admin ▾</span><div class="dropdown-content">${items}</div></div>`;
    }

    if (['BOSS', 'REC', 'OA'].includes(user)) {
        let items = `<a href="https://sg.loventis.net/Reception" target="_blank" data-type="booking" data-icon="🏩" data-desc="Reservation management (PMS)." data-manual="Check-in/out guests.">Loventis (PMS)</a>` +
                    `<a href="https://docs.google.com/spreadsheets/d/1UqivgGUjV0JAO2vB4QFjdw0c62pSsdlMsna-z4xE_SQ/edit?usp=sharing" target="_blank" data-type="booking" data-icon="💸" data-desc="Are Hostelworld bookings refundable?" data-manual="This spreadsheet checks all Hostelworld bookings and marks them 🟢<b>Green</b> for <b>Refundable</b> and 🔴<b>Red</b> for <b>Nonrefundable</b>. Loventis doesn't import this information so this sheet allows a quick check without needing access to the WET email account.">Refundability</a>` +
                    `<a href="${fix('https://loren-6q.github.io/WETParser/')}" data-type="booking" data-icon="📑" data-desc="Clean AirBnB, B.com and CC data." data-manual="Robust parsing app that can pull important information out of copy/paste from AirBnB, Booking.com, and MyAllocator credit card info.<div><br></div><div>CC PARSER</div><div><ul><li>Copy &amp; paste credit card data from MyAllocator</li><li>Strips junk and gives Name, Card #, Expiry date, and if available, CVV &amp; Billing Address/Zip Code</li></ul><div>BOOKING.COM PARSER</div></div><div><ul><li>Load a booking on Booking.com</li><li>Click 'show Phone Number' if needed</li><li>Copy the entire first box, from <b>'Check In'</b> to any <b>'Important information about this guest'</b></li><li>Paste into parse box and it will generate info broken down and a summary to paste into the booking notes</li><li>You can click any box to copy it</li></ul><div><div>AIRBNB PARSER</div><div><ul><li>Load a booking on AirBnB</li><li>Copy from the guest name to the end of Host Payout section</li><li>Paste into parse box and it will generate info broken down and a summary to paste into the booking notes</li><li>You can click any box to copy it</li></ul><div>AIRBNB QUOTE GENERATOR</div><div><ul><li>Click the 🗨 icon in the top right navigation to generate a full price quote for an AirBnB request</li><li>cut &amp; paste the same section as above from AirBnB</li><li>In the top row you can adjust the number of guests or nights in the top row</li><li>2nd row put the prices of the different room types (can use the Pricer tool)</li><li>The app will calculate the price for all the beds, as well as the price for blocking a dorm for private use</li><li>Private dorm feature not working for more than 8 guests currently</li><li>If the booking is less than 3 days, the tool adds text about the 5-day Full Moon Week</li></ul></div></div></div></div>">Parser</a>`;
        if (['BOSS', 'OA'].includes(user)) items += `<a href="${fix('https://loren-6q.github.io/WETReviews/')}" data-type="booking" data-icon="⭐" data-desc="Monitor and respond to guest reviews." data-manual="(In development) This will be an app to paste reviews and generate unique review responses using SEO keywords and emphasizing the things we want, while responding to complaints or problems.">WET Reviews</a>`;
        html += `<div class="nav-item"><span class="drop-btn">Booking ▾</span><div class="dropdown-content">${items}</div></div>`;
    }

    if (['BOSS', 'REC', 'OA', 'BAR'].includes(user)) {
        let items = "";
        if (['BOSS', 'REC', 'OA'].includes(user)) items += `<a href="${fix('https://loren-6q.github.io/WETPricer/')}" data-type="quotes" data-icon="🏷️" data-desc="Quickly quote and compare prices." data-manual="Walk-in pricing.">WET Pricer</a>`;
        items += `<a href="https://inbox.myallocator.com/booknow/-sxO1cCV5jLMwqZTXY629A" target="_blank" data-type="quotes" data-icon="🏨" data-desc="Direct booking engine rates." data-manual="Direct portal.">WET Booking Engine</a>`;
        if (['BOSS', 'REC', 'OA'].includes(user)) {
            items += `<a href="https://www.booking.com/searchresults.en-gb.html?dest_id=900050772" target="_blank" data-type="quotes" data-icon="🔵" data-desc="Standard B.com search." data-manual="Competition check.">B.com Search</a>` +
                     `<a href="https://www.hostelworld.com/pwa/s?q=Koh%20Phangan" target="_blank" data-type="quotes" data-icon="🟠" data-desc="Hostelworld search." data-manual="Area check.">HW Search</a>` +
                     `<a href="https://www.booking.com/hotel/th/wet-pool-party-haad-rin.html" target="_blank" data-type="quotes" data-icon="🔗" data-desc="Direct link to WET on B.com." data-manual="Public listing.">WET on B.com</a>` +
                     `<a href="https://www.hostelworld.com/pwa/hosteldetails.php/WET-a-Pool-Party-Hostel-by-Wild-Wandering/Koh-Phangan/313418" target="_blank" data-type="quotes" data-icon="🔗" data-desc="Direct link to WET on HW." data-manual="Public listing.">WET on HW</a>`;
        }
        html += `<div class="nav-item"><span class="drop-btn">Quotes ▾</span><div class="dropdown-content">${items}</div></div>`;
    }

    if (['BOSS', 'REC', 'OA'].includes(user)) {
        let items = `<a href="${fix('https://loren-6q.github.io/WETvCal/')}" data-type="staffing" data-icon="🗓️" data-desc="Calendar for stay dates of temp workers." data-manual="Internal stays.">V Cal</a>` +
                    `<a href="${fix('https://staff-scheduler.onrender.com/')}" target="_blank" data-type="staffing" data-icon="📅" data-desc="Schedule part-time staff roster." data-manual="Weekly roster.">Scheduler</a>`;
        html += `<div class="nav-item"><span class="drop-btn">Staffing ▾</span><div class="dropdown-content">${items}</div></div>`;
    }

    if (['BOSS', 'BAR', 'REC', 'OA', 'HK'].includes(user)) {
        let items = "";
        if (['BOSS', 'REC', 'BAR'].includes(user)) items += `<a href="#" data-type="ops" data-icon="💳" data-desc="Point of sale for bar and shop." data-manual="Transaction tool.">POS</a>`;
        if (['BOSS', 'REC', 'BAR', 'OA'].includes(user)) items += `<a href="${fix('https://bar-stock-nine.vercel.app/')}" data-type="ops" data-icon="🍺" data-desc="Inventory and stock check." data-manual="Sunday counts.">Stock</a>`;
        if (['BOSS', 'OA'].includes(user)) items += `<a href="${fix('https://loren-6q.github.io/Full-Moon-Week-Schedule/')}" data-type="ops" data-icon="🌕" data-desc="FMW Instagram publishing tool." data-manual="Social scheduling.">FMW</a>`;
        if (['BOSS', 'REC', 'HK'].includes(user)) items += `<a href="${fix('https://loren-6q.github.io/WETDoors/')}" data-type="ops" data-icon="🔒" data-desc="Room access and security locks." data-manual="Room security.">Doors</a>`;
        html += `<div class="nav-item"><span class="drop-btn">Ops ▾</span><div class="dropdown-content">${items}</div></div>`;
    }
    html += `<div class="nav-item"><a href="${fix('https://loren-6q.github.io/WETNav/manual.html')}">Manual</a></div>`;

    const bar = document.createElement('nav');
    bar.id = 'global-nav';
    bar.innerHTML = `<a href="${fix('https://loren-6q.github.io/WETNav/')}" class="nav-logo"><img src="https://raw.githubusercontent.com/loren-6q/WETNav/main/logo-icon.png"><span>WET HUB</span></a><button id="nav-toggle">MENU</button><div id="nav-links">${html}</div>`;
    document.head.insertAdjacentHTML('beforeend', navStyle);
    document.body.prepend(bar); document.body.style.paddingTop = "40px";
    const menu = document.getElementById('nav-links');
    document.getElementById('nav-toggle').onclick = () => menu.classList.add('active');
    document.getElementById('nav-close').onclick = () => menu.classList.remove('active');
};
renderNav();
