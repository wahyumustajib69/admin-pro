
// NAVIGATION

const pages = { dashboard: 'Dashboard', analitik: 'Analitik', other: 'Halaman Lain' };
function navigate(pageId, el) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById('page-' + pageId).classList.add('active');
    document.querySelectorAll('.nav-link-sb').forEach(l => l.classList.remove('active'));
    if (el) el.classList.add('active');
    document.getElementById('pageTitle').textContent = pages[pageId] || pageId;
    if (pageId === 'analitik' && !window._analyticsBuilt) { buildAnalytics(); window._analyticsBuilt = true; }
    window.scrollTo(0, 0);
    if (window.innerWidth <= 992) closeMobile();
}


// SIDEBAR

function toggleSidebar() {
    const sb = document.getElementById('sidebar');
    if (window.innerWidth <= 992) {
    sb.classList.toggle('mobile-open');
    document.getElementById('overlay').style.display = sb.classList.contains('mobile-open') ? 'block' : 'none';
    } else {
    document.body.classList.toggle('sb-collapsed');
    sb.classList.toggle('collapsed');
    }
}
function closeMobile() {
    document.getElementById('sidebar').classList.remove('mobile-open');
    document.getElementById('overlay').style.display = 'none';
}

Chart.defaults.font.family = "'Segoe UI', system-ui, sans-serif";
Chart.defaults.color = '#888';
const gridC = 'rgba(0,0,0,0.05)';


// DASHBOARD CHARTS

(function buildDashboard() {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun'];
    const rev = [142, 168, 125, 210, 198, 284];
    const ord = [780, 920, 680, 1200, 1100, 1842];
    const lCtx = document.getElementById('lineChart').getContext('2d');
    const rG = lCtx.createLinearGradient(0, 0, 0, 240);
    rG.addColorStop(0, 'rgba(108,99,255,0.22)'); rG.addColorStop(1, 'rgba(108,99,255,0)');
    const oG = lCtx.createLinearGradient(0, 0, 0, 240);
    oG.addColorStop(0, 'rgba(245,87,108,0.18)'); oG.addColorStop(1, 'rgba(245,87,108,0)');
    new Chart(lCtx, {
    type: 'line', data: {
        labels: months, datasets: [
        { label: 'Pendapatan (jt)', data: rev, borderColor: '#6C63FF', backgroundColor: rG, borderWidth: 2.5, pointBackgroundColor: '#6C63FF', pointRadius: 4, pointHoverRadius: 7, tension: 0.4, fill: true, yAxisID: 'y' },
        { label: 'Pesanan', data: ord, borderColor: '#f5576c', backgroundColor: oG, borderWidth: 2.5, pointBackgroundColor: '#f5576c', pointRadius: 4, pointHoverRadius: 7, tension: 0.4, fill: true, yAxisID: 'y1' }
        ]
    }, options: { responsive: true, interaction: { mode: 'index', intersect: false }, plugins: { legend: { display: false }, tooltip: { borderRadius: 10, padding: 12 } }, scales: { y: { grid: { color: gridC }, ticks: { callback: v => 'Rp ' + v + 'jt' } }, y1: { position: 'right', grid: { display: false }, ticks: { callback: v => v + ' pcs' } } } }
    });

    const pieLabels = ['Elektronik', 'Fashion', 'Makanan', 'Kesehatan', 'Lainnya'];
    const pieVals = [35, 28, 18, 12, 7];
    const pieColors = ['#6C63FF', '#f5576c', '#4facfe', '#43e97b', '#fa8231'];
    new Chart(document.getElementById('pieChart'), { type: 'doughnut', data: { labels: pieLabels, datasets: [{ data: pieVals, backgroundColor: pieColors, borderWidth: 3, borderColor: '#fff', hoverBorderWidth: 0 }] }, options: { responsive: true, cutout: '68%', plugins: { legend: { display: false }, tooltip: { borderRadius: 10, padding: 10 } } } });
    const pL = document.getElementById('pieLegend');
    pieLabels.forEach((l, i) => { pL.innerHTML += `<div style="display:flex;align-items:center;justify-content:space-between;font-size:13px;"><div style="display:flex;align-items:center;gap:8px;"><span style="width:10px;height:10px;border-radius:3px;background:${pieColors[i]};display:inline-block;"></span><span style="color:#555">${l}</span></div><strong>${pieVals[i]}%</strong></div>`; });

    const bCtx = document.getElementById('barChart').getContext('2d');
    const bG = bCtx.createLinearGradient(0, 0, 0, 200); bG.addColorStop(0, '#6C63FF'); bG.addColorStop(1, '#a78bfa');
    new Chart(bCtx, { type: 'bar', data: { labels: Array.from({ length: 15 }, (_, i) => i + 1), datasets: [{ label: 'Transaksi', data: [42, 58, 51, 67, 73, 44, 89, 95, 81, 74, 63, 77, 88, 92, 84], backgroundColor: bG, borderRadius: 6, borderSkipped: false }] }, options: { responsive: true, plugins: { legend: { display: false }, tooltip: { borderRadius: 10 } }, scales: { x: { grid: { display: false } }, y: { grid: { color: gridC } } } } });

    new Chart(document.getElementById('hbarChart'), { type: 'bar', data: { labels: ['Laptop Ultra X', 'Sepatu Nike Air', 'Tas Gucci Nano', 'Kopi Arabika 1kg', 'Parfum Chanel'], datasets: [{ label: 'Unit', data: [543, 487, 412, 389, 301], backgroundColor: ['#6C63FF', '#f5576c', '#4facfe', '#43e97b', '#fa8231'], borderRadius: 6, borderSkipped: false }] }, options: { indexAxis: 'y', responsive: true, plugins: { legend: { display: false }, tooltip: { borderRadius: 10 } }, scales: { x: { grid: { color: gridC } }, y: { grid: { display: false }, ticks: { font: { size: 12 } } } } } });

    // DataTable
    const statuses = [{ label: 'Selesai', cls: 'status-success' }, { label: 'Diproses', cls: 'status-info' }, { label: 'Dikirim', cls: 'status-warning' }, { label: 'Dibatalkan', cls: 'status-danger' }];
    const prods = ['Laptop Ultra X', 'Sepatu Nike Air', 'Tas Gucci Nano', 'Kopi Arabika 1kg', 'Parfum Chanel No.5', 'Keyboard Mech Pro', 'Monitor 4K UHD', 'Headphone Sony XM5'];
    const custs = ['Budi Santoso', 'Sari Dewi', 'Eko Prasetyo', 'Lina Wati', 'Ahmad Fauzi', 'Rina Kusuma', 'Hendra Gunawan', 'Fitri Ayu', 'Yusuf Malik', 'Dian Pertiwi'];
    const tbody = document.getElementById('ordersBody');
    for (let i = 1; i <= 25; i++) {
    const st = statuses[i % 4]; const price = (Math.floor(Math.random() * 9000) + 500) * 1000;
    const d = `${(i % 15) + 1} Jun 2026`; const p = prods[i % prods.length]; const c = custs[i % custs.length];
    tbody.innerHTML += `<tr><td><code style="background:#f5f5ff;color:#6C63FF;border-radius:5px;padding:2px 7px;font-size:12px;">#ORD-${1000 + i}</code></td><td><div style="display:flex;align-items:center;gap:8px;"><div style="width:30px;height:30px;border-radius:50%;background:linear-gradient(135deg,#6C63FF,#a78bfa);color:#fff;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;flex-shrink:0;">${c.substring(0, 2).toUpperCase()}</div><span>${c}</span></div></td><td>${p}</td><td style="color:#888">${d}</td><td><strong>Rp ${price.toLocaleString('id-ID')}</strong></td><td><span class="status-badge ${st.cls}">${st.label}</span></td><td><div style="display:flex;gap:4px;"><button style="border:none;background:#f5f5ff;color:#6C63FF;border-radius:6px;width:30px;height:30px;display:flex;align-items:center;justify-content:center;cursor:pointer;"><i class="bi bi-eye-fill"></i></button><button style="border:none;background:#fff5f5;color:#f5576c;border-radius:6px;width:30px;height:30px;display:flex;align-items:center;justify-content:center;cursor:pointer;"><i class="bi bi-trash-fill"></i></button></div></td></tr>`;
    }
    $('#ordersTable').DataTable({ language: { search: "Cari:", lengthMenu: "Tampilkan _MENU_ baris", info: "_START_–_END_ dari _TOTAL_ data", paginate: { previous: '‹', next: '›' } }, pageLength: 7, order: [[0, 'desc']] });

    // Activity
    const acts = [
    { icon: 'bi-person-plus-fill', bg: '#e8e8ff', color: '#6C63FF', text: '<strong>Pengguna baru</strong> Sari Dewi mendaftar', time: '2 mnt lalu' },
    { icon: 'bi-bag-check-fill', bg: '#fff1f5', color: '#f5576c', text: 'Pesanan <strong>#ORD-1025</strong> selesai', time: '18 mnt lalu' },
    { icon: 'bi-cash-stack', bg: '#e8fff5', color: '#00c853', text: 'Pembayaran masuk <strong>Rp 2.500.000</strong>', time: '34 mnt lalu' },
    { icon: 'bi-exclamation-triangle-fill', bg: '#fff8e8', color: '#fa8231', text: 'Stok <strong>Laptop Ultra X</strong> hampir habis', time: '1 jam lalu' },
    { icon: 'bi-star-fill', bg: '#fffbe8', color: '#f7b731', text: 'Ulasan bintang 5 dari Budi Santoso', time: '2 jam lalu' },
    { icon: 'bi-truck', bg: '#e8f4ff', color: '#1890ff', text: 'Pengiriman <strong>#ORD-1019</strong> tiba', time: '3 jam lalu' },
    ];
    const feed = document.getElementById('activityFeed');
    acts.forEach(a => { feed.innerHTML += `<div class="activity-item"><div class="activity-icon" style="background:${a.bg};color:${a.color}"><i class="bi ${a.icon}"></i></div><div><div class="activity-text">${a.text}</div><div class="activity-time"><i class="bi bi-clock me-1"></i>${a.time}</div></div></div>`; });
})();



// ANALYTICS PAGE

function buildAnalytics() {

    // Revenue vs Target
    const rCtx = document.getElementById('aRevChart').getContext('2d');
    const rLabels = ['1 Mei', '5 Mei', '10 Mei', '15 Mei', '20 Mei', '25 Mei', '30 Mei', '5 Jun', '10 Jun', '16 Jun'];
    const rActual = [38, 45, 42, 61, 58, 74, 69, 82, 79, 94];
    const rTarget = [40, 48, 50, 58, 62, 70, 72, 78, 82, 88];
    const rPrevYear = [30, 35, 33, 45, 42, 55, 52, 60, 58, 68];
    const rActG = rCtx.createLinearGradient(0, 0, 0, 220); rActG.addColorStop(0, 'rgba(108,99,255,0.28)'); rActG.addColorStop(1, 'rgba(108,99,255,0)');
    const rPrevG = rCtx.createLinearGradient(0, 0, 0, 220); rPrevG.addColorStop(0, 'rgba(245,87,108,0.15)'); rPrevG.addColorStop(1, 'rgba(245,87,108,0)');
    new Chart(rCtx, {
    type: 'line', data: {
        labels: rLabels, datasets: [
        { label: 'Aktual', data: rActual, borderColor: '#6C63FF', backgroundColor: rActG, borderWidth: 2.5, tension: 0.4, fill: true, pointRadius: 3, pointHoverRadius: 6 },
        { label: 'Target', data: rTarget, borderColor: '#6C63FF', borderDash: [6, 4], backgroundColor: 'transparent', borderWidth: 1.5, tension: 0.4, pointRadius: 0 },
        { label: 'Tahun Lalu', data: rPrevYear, borderColor: '#f5576c', backgroundColor: rPrevG, borderWidth: 2, tension: 0.4, fill: true, pointRadius: 3 }
        ]
    }, options: { responsive: true, interaction: { mode: 'index', intersect: false }, plugins: { legend: { display: false }, tooltip: { borderRadius: 10, padding: 12 } }, scales: { y: { grid: { color: gridC }, ticks: { callback: v => v + 'jt' } }, x: { grid: { color: gridC } } } }
    });

    // Source Pie
    const srcL = ['Website', 'Mobile App', 'Marketplace', 'Reseller', 'WhatsApp'];
    const srcV = [38, 27, 22, 9, 4];
    const srcC = ['#6C63FF', '#f5576c', '#4facfe', '#fa8231', '#43e97b'];
    new Chart(document.getElementById('aSrcChart'), { type: 'pie', data: { labels: srcL, datasets: [{ data: srcV, backgroundColor: srcC, borderWidth: 3, borderColor: '#fff' }] }, options: { responsive: true, plugins: { legend: { display: false }, tooltip: { borderRadius: 10 } } } });
    const sL = document.getElementById('srcLegend');
    srcL.forEach((l, i) => { sL.innerHTML += `<div style="display:flex;align-items:center;justify-content:space-between;font-size:12.5px;"><div style="display:flex;align-items:center;gap:7px;"><span style="width:10px;height:10px;border-radius:3px;background:${srcC[i]};display:inline-block;"></span>${l}</div><strong>${srcV[i]}%</strong></div>`; });

    // Traffic
    const tLabels = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];
    new Chart(document.getElementById('aTrafficChart'), {
    type: 'bar', data: {
        labels: tLabels, datasets: [
        { label: 'Sesi', data: [4200, 5100, 4800, 6300, 5900, 7200, 4100], backgroundColor: 'rgba(79,172,254,0.8)', borderRadius: 5, yAxisID: 'y' },
        { type: 'line', label: 'Halaman/sesi', data: [3.1, 3.4, 3.2, 3.8, 3.5, 4.1, 2.9], borderColor: '#43e97b', backgroundColor: 'transparent', borderWidth: 2.5, tension: 0.4, pointRadius: 4, yAxisID: 'y1' }
        ]
    }, options: { responsive: true, interaction: { mode: 'index', intersect: false }, plugins: { legend: { display: false }, tooltip: { borderRadius: 10 } }, scales: { y: { grid: { color: gridC }, ticks: { callback: v => v.toLocaleString() } }, y1: { position: 'right', grid: { display: false }, min: 2, max: 5 } } }
    });

    // Bubble
    new Chart(document.getElementById('aBubbleChart'), {
    type: 'bubble', data: {
        datasets: [
        { label: 'Elektronik', data: [{ x: 35, y: 450, r: 22 }], backgroundColor: 'rgba(108,99,255,0.65)' },
        { label: 'Fashion', data: [{ x: 28, y: 180, r: 16 }], backgroundColor: 'rgba(245,87,108,0.65)' },
        { label: 'Makanan', data: [{ x: 18, y: 80, r: 12 }], backgroundColor: 'rgba(79,172,254,0.65)' },
        { label: 'Kesehatan', data: [{ x: 12, y: 210, r: 10 }], backgroundColor: 'rgba(67,233,123,0.65)' },
        { label: 'Lainnya', data: [{ x: 7, y: 60, r: 7 }], backgroundColor: 'rgba(250,130,49,0.65)' }
        ]
    }, options: { responsive: true, plugins: { legend: { position: 'right', labels: { font: { size: 11 }, boxWidth: 10 } }, tooltip: { borderRadius: 10 } }, scales: { x: { title: { display: true, text: 'Unit Terjual (%)' }, grid: { color: gridC } }, y: { title: { display: true, text: 'Avg Harga (rb)' }, grid: { color: gridC } } } }
    });

    // Cohort
    const cohortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei'];
    new Chart(document.getElementById('aCohortChart'), {
    type: 'line', data: {
        labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8'], datasets: [
        { label: 'Jan Cohort', data: [100, 72, 61, 55, 48, 44, 41, 38], borderColor: '#6C63FF', backgroundColor: 'transparent', borderWidth: 2, tension: 0.4, pointRadius: 3 },
        { label: 'Feb Cohort', data: [100, 75, 65, 58, 51, 47, 43], borderColor: '#f5576c', backgroundColor: 'transparent', borderWidth: 2, tension: 0.4, pointRadius: 3 },
        { label: 'Mar Cohort', data: [100, 70, 59, 53, 46, 42], borderColor: '#4facfe', backgroundColor: 'transparent', borderWidth: 2, tension: 0.4, pointRadius: 3 },
        { label: 'Apr Cohort', data: [100, 78, 67, 60, 54], borderColor: '#43e97b', backgroundColor: 'transparent', borderWidth: 2, tension: 0.4, pointRadius: 3 },
        { label: 'Mei Cohort', data: [100, 80, 70, 63], borderColor: '#fa8231', backgroundColor: 'transparent', borderWidth: 2, tension: 0.4, pointRadius: 3 },
        ]
    }, options: { responsive: true, interaction: { mode: 'index', intersect: false }, plugins: { legend: { position: 'bottom', labels: { font: { size: 11 }, boxWidth: 10, padding: 10 } }, tooltip: { borderRadius: 10 } }, scales: { y: { grid: { color: gridC }, ticks: { callback: v => v + '%' } }, x: { grid: { color: gridC } } } }
    });

    // Funnel
    const funnelData = [
    { label: 'Kunjungan', val: 100000, pct: 100, color: '#6C63FF' },
    { label: 'Produk Dilihat', val: 62400, pct: 62, color: '#8b5cf6' },
    { label: 'Ke Keranjang', val: 18900, pct: 18.9, color: '#f093fb' },
    { label: 'Checkout', val: 8700, pct: 8.7, color: '#f5576c' },
    { label: 'Pembayaran', val: 5100, pct: 5.1, color: '#fa8231' },
    { label: 'Selesai', val: 3740, pct: 3.74, color: '#43e97b' },
    ];
    const fw = document.getElementById('funnelChart');
    funnelData.forEach(f => {
    fw.innerHTML += `<div class="funnel-row"><div class="funnel-label">${f.label}</div><div class="funnel-bar-wrap"><div class="funnel-bar" style="width:${f.pct}%;background:${f.color};">${f.pct >= 12 ? f.pct + '%' : ''}</div></div><div class="funnel-val">${f.val >= 1000 ? (f.val / 1000).toFixed(1) + 'K' : f.val}</div></div>`;
    });

    // Heatmap
    const days = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];
    const hmWrap = document.getElementById('heatmapWrap');
    const hmColors = ['#f0f0ff', '#d4d0ff', '#b0a8ff', '#8880f0', '#6C63FF', '#3d35cc'];
    function hmColor(v) { if (v < 5) return hmColors[0]; if (v < 15) return hmColors[1]; if (v < 30) return hmColors[2]; if (v < 50) return hmColors[3]; if (v < 70) return hmColors[4]; return hmColors[5]; }
    const hmData = days.map(d => Array.from({ length: 24 }, () => Math.floor(Math.random() * 90)));

    let hmHtml = '<div style="overflow-x:auto;"><div style="display:grid;grid-template-columns:36px repeat(24,1fr);gap:3px;min-width:500px;">';
    hmHtml += '<div></div>';
    for (let h = 0; h < 24; h++) { hmHtml += `<div style="text-align:center;font-size:9px;color:#bbb;padding-bottom:2px;">${h}</div>`; }
    days.forEach((d, di) => {
    hmHtml += `<div style="display:flex;align-items:center;font-size:10px;color:#888;padding-right:4px;">${d}</div>`;
    hmData[di].forEach(v => { hmHtml += `<div title="${v} transaksi" style="height:18px;border-radius:3px;background:${hmColor(v)};cursor:pointer;" onmouseenter="this.style.opacity=0.7" onmouseleave="this.style.opacity=1"></div>`; });
    });
    hmHtml += '</div></div>';
    hmWrap.innerHTML = hmHtml;

    // Radar
    new Chart(document.getElementById('aRadarChart'), {
    type: 'radar', data: {
        labels: ['Pendapatan', 'Konversi', 'Retensi', 'Kepuasan', 'Traffic', 'Pertumbuhan'],
        datasets: [
        { label: 'Juni 2026', data: [88, 72, 85, 91, 78, 82], borderColor: '#6C63FF', backgroundColor: 'rgba(108,99,255,0.15)', borderWidth: 2, pointBackgroundColor: '#6C63FF', pointRadius: 4 },
        { label: 'Rata-rata', data: [75, 70, 72, 80, 70, 70], borderColor: '#f5576c', backgroundColor: 'rgba(245,87,108,0.1)', borderWidth: 2, borderDash: [4, 4], pointRadius: 0 }
        ]
    }, options: { responsive: true, plugins: { legend: { position: 'bottom', labels: { font: { size: 11 }, boxWidth: 10, padding: 10 } }, tooltip: { borderRadius: 10 } }, scales: { r: { grid: { color: gridC }, pointLabels: { font: { size: 11 } }, ticks: { display: false } } } }
    });

    // Device Pie
    const devL = ['Mobile', 'Desktop', 'Tablet']; const devV = [62, 31, 7]; const devC = ['#6C63FF', '#4facfe', '#43e97b'];
    new Chart(document.getElementById('aDeviceChart'), { type: 'doughnut', data: { labels: devL, datasets: [{ data: devV, backgroundColor: devC, borderWidth: 3, borderColor: '#fff' }] }, options: { responsive: true, cutout: '65%', plugins: { legend: { display: false }, tooltip: { borderRadius: 10 } } } });
    const dL = document.getElementById('deviceLegend');
    devL.forEach((l, i) => { dL.innerHTML += `<div style="display:flex;align-items:center;justify-content:space-between;font-size:12.5px;"><div style="display:flex;align-items:center;gap:7px;"><span style="width:10px;height:10px;border-radius:3px;background:${devC[i]};display:inline-block;"></span>${l}</div><strong>${devV[i]}%</strong></div>`; });

    // Source donut
    const soL = ['Organik', 'Sosial Media', 'Direct', 'Iklan', 'Referral']; const soV = [41, 24, 18, 12, 5]; const soC = ['#6C63FF', '#f5576c', '#fa8231', '#4facfe', '#43e97b'];
    new Chart(document.getElementById('aSourceChart'), { type: 'doughnut', data: { labels: soL, datasets: [{ data: soV, backgroundColor: soC, borderWidth: 3, borderColor: '#fff' }] }, options: { responsive: true, cutout: '65%', plugins: { legend: { display: false }, tooltip: { borderRadius: 10 } } } });
    const ssL = document.getElementById('sourceLegend');
    soL.forEach((l, i) => { ssL.innerHTML += `<div style="display:flex;align-items:center;justify-content:space-between;font-size:12.5px;"><div style="display:flex;align-items:center;gap:7px;"><span style="width:10px;height:10px;border-radius:3px;background:${soC[i]};display:inline-block;"></span>${l}</div><strong>${soV[i]}%</strong></div>`; });

    // City bar
    new Chart(document.getElementById('aCityChart'), { type: 'bar', data: { labels: ['Jakarta', 'Surabaya', 'Bandung', 'Medan', 'Semarang', 'Yogyakarta', 'Makassar', 'Palembang'], datasets: [{ label: 'Transaksi', data: [3200, 1840, 1420, 1100, 890, 780, 620, 510], backgroundColor: '#6C63FF', borderRadius: 5, borderSkipped: false }] }, options: { indexAxis: 'y', responsive: true, plugins: { legend: { display: false }, tooltip: { borderRadius: 10 } }, scales: { x: { grid: { color: gridC } }, y: { grid: { display: false }, ticks: { font: { size: 11 } } } } } });

    // Analytics DataTable
    const aProd = [
    { n: 'Laptop Ultra X', cat: 'Elektronik', imp: 28400, clk: 2130, sold: 543, rev: 2180000000 },
    { n: 'Sepatu Nike Air', cat: 'Fashion', imp: 21000, clk: 1890, sold: 487, rev: 731000000 },
    { n: 'Tas Gucci Nano', cat: 'Fashion', imp: 14200, clk: 980, sold: 412, rev: 2884000000 },
    { n: 'Kopi Arabika 1kg', cat: 'Makanan', imp: 19800, clk: 2200, sold: 389, rev: 155600000 },
    { n: 'Parfum Chanel No.5', cat: 'Kesehatan', imp: 12100, clk: 740, sold: 301, rev: 1505000000 },
    { n: 'Keyboard Mech Pro', cat: 'Elektronik', imp: 9800, clk: 870, sold: 265, rev: 397500000 },
    { n: 'Monitor 4K UHD', cat: 'Elektronik', imp: 8400, clk: 610, sold: 198, rev: 1188000000 },
    { n: 'Headphone Sony XM5', cat: 'Elektronik', imp: 11200, clk: 1050, sold: 287, rev: 1148000000 },
    { n: 'Vitamin C 1000mg', cat: 'Kesehatan', imp: 16000, clk: 1920, sold: 842, rev: 210500000 },
    { n: 'Sepatu Adidas Ultraboost', cat: 'Fashion', imp: 13400, clk: 1210, sold: 318, rev: 954000000 },
    ];
    const ab = document.getElementById('analyticsBody');
    const trends = ['up', 'up', 'dn', 'up', 'dn', 'up', 'up', 'dn', 'up', 'up'];
    aProd.forEach((p, i) => {
    const ctr = ((p.clk / p.imp) * 100).toFixed(1);
    const conv = ((p.sold / p.clk) * 100).toFixed(1);
    const tr = trends[i];
    ab.innerHTML += `<tr>
    <td><strong style="font-size:13px;">${p.n}</strong></td>
    <td><span class="status-badge status-info">${p.cat}</span></td>
    <td>${p.imp.toLocaleString('id-ID')}</td>
    <td>${p.clk.toLocaleString('id-ID')}</td>
    <td><span class="metric-tag">${ctr}%</span></td>
    <td>${p.sold.toLocaleString('id-ID')}</td>
    <td><strong>Rp ${(p.rev / 1000000).toFixed(0)}jt</strong></td>
    <td><span class="metric-tag">${conv}%</span></td>
    <td style="color:${tr === 'up' ? '#00a854' : '#f5222d'};font-weight:600;"><i class="bi bi-arrow-${tr}-right"></i></td>
</tr>`;
    });
    $('#analyticsTable').DataTable({ language: { search: "Cari:", lengthMenu: "Tampilkan _MENU_ baris", info: "_START_–_END_ dari _TOTAL_ data", paginate: { previous: '‹', next: '›' } }, pageLength: 7, order: [[5, 'desc']] });

    // Stacked Bar
    const sMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun'];
    new Chart(document.getElementById('aStackedChart'), {
    type: 'bar', data: {
        labels: sMonths, datasets: [
        { label: 'Elektronik', data: [42, 51, 38, 65, 59, 78], backgroundColor: '#6C63FF', borderRadius: 0 },
        { label: 'Fashion', data: [28, 33, 25, 42, 38, 51], backgroundColor: '#f5576c', borderRadius: 0 },
        { label: 'Makanan', data: [18, 22, 16, 28, 24, 35], backgroundColor: '#4facfe', borderRadius: 0 },
        { label: 'Kesehatan', data: [12, 15, 11, 19, 17, 24], backgroundColor: '#43e97b', borderRadius: 0 },
        { label: 'Lainnya', data: [8, 10, 7, 12, 9, 14], backgroundColor: '#fa8231', borderRadius: 0 },
        ]
    }, options: { responsive: true, plugins: { legend: { position: 'bottom', labels: { font: { size: 11 }, boxWidth: 10, padding: 8 } }, tooltip: { borderRadius: 10 } }, scales: { x: { stacked: true, grid: { display: false } }, y: { stacked: true, grid: { color: gridC }, ticks: { callback: v => v + 'jt' } } } }
    });

    // Growth Rate
    const growthV = [null, 18.3, -25.6, 68.0, -5.7, 43.4];
    const growthColors = growthV.map(v => v === null ? '#ccc' : v >= 0 ? '#6C63FF' : '#f5576c');
    new Chart(document.getElementById('aGrowthChart'), { type: 'bar', data: { labels: sMonths, datasets: [{ label: 'Growth %', data: growthV, backgroundColor: growthColors, borderRadius: 6, borderSkipped: false }] }, options: { responsive: true, plugins: { legend: { display: false }, tooltip: { borderRadius: 10, callbacks: { label: ctx => ctx.parsed.y !== null ? ctx.parsed.y + '%' : 'N/A' } } }, scales: { x: { grid: { display: false } }, y: { grid: { color: gridC }, ticks: { callback: v => v + '%' } } } } });
}

function updateAnalytics() {
    // Filter change indicator (visual only for demo)
    const period = document.getElementById('periodFilter').value;
    console.log('Filter changed to:', period, 'days');
}