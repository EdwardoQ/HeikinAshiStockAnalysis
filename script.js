let cachedStandardData = [];
let currentSymbolDisplay = "-"; 

// --- 0. TRANSLATION ENGINE & DICTIONARY (FULL MANUAL INCLUDED) ---
const i18nDict = {
    "en": {
        "login-title": "Secure Gateway",
        "login-desc": "Enter credentials to access your terminal workspace.",
        "lbl-username": "Username",
        "lbl-password": "Password",
        "btn-login": "Log In",
        "btn-register": "Register",
        "settings-title": "Indicator Settings",
        "settings-desc": "Toggle visibility of trend indicators on your stock cards & chart.",
        "toggle-ichi": "Ichimoku Cloud (Chart Only)",
        "btn-save-apply": "Save & Apply",
        "port-add-title": "Add to Portfolio",
        "lbl-ticker": "Ticker Symbol",
        "lbl-avg-price": "Average Price",
        "lbl-lots": "Total Lots (1 Lot = 100 Shares)",
        "btn-save-pos": "Save Position",
        "btn-understood": "Understood",
        "lbl-session": "Current Session: ",
        "btn-settings": "⚙️ Settings",
        "btn-logout": "Log Out",
        "tab-chart": "Chart",
        "tab-watch": "Watchlist",
        "tab-port": "Portfolio",
        "tab-screen": "HA Screener",
        "tab-manual": "📖 User Manual",
        "lbl-ticker-short": "Ticker: ",
        "lbl-style": "Style: ",
        "opt-normal-candle": "Normal Candlestick",
        "lbl-timeframe": "Timeframe: ",
        "opt-1d": "1 Day (5 Years)",
        "opt-1h": "1 Hour (2 Years)",
        "btn-load-chart": "Load Chart",
        "lbl-mtf-trend": "MTF Trend:",
        "desc-watch": "Monitor your favorite stocks. Click anywhere on a card to load its detailed chart.",
        "btn-add-list": "Add to List",
        "desc-port": "Track your bought stocks, monitor Profit/Loss, and watch the HA trend. (1 Lot = 100 Shares)",
        "btn-add-pos": "+ Add New Position",
        "desc-screen": "Scans Mega-Universe (900+ active liquid stocks) across multi-board identifiers.",
        "opt-scan-gold": "Scan: Golden Trend Profiler (>2 Runs, High Vol)",
        "opt-scan-rev": "Scan: Strong Bullish Reversal",
        "opt-scan-doji": "Scan: Bottom Indecision (Doji)",
        "btn-run-screen": "Run Screener",
        "lbl-ready": "Ready to scan.",
        "alert-missing": "Missing Info",
        "alert-missing-msg": "Please fill in both fields!",
        "alert-notfound": "Account Not Found",
        "alert-notfound-msg": "Account username does not exist.",
        "alert-invalid": "Invalid Login",
        "alert-invalid-msg": "Incorrect account password.",
        "alert-success": "Success",
        "alert-reg-msg": "Registration successful! Logging you in...",
        "alert-invalid-stock": "Invalid Stock",
        "alert-dup": "Duplicate",
        "alert-dup-msg": "is already in your watchlist.",

        // MANUAL SECTION TRANSLATIONS
        "man-1-title": "🕯️ What is Heikin Ashi?",
        "man-1-p1": "<b>Heikin Ashi</b> (Japanese for \"average bar\") is a charting technique that uses mathematical averages to smooth out price data, filtering out the daily \"noise\" and volatility of traditional candlestick charts. It is explicitly designed to make spotting and riding trends incredibly easy.",
        "man-1-li1": "<b>Traditional Candles</b> show the exact Open, High, Low, and Close of a given day. They can rapidly flip red and green, causing traders to panic sell early.",
        "man-1-li2": "<b>Heikin Ashi Candles</b> use the previous day's candle to calculate today's open, and an average of today's price action to calculate the close.",
        "man-1-li3": "<b>The Golden Rule:</b> A green candle with <i>no lower wick</i> means a strong uptrend. A red candle with <i>no upper wick</i> means a strong downtrend.",
        
        "man-2-title": "📚 Trading Glossary & Concepts",
        "man-2-h1": "The \"Golden Run\"",
        "man-2-p1": "A \"Golden Run\" is a proprietary term in this terminal referring to a massive, sustained uptrend consisting of <b>5 or more consecutive Green Heikin Ashi candles</b>. When a stock proves it is capable of producing Golden Runs, it means heavy institutional money frequently buys and holds it. The screener looks for stocks that have a history of Golden Runs and are currently starting a brand new reversal.",
        "man-2-h2": "The Doji Candle",
        "man-2-p2": "A Doji is a candlestick with a very small (or non-existent) body and long wicks on both the top and bottom. It looks like a plus sign (+). In the Heikin Ashi system, a Doji represents complete market indecision and trend exhaustion. <b>If a stock has been dropping for several days and suddenly prints a Doji, it is a high-probability warning that the bottom is in and a bullish reversal is imminent.</b>",
        
        "man-3-title": "🎯 Common Heikin Ashi Strategies",
        "man-3-li1": "<b>The Trend Rider:</b> Buy on the first solid Green candle that appears after a sequence of Red candles. Hold the stock entirely until the first Red candle appears, taking all emotion out of the trade.",
        "man-3-li2": "<b>The Pullback Entry:</b> Identify a stock in a long-term uptrend (Price > MA20). Wait for a healthy 2 to 3 day red pullback. Buy immediately when it prints a new Green reversal candle.",
        "man-3-li3": "<b>The Wickless Accelerator:</b> Only add to your portfolio position when a green candle prints with absolutely no lower wick. This confirms pure, uninterrupted buying pressure.",
        
        "man-4-title": "☁️ Ichimoku Cloud Strategies",
        "man-4-p1": "The Ichimoku Cloud (Kumo) is a macro-trend indicator that projects dynamic support and resistance levels into the future. When enabled in Settings, it draws a shaded zone directly on your chart.",
        "man-4-li1": "<b>Price ON TOP OF a Red Cloud:</b> The top boundary of the red cloud acts as a horizontal support floor. This confirms a bullish breakout retest. <b>Buy on a Green HA Bounce.</b>",
        "man-4-li2": "<b>Price UNDER a Green Cloud:</b> The stock is in a macro downtrend. The green cloud above acts as a heavy resistance ceiling. Any green HA candles here are likely fakeout \"dead cat bounces.\" <b>Avoid buying.</b>",
        "man-4-li3": "<b>Price INSIDE the Cloud:</b> The market is in a volatile, choppy consolidation phase. It is a \"no trade zone\" where trends go to die. Wait for a clear breakout.",
        
        "man-5-title": "⚙️ Global Settings & Toggles",
        "man-5-p1": "Click the <b>Settings</b> button in the top right corner to toggle various trend indicators on or off. Any indicator you enable will automatically appear as a calculated badge on every stock card in your Watchlist, Portfolio, and Screener.",
        
        "man-6-title": "📊 Indicator Definitions",
        "man-6-h1": "Moving Averages (MA5 & MA20)",
        "man-6-p1": "Tracks the average closing price over the last 5 days (short-term) and 20 days (medium-term).<br><span class=\"ha-badge up manual-badge-example\">ABOVE</span> Price is higher than the average, indicating an uptrend.<br><span class=\"ha-badge down manual-badge-example\">BELOW</span> Price is lower than the average, indicating a downtrend.",
        "man-6-h2": "ADX (Average Directional Index)",
        "man-6-p2": "Measures the <i>strength</i> of a trend, regardless of whether it is going up or down. A value below 20 means the stock is moving sideways (choppy). A value above 25 means the current trend is strong.<br><span class=\"ha-badge up manual-badge-example\">ADX: 35</span> High trend strength. Ideal for trend-following entries.",
        "man-6-h3": "MACD (Moving Average Convergence Divergence)",
        "man-6-p3": "Measures momentum by comparing fast and slow moving averages.<br><span class=\"ha-badge up manual-badge-example\">MACD: BULL</span> The MACD histogram is pointing upward, confirming buying momentum.<br><span class=\"ha-badge down manual-badge-example\">MACD: BEAR</span> The MACD histogram is pointing downward, indicating selling pressure.",
        "man-6-h4": "Supertrend",
        "man-6-p4": "A volatility-based trend barrier. It calculates the Average True Range (ATR) to determine if a trend is safely intact.<br><span class=\"ha-badge up manual-badge-example\">SUPERTREND: BULL</span> Price is safely above the Supertrend support barrier.<br><span class=\"ha-badge down manual-badge-example\">SUPERTREND: BEAR</span> Price is below the barrier (often means any green candle is just a fakeout).",
        "man-6-h5": "Parabolic SAR (PSAR)",
        "man-6-p5": "Stop and Reverse dots. PSAR identifies trend direction and potential reversal points.<br><span class=\"ha-badge up manual-badge-example\">PSAR: BULL</span> The PSAR dot is below the price candle, indicating upward acceleration.",
        
        "man-7-title": "📈 Heikin Ashi Card Statistics",
        "man-7-h1": "Historic Strategy Winrate",
        "man-7-p1": "The program backtests every stock's last 6 months of data. It mathematically simulates buying on the first Green HA candle after a Red trend, and selling on the first Red HA candle. <br><b>WINRATE %:</b> The percentage of those simulated trades that ended in profit.<br><b>Avg Win / Loss:</b> The exact average percentage gained on winning trades versus the percentage lost on losing trades.",
        "man-7-h2": "MTF Matrix (Multi-Timeframe)",
        "man-7-p2": "Displays the current Heikin Ashi candle color across three time horizons simultaneously: <br><b>W (Weekly), D (Daily), H (Hourly).</b> <br>A stock showing 🟢🟢🟢 means it is trending up on all macro and micro timeframes.",
        "man-7-h3": "5-Day HA Window",
        "man-7-p3": "A visual mini-chart showing the exact sequence of the last 5 daily Heikin Ashi candles (e.g., 🟥🟥🟥🟩🟩).",
        
        "man-8-title": "🔍 Screener Strategies",
        "man-8-p1": "The Screener engine scans your master list of 900+ stocks to find specific Heikin Ashi structural setups. It always sorts results by highest Historic Winrate first, using Trading Volume as a tie-breaker.",
        "man-8-li1": "<b>Strong Bullish Reversal:</b> Finds stocks that had a strict sequence of 2+ Red days, but today flipped to a solid Green HA candle.",
        "man-8-li2": "<b>Bottom Indecision (Doji):</b> Finds stocks that dropped for 2+ days and today printed a Doji, signaling the sellers are exhausted.",
        "man-8-li3": "<b>Golden Trend Profiler:</b> The strictest scan. Finds stocks that have had multiple \"Golden Runs\" in their recent history, and are currently triggering a brand new reversal today."
    },
    "id": {
        "login-title": "Gerbang Aman",
        "login-desc": "Masukkan kredensial untuk mengakses ruang kerja terminal Anda.",
        "lbl-username": "Nama Pengguna",
        "lbl-password": "Kata Sandi",
        "btn-login": "Masuk",
        "btn-register": "Daftar",
        "settings-title": "Pengaturan Indikator",
        "settings-desc": "Aktifkan visibilitas indikator tren pada kartu saham & grafik Anda.",
        "toggle-ichi": "Ichimoku Cloud (Hanya Grafik)",
        "btn-save-apply": "Simpan & Terapkan",
        "port-add-title": "Tambah ke Portofolio",
        "lbl-ticker": "Simbol Saham",
        "lbl-avg-price": "Harga Rata-Rata",
        "lbl-lots": "Total Lot (1 Lot = 100 Lembar)",
        "btn-save-pos": "Simpan Posisi",
        "btn-understood": "Mengerti",
        "lbl-session": "Sesi Saat Ini: ",
        "btn-settings": "⚙️ Pengaturan",
        "btn-logout": "Keluar",
        "tab-chart": "Grafik",
        "tab-watch": "Pantauan",
        "tab-port": "Portofolio",
        "tab-screen": "Penyaring HA",
        "tab-manual": "📖 Panduan",
        "lbl-ticker-short": "Saham: ",
        "lbl-style": "Gaya: ",
        "opt-normal-candle": "Kandelar Normal",
        "lbl-timeframe": "Kerangka Waktu: ",
        "opt-1d": "1 Hari (5 Tahun)",
        "opt-1h": "1 Jam (2 Tahun)",
        "btn-load-chart": "Muat Grafik",
        "lbl-mtf-trend": "Tren MTF:",
        "desc-watch": "Pantau saham favorit Anda. Klik kartu untuk memuat grafik detailnya.",
        "btn-add-list": "Tambah ke Daftar",
        "desc-port": "Lacak saham yang dibeli, pantau Laba/Rugi, dan tren HA. (1 Lot = 100 Lembar)",
        "btn-add-pos": "+ Tambah Posisi Baru",
        "desc-screen": "Memindai Mega-Universe (900+ saham likuid) di seluruh bursa.",
        "opt-scan-gold": "Pindai: Golden Trend Profiler (>2 Run, Vol Tinggi)",
        "opt-scan-rev": "Pindai: Reversal Bullish Kuat",
        "opt-scan-doji": "Pindai: Keraguan Dasar (Doji)",
        "btn-run-screen": "Jalankan Penyaring",
        "lbl-ready": "Siap memindai.",
        "alert-missing": "Info Kurang",
        "alert-missing-msg": "Harap isi kedua kolom!",
        "alert-notfound": "Akun Tidak Ditemukan",
        "alert-notfound-msg": "Nama pengguna tidak ada.",
        "alert-invalid": "Login Tidak Valid",
        "alert-invalid-msg": "Kata sandi akun salah.",
        "alert-success": "Berhasil",
        "alert-reg-msg": "Pendaftaran berhasil! Mengarahkan masuk...",
        "alert-invalid-stock": "Saham Tidak Valid",
        "alert-dup": "Duplikat",
        "alert-dup-msg": "sudah ada di daftar pantauan Anda.",

        // MANUAL SECTION TRANSLATIONS (INDONESIAN)
        "man-1-title": "🕯️ Apa itu Heikin Ashi?",
        "man-1-p1": "<b>Heikin Ashi</b> (bahasa Jepang untuk \"bar rata-rata\") adalah teknik grafik yang menggunakan rata-rata matematis untuk menghaluskan data harga, menyaring \"kebisingan\" harian dan volatilitas grafik kandelar tradisional. Ini dirancang khusus agar melihat dan mengikuti tren menjadi sangat mudah.",
        "man-1-li1": "<b>Kandelar Tradisional</b> menunjukkan nilai pasti dari Pembukaan, Tertinggi, Terendah, dan Penutupan hari itu. Warna merah dan hijau bisa berubah dengan cepat, membuat trader panik menjual lebih awal.",
        "man-1-li2": "<b>Kandelar Heikin Ashi</b> menggunakan kandelar hari sebelumnya untuk menghitung pembukaan hari ini, dan rata-rata pergerakan harga hari ini untuk menghitung penutupan.",
        "man-1-li3": "<b>Aturan Emas:</b> Kandelar hijau <i>tanpa sumbu bawah</i> berarti tren naik yang kuat. Kandelar merah <i>tanpa sumbu atas</i> berarti tren turun yang kuat.",
        
        "man-2-title": "📚 Glosarium & Konsep Trading",
        "man-2-h1": "The \"Golden Run\"",
        "man-2-p1": "\"Golden Run\" adalah istilah eksklusif di terminal ini yang merujuk pada tren naik masif dan berkelanjutan yang terdiri dari <b>5 atau lebih kandelar Heikin Ashi Hijau berturut-turut</b>. Ketika suatu saham mampu menghasilkan Golden Run, itu berarti uang institusional sering membeli dan menahannya. Penyaring mencari saham yang memiliki sejarah Golden Run dan saat ini sedang memulai pembalikan (reversal) baru.",
        "man-2-h2": "Kandelar Doji",
        "man-2-p2": "Doji adalah kandelar dengan tubuh yang sangat kecil (atau tidak ada sama sekali) dan sumbu panjang di atas dan di bawah. Terlihat seperti tanda tambah (+). Dalam sistem Heikin Ashi, Doji mewakili keraguan pasar yang total dan kelelahan tren. <b>Jika sebuah saham turun selama beberapa hari dan tiba-tiba mencetak Doji, ini adalah peringatan probabilitas tinggi bahwa dasar (bottom) telah terbentuk dan pembalikan bullish akan segera terjadi.</b>",
        
        "man-3-title": "🎯 Strategi Heikin Ashi Umum",
        "man-3-li1": "<b>The Trend Rider:</b> Beli pada kandelar Hijau solid pertama yang muncul setelah serangkaian kandelar Merah. Tahan saham sepenuhnya sampai kandelar Merah pertama muncul, lepaskan semua emosi dari perdagangan.",
        "man-3-li2": "<b>The Pullback Entry:</b> Identifikasi saham yang berada dalam tren naik jangka panjang (Harga > MA20). Tunggu pullback (penurunan) sehat berwarna merah selama 2 hingga 3 hari. Beli segera setelah kandelar reversal Hijau baru terbentuk.",
        "man-3-li3": "<b>The Wickless Accelerator:</b> Hanya tambah posisi portofolio Anda ketika kandelar hijau tercetak tanpa sumbu bawah sama sekali. Ini mengkonfirmasi tekanan beli yang murni dan tanpa henti.",
        
        "man-4-title": "☁️ Strategi Ichimoku Cloud",
        "man-4-p1": "Ichimoku Cloud (Kumo) adalah indikator tren makro yang memproyeksikan level dukungan dan resistensi dinamis ke masa depan. Saat diaktifkan di Pengaturan, ia menggambar zona berbayang langsung pada grafik Anda.",
        "man-4-li1": "<b>Harga DI ATAS Awan Merah:</b> Batas atas awan merah bertindak sebagai lantai dukungan horizontal. Ini mengkonfirmasi pengujian ulang (retest) penembusan bullish. <b>Beli saat ada Pantulan Hijau HA.</b>",
        "man-4-li2": "<b>Harga DI BAWAH Awan Hijau:</b> Saham berada dalam tren turun makro. Awan hijau di atas bertindak sebagai langit-langit resistensi yang berat. Setiap kandelar HA hijau di sini kemungkinan adalah tipuan (fakeout). <b>Hindari membeli.</b>",
        "man-4-li3": "<b>Harga DI DALAM Awan:</b> Pasar berada dalam fase konsolidasi yang tidak menentu (choppy). Ini adalah \"zona larangan berdagang\" tempat tren mati. Tunggu penembusan yang jelas.",
        
        "man-5-title": "⚙️ Pengaturan Global & Toggle",
        "man-5-p1": "Klik tombol <b>Pengaturan</b> di sudut kanan atas untuk mengaktifkan atau menonaktifkan berbagai indikator tren. Setiap indikator yang Anda aktifkan akan secara otomatis muncul sebagai lencana yang dihitung pada setiap kartu saham di Pantauan, Portofolio, dan Penyaring Anda.",
        
        "man-6-title": "📊 Definisi Indikator",
        "man-6-h1": "Rata-rata Bergerak (MA5 & MA20)",
        "man-6-p1": "Melacak harga penutupan rata-rata selama 5 hari terakhir (jangka pendek) dan 20 hari (jangka menengah).<br><span class=\"ha-badge up manual-badge-example\">ABOVE (DI ATAS)</span> Harga lebih tinggi dari rata-rata, menunjukkan tren naik.<br><span class=\"ha-badge down manual-badge-example\">BELOW (DI BAWAH)</span> Harga lebih rendah dari rata-rata, menunjukkan tren turun.",
        "man-6-h2": "ADX (Indeks Arah Rata-rata)",
        "man-6-p2": "Mengukur <i>kekuatan</i> tren, terlepas dari apakah ia naik atau turun. Nilai di bawah 20 berarti pergerakan saham menyamping (choppy). Nilai di atas 25 berarti tren saat ini kuat.<br><span class=\"ha-badge up manual-badge-example\">ADX: 35</span> Kekuatan tren tinggi. Ideal untuk masuk dengan strategi trend-following.",
        "man-6-h3": "MACD",
        "man-6-p3": "Mengukur momentum dengan membandingkan rata-rata bergerak cepat dan lambat.<br><span class=\"ha-badge up manual-badge-example\">MACD: BULL</span> Histogram MACD menunjuk ke atas, mengkonfirmasi momentum pembelian.<br><span class=\"ha-badge down manual-badge-example\">MACD: BEAR</span> Histogram MACD menunjuk ke bawah, menunjukkan tekanan jual.",
        "man-6-h4": "Supertrend",
        "man-6-p4": "Penghalang tren berbasis volatilitas. Indikator ini menghitung Average True Range (ATR) untuk menentukan apakah tren masih aman secara utuh.<br><span class=\"ha-badge up manual-badge-example\">SUPERTREND: BULL</span> Harga berada aman di atas batas dukungan Supertrend.<br><span class=\"ha-badge down manual-badge-example\">SUPERTREND: BEAR</span> Harga berada di bawah batas pelindung (sering kali berarti kandelar hijau apa pun hanyalah tipuan).",
        "man-6-h5": "Parabolic SAR (PSAR)",
        "man-6-p5": "Titik Berhenti dan Berbalik (Stop and Reverse). PSAR mengidentifikasi arah tren dan titik pembalikan potensial.<br><span class=\"ha-badge up manual-badge-example\">PSAR: BULL</span> Titik PSAR berada di bawah kandelar harga, menunjukkan akselerasi ke atas.",
        
        "man-7-title": "📈 Statistik Kartu Heikin Ashi",
        "man-7-h1": "Winrate Strategi Historis",
        "man-7-p1": "Program menguji mundur (backtest) 6 bulan data terakhir setiap saham. Ini mensimulasikan pembelian secara matematis pada kandelar HA Hijau pertama setelah tren Merah, dan menjual pada kandelar HA Merah pertama. <br><b>WINRATE %:</b> Persentase dari perdagangan simulasi yang berakhir dengan keuntungan.<br><b>Rata-rata Menang / Kalah (Avg Win/Loss):</b> Persentase pasti rata-rata yang diperoleh dari perdagangan menang dibandingkan dengan persentase yang hilang dari perdagangan kalah.",
        "man-7-h2": "Matriks MTF (Multi-Timeframe)",
        "man-7-p2": "Menampilkan warna kandelar Heikin Ashi saat ini di tiga cakrawala waktu sekaligus: <br><b>W (Mingguan), D (Harian), H (Jam).</b> <br>Saham yang menunjukkan 🟢🟢🟢 berarti sedang dalam tren naik di semua kerangka waktu makro dan mikro.",
        "man-7-h3": "Jendela HA 5-Hari",
        "man-7-p3": "Sebuah mini-chart visual yang menunjukkan urutan pasti dari 5 kandelar Heikin Ashi harian terakhir (mis., 🟥🟥🟥🟩🟩).",
        
        "man-8-title": "🔍 Strategi Penyaring",
        "man-8-p1": "Mesin Penyaring memindai daftar utama 900+ saham Anda untuk menemukan pola struktur Heikin Ashi tertentu. Selalu mengurutkan hasil berdasarkan Winrate Historis tertinggi terlebih dahulu, dengan Volume Perdagangan sebagai pemecah seri.",
        "man-8-li1": "<b>Reversal Bullish Kuat (Strong Bullish Reversal):</b> Mencari saham yang memiliki urutan ketat 2+ hari Merah, tetapi hari ini berbalik membentuk kandelar HA Hijau pekat.",
        "man-8-li2": "<b>Keraguan Dasar (Bottom Indecision/Doji):</b> Mencari saham yang turun selama 2+ hari dan hari ini mencetak Doji, menandakan bahwa penjual kelelahan.",
        "man-8-li3": "<b>Golden Trend Profiler:</b> Pemindaian paling ketat. Mencari saham yang memiliki banyak \"Golden Run\" dalam riwayat barunya, dan saat ini sedang memicu pembalikan baru (reversal) pada hari ini."
    }
};

let currentLang = localStorage.getItem('idx_lang') || 'en';

function applyLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('idx_lang', lang);
    document.getElementById('lang-switch').value = lang;
    
    // Scan the DOM and replace everything with a data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (i18nDict[lang][key]) {
            el.innerHTML = i18nDict[lang][key]; 
        }
    });
}

// Helper for Javascript Alerts
function t(key) { return i18nDict[currentLang][key] || key; }

document.getElementById('lang-switch').addEventListener('change', (e) => {
    applyLanguage(e.target.value);
});

// --- 0.1 GLOBAL IDX MASTER DATABASE ---
// IMPORTANT: Paste your full list of 900+ stocks here!
const IDX_TOP_STOCKS = [
    'AADI','AALI','ABBA','ABMM','ACES','ACST','ADCP','ADES','ADHI','ADMG','ADRO','AGAR','AGRO','AGRS','AHAP','AISA','AKKU','AKPI','AKRA','AKSI','ALDO','ALKA','ALMI','ALTO','AMAG','AMAN','AMAR','AMFG','AMIN','AMMN','AMOR','AMRT','ANDI','ANJT','ANTM','APEX','APII','APLI','APLN','ARGO','ARII','ARKA','ARKO','ARNA','ARTA','ARTI','ARTO','ASBI','ASGR','ASHA','ASII','ASJT','ASLC','ASMI','ASRI','ASSA','ATAP','ATIC','AUTO','AWAR','AWST','AXIO','AYLS','AZRX',
    'BACA','BAJA','BALI','BAPA','BAPI','BATA','BATP','BAYU','BBCA','BBEK','BBHI','BBKP','BBLD','BBMD','BBNI','BBRI','BBRM','BBSI','BBSS','BBTN','BBYB','BCAP','BCIC','BCIP','BDMN','BDTX','BEKS','BELI','BELL','BESS','BEST','BFIN','BGTG','BHAIT','BIKA','BIMA','BINA','BINI','BIPI','BIRD','BISI','BJBR','BJTM','BKDP','BKSL','BKSW','BLTA','BLTZ','BLUE','BMAS','BMRI','BMSR','BMTR','BNBA','BNBR','BNGA','BNII','BNLI','BOPP','BORL','BOSS','BOTS','BPFI','BPII','BPRS','BPSM','BRAM','BREN','BRIS','BRMS','BRNA','BRPT','BSDE','BSIM','BSSR','BSWD','BTEK','BTEL','BTPN','BTPS','BUDI','BUKA','BUKK','BULL','BUMI','BUVA','BVKM','BWPT',
    'CAMP','CANI','CAPC','CARS','CAS','CASH','CASS','CEKA','CENT','CFIN','CHIP','CINT','CITY','CLAY','CLEO','CMNP','CMNT','CMPP','CMRY','CNKO','CNMA','CNTX','COAL','COCO','CPIN','CPRI','CRAA','CRMI','CPRO','CSAP','CSIS','CSMI','CSRA','CTBN','CTRA','CTTH','CUAN','CYBR',
    'DADA','DART','DAYA','DCII','DEFI','DEWA','DFAM','DGIK','DGNS','DILD','DIVA','DKFT','DLTA','DMMX','DNET','DOID','DPNS','DPTC','DPUM','DRMA','DSFI','DSNG','DSSA','DUTI','DVLA','DYAN',
    'EAST','ECII','EDII','EKAD','ELJA','ELSA','ELTY','EMDE','EMMAP','EMTK','ENAK','ENRG','ENVY','EPMT','ERAA','ERTX','ESTA','ESTI','ETWA','EURO','EXCL',
    'FAST','FASW','FILM','FIRE','FISH','FIT','FITT','FLMC','FMII','FOOD','FORU','FORZ','FOSI','FPNI','FREN','FTT','FWPT',
    'GAMA','GDST','GDYR','GEMA','GEMS','GEST','GGRM','GHON','GIAA','GIFI','GIGS','GJTL','GLOB','GLVA','GMTD','GOLD','GOLL','GOOD','GOTO','GPRA','GRCE','GRPH','GSMF','GTBO','GTSI','GWSA','GZCO',
    'HADE','HAIS','HALO','HDFA','HDIT','HDTX','HEAL','HELI','HERO','HEXA','HITS','HKMU','HLMI','HMS','HMSP','HOKI','HOLI','HOME','HOMI','HOPE','HOTL','HRME','HRTA','HRUM','HUBT','HUMP','HWMA',
    'IATA','IBC','IBFN','IBOS','IBST','ICBP','ICON','IDEA','IDPR','IDRX','IFII','IFSH','IGAR','IIKP','IKAI','IKAN','IKBI','IMAS','IMJS','IMPC','INAF','INCF','INCI','INCO','INDF','INDO','INDR','INDS','INDX','INDY','INKP','INOV','INPC','INPP','INPS','INRU','INTA','INTC','INTD','INTP','INVS','IPAC','IPCC','IPCM','IPOL','IRRA','ISAP','ISAT','ISSP','ITIC','ITMA','ITMG',
    'JAKA','JAST','JAWA','JECC','JGLE','JIHD','JKON','JKSW','JMAS','JPFA','JRPT','JSKY','JSMR','JSPT','JTPE',
    'KAEF','KAPA','KARK','KARW','KAS','KAYU','KBAG','KBLI','KBLM','KBLV','KBRI','KDSI','KEEN','KEJU','KIAS','KICI','KIJA','KINO','KIOS','KJEN','KKGI','KLBF','KMDS','KMTR','KOBX','KOIN','KOKA','KOMET','KONI','KPAL','KPAS','KPIG','KRAH','KRAS','KREN','KRYA','KUAS',
    'LAMI','LAPD','LCIS','LEAD','LEMS','LIND','LION','LMAC','LMAS','LMPI','LMSH','LPCK','LPGI','LPIN','LPKR','LPLI','LPPF','LPPS','LRNA','LSIP','LTLS','LUCK','LUSA',
    'MABA','MACU','MAGP','MAHA','MAIN','MAMI','MAPA','MAPB','MAPI','MARI','MARK','MASA','MAXI','MAYA','MBAP','MBMA','MBSS','MBTO','MCAS','MCOR','MDIA','MDKA','MDLN','MDRN','MEDC','MEDS','MEGA','MERK','META','MFIN','MFMI','MGNA','MGNI','MICE','MIDI','MIKA','MINA','MIRA','MITI','MKNT','MKPI','MLBI','MLIA','MLPT','MMIX','MMSM','MNCN','MPI','MPMX','MPOW','MPPA','MQ','MRAT','MREI','MSIN','MSKY','MTDL','MTEL','MTFN','MTLA','MTPS','MTSM','MUKW','MUTU','MYOH','MYOR','MYRX','MYTX',
    'NANO','NASA','NASI','NATO','NAYZ','NCKL','NELY','NETA','NFCX','NICK','NICL','NIKL','NINE','NIPS','NIRO','NISP','NOBU','NPGF','NRCA','NRO','NUSA','NVOM','NZIA',
    'OASA','OBMD','OCBC','OKAS','OLIV','OMED','OMRE','OPMS',
    'PADI','PALM','PAMG','PANI','PANR','PANS','PASI','PCAR','PDDP','PDES','PEGE','PEHA','PGAS','PGEO','PGLI','PGUN','PICO','PIKA','PIS','PJAA','PKPK','PLAS','PLIN','PLUS','PMJS','PMMP','PNBN','PNBS','PNIN','PNLF','PNSE','POLA','POLI','POLU','POLY','POOL','PORT','POWR','PPGL','PPRE','PPRI','PPRO','PRAS','PRDA','PRIM','PSAB','PSDN','PSGO','PSKT','PTBA','PTIS','PTMP','PTPP','PTRO','PTSN','PTSP','PUDP','PURA','PURE','PWON','PYFA','PZZA',
    'RAAM','RACY','RADI','RAJA','RALS','RANC','RBMS','RDTX','REAL','RELI','RICY','RIGS','RIMO','RMBA','RODA','ROOT','ROTI','RSGK','RUIS','RUNS',
    'SAFE','SAME','SAMF','SAPX','SATU','SBAT','SBMA','SCCO','SCDN','SCMA','SCPI','SDMU','SDPC','SDRA','SEKA','SEMA','SGER','SGF','SFAN','SGJL','SGRO','SHID','SIAM','SIDO','SILO','SIMA','SIMP','SINI','SIPD','SKBM','SKLT','SKRN','SKYB','SLAC','SLIS','SMAR','SMAS','SMBR','SMCB','SMDM','SMDR','SMGR','SMKL','SMMA','SMMT','SMRA','SMRT','SMSM','SNLK','SOCI','SOE','SOFI','SONA','SOSS','SOTO','SPMA','SPTO','SQMI','SRAJ','SRIL','SRTG','SSIA','SSMS','SSTM','STAR','STTP','SUGI','SULI','SUPR','SURE','SWAT','SYNER',
    'TAFG','TAMA','TAMU','TAPG','TARA','TAXI','TBIG','TBMS','TCID','TCPI','TEBE','TECH','TELE','TERC','TFAS','TGKA','TIFA','TINS','TIRA','TIRT','TKIM','TLKM','TMAS','TMPO','TNCA','TOBA','TOKO','TOTL','TOTO','TOWR','TOYS','TPIA','TPMA','TRAM','TRIL','TRIM','TRIN','TRIS','TRJA','TRST','TRUK','TSPC','TUGU','TURI',
    'UANG','UCID','UCT','UDJG','UFIN','ULJE','ULTJ','UNI','UNIC','UNSP','UNTR','UNVR','UPA','USDP',
    'VAST','VCIR','VICO','VINS','VIPR','VIVA','VKTR','VOKS','VRNA','VTNY','VVIP',
    'WAHU','WAPO','WEGE','WEHA','WGSH','WIFI','WIGI','WIKA','WIIM','WINS','WMPP','WMS','WOOD','WOWS','WSKT','WTON',
    'YATA','YELO',
    'ZATA','ZBRA','ZINC','ZONE','ZYRX'
];

// --- APP SETTINGS & TOGGLES ---
let appSettings = JSON.parse(localStorage.getItem('idx_app_settings')) || {
    ma5: true, ma20: true, adx: false, macd: false, supertrend: false, psar: false, ichimoku: false
};

function loadSettingsUI() {
    document.getElementById('toggle-ma5').checked = appSettings.ma5;
    document.getElementById('toggle-ma20').checked = appSettings.ma20;
    document.getElementById('toggle-adx').checked = appSettings.adx;
    document.getElementById('toggle-macd').checked = appSettings.macd;
    document.getElementById('toggle-supertrend').checked = appSettings.supertrend;
    document.getElementById('toggle-psar').checked = appSettings.psar;
    document.getElementById('toggle-ichimoku').checked = appSettings.ichimoku;
}

document.getElementById('open-settings-btn').addEventListener('click', () => {
    loadSettingsUI();
    document.getElementById('settings-modal').style.display = 'flex';
});

document.getElementById('close-settings-modal').addEventListener('click', () => {
    document.getElementById('settings-modal').style.display = 'none';
});

document.getElementById('save-settings-btn').addEventListener('click', () => {
    appSettings.ma5 = document.getElementById('toggle-ma5').checked;
    appSettings.ma20 = document.getElementById('toggle-ma20').checked;
    appSettings.adx = document.getElementById('toggle-adx').checked;
    appSettings.macd = document.getElementById('toggle-macd').checked;
    appSettings.supertrend = document.getElementById('toggle-supertrend').checked;
    appSettings.psar = document.getElementById('toggle-psar').checked;
    appSettings.ichimoku = document.getElementById('toggle-ichimoku').checked;
    
    localStorage.setItem('idx_app_settings', JSON.stringify(appSettings));
    document.getElementById('settings-modal').style.display = 'none';
    
    renderChart();
    renderWatchlistUI();
    renderPortfolioUI();
    runScreener(true); 
});

// --- 0.5 CUSTOM APP NOTIFICATION ENGINE ---
function showAppAlert(title, message, isError = true) {
    document.getElementById('custom-alert-title').textContent = title;
    document.getElementById('custom-alert-title').style.color = isError ? '#ef5350' : '#26a69a';
    document.getElementById('custom-alert-message').textContent = message;
    document.getElementById('custom-alert-modal').style.display = 'flex';
}
document.getElementById('custom-alert-close').addEventListener('click', () => {
    document.getElementById('custom-alert-modal').style.display = 'none';
});

// --- 1. LOCAL VAULT SECURITY LOGIC ---
let currentUser = sessionStorage.getItem('idx_logged_user') || null;

function handleLogin() {
    const userIn = document.getElementById('auth-username').value.trim();
    const passIn = document.getElementById('auth-password').value.trim();
    if (!userIn || !passIn) return showAppAlert(t("alert-missing"), t("alert-missing-msg"));

    let usersDb = JSON.parse(localStorage.getItem('idx_users_db')) || {};
    if (!usersDb[userIn]) return showAppAlert(t("alert-notfound"), t("alert-notfound-msg"));
    if (usersDb[userIn] !== passIn) return showAppAlert(t("alert-invalid"), t("alert-invalid-msg"));
    
    executeSessionLogin(userIn);
}

function handleRegistration() {
    const userIn = document.getElementById('auth-username').value.trim();
    const passIn = document.getElementById('auth-password').value.trim();
    if (!userIn || !passIn) return showAppAlert(t("alert-missing"), t("alert-missing-msg"));
    if (userIn.length < 3 || passIn.length < 4) return showAppAlert("Invalid Format", "Username >= 3, Password >= 4");

    let usersDb = JSON.parse(localStorage.getItem('idx_users_db')) || {};
    if (usersDb[userIn]) return showAppAlert("Username Taken", "Username already taken!");

    usersDb[userIn] = passIn;
    localStorage.setItem('idx_users_db', JSON.stringify(usersDb));
    showAppAlert(t("alert-success"), t("alert-reg-msg"), false);
    executeSessionLogin(userIn);
}

function executeSessionLogin(username) {
    currentUser = username;
    sessionStorage.setItem('idx_logged_user', username);
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('main-app').style.display = 'flex';
    
    const rect = chartContainer.getBoundingClientRect();
    if (rect.width > 0 && rect.height > 0) chart.resize(rect.width, rect.height);
    
    loadWatchlistForUser();
    renderWatchlistUI();
    loadPortfolioForUser();
    renderPortfolioUI();
    window.dispatchEvent(new Event('resize'));
}

function handleLogout() {
    currentUser = null;
    sessionStorage.removeItem('idx_logged_user');
    document.getElementById('main-app').style.display = 'none';
    document.getElementById('login-screen').style.display = 'flex';
}

function verifyBootSession() {
    applyLanguage(currentLang); // Initialize Language on boot
    if (currentUser) executeSessionLogin(currentUser);
}

// --- 2. INITIALIZE CHART CORE ---
const chartContainer = document.getElementById('chart-container');
const chart = LightweightCharts.createChart(chartContainer, {
    layout: { textColor: '#d1d4dc', background: { type: 'solid', color: '#121212' } },
    grid: { vertLines: { color: '#2b2b43' }, horzLines: { color: '#2b2b43' } },
    timeScale: { borderColor: '#2b2b43', timeVisible: true, secondsVisible: false }
});

new ResizeObserver(entries => {
    if (entries.length === 0 || entries[0].target !== chartContainer) return;
    const newRect = entries[0].contentRect;
    if (newRect.width > 0 && newRect.height > 0) chart.resize(newRect.width, newRect.height);
}).observe(chartContainer);

const candleSeries = chart.addCandlestickSeries({ upColor: '#26a69a', downColor: '#ef5350', borderVisible: false, wickUpColor: '#26a69a', wickDownColor: '#ef5350' });
const volumeSeries = chart.addHistogramSeries({ priceFormat: { type: 'volume' }, priceScaleId: '' });
candleSeries.priceScale().applyOptions({ scaleMargins: { top: 0.1, bottom: 0.25 } });
volumeSeries.priceScale().applyOptions({ scaleMargins: { top: 0.8, bottom: 0 } });

const tenkanSeries = chart.addLineSeries({ color: '#2962FF', lineWidth: 1, title: 'Tenkan' });
const kijunSeries = chart.addLineSeries({ color: '#E53935', lineWidth: 1, title: 'Kijun' });
const cloudSeries = chart.addCandlestickSeries({
    upColor: 'rgba(38, 166, 154, 0.25)',    
    downColor: 'rgba(239, 83, 80, 0.25)',   
    borderVisible: false, wickVisible: false, priceLineVisible: false, lastValueVisible: false
});

// --- 3. MATHEMATICAL ALGORITHMS ---
function calculateHeikinAshi(standardData) {
    let haData = [];
    for (let i = 0; i < standardData.length; i++) {
        let current = standardData[i];
        let haCandle = { time: current.time };
        if (i === 0) {
            haCandle.open = (current.open + current.close) / 2;
            haCandle.close = (current.open + current.high + current.low + current.close) / 4;
            haCandle.high = current.high; haCandle.low = current.low;
        } else {
            let prevHA = haData[i - 1];
            haCandle.close = (current.open + current.high + current.low + current.close) / 4;
            haCandle.open = (prevHA.open + prevHA.close) / 2;
            haCandle.high = Math.max(current.high, haCandle.open, haCandle.close);
            haCandle.low = Math.min(current.low, haCandle.open, haCandle.close);
        }
        haData.push(haCandle);
    }
    return haData;
}

function getMovingAverage(data, period) {
    if (data.length < period) return null;
    let sum = 0;
    for (let i = data.length - period; i < data.length; i++) sum += data[i].close;
    return sum / period;
}

function getLatestADX(data, period=14) {
    if(data.length < period * 2) return null;
    let trs = [], pdm = [], ndm = [];
    for(let i=1; i<data.length; i++) {
        let up = data[i].high - data[i-1].high;
        let dn = data[i-1].low - data[i].low;
        trs.push(Math.max(data[i].high - data[i].low, Math.abs(data[i].high - data[i-1].close), Math.abs(data[i].low - data[i-1].close)));
        pdm.push(up > dn && up > 0 ? up : 0);
        ndm.push(dn > up && dn > 0 ? dn : 0);
    }
    let str = trs.slice(0,period).reduce((a,b)=>a+b);
    let spdm = pdm.slice(0,period).reduce((a,b)=>a+b);
    let sndm = ndm.slice(0,period).reduce((a,b)=>a+b);
    let adxArr = [];
    
    for(let i=period; i<trs.length; i++) {
        str = str - (str/period) + trs[i];
        spdm = spdm - (spdm/period) + pdm[i];
        sndm = sndm - (sndm/period) + ndm[i];
        let pdi = 100 * (spdm/str);
        let ndi = 100 * (sndm/str);
        adxArr.push(100 * Math.abs(pdi - ndi) / (pdi + ndi || 1));
    }
    let adx = adxArr.slice(0, period).reduce((a,b)=>a+b)/period;
    for(let i=period; i<adxArr.length; i++) adx = (adx * (period-1) + adxArr[i])/period;
    return adx;
}

function getLatestMACD(data) {
    if(data.length < 35) return { isBullish: false };
    let closes = data.map(d=>d.close);
    let ema12 = [], ema26 = [];
    let e12 = closes.slice(0, 12).reduce((a,b)=>a+b)/12;
    let e26 = closes.slice(0, 26).reduce((a,b)=>a+b)/26;
    for(let i=12; i<closes.length; i++) { e12 = (closes[i] - e12)*(2/13) + e12; ema12[i] = e12; }
    for(let i=26; i<closes.length; i++) { e26 = (closes[i] - e26)*(2/27) + e26; ema26[i] = e26; }
    
    let macd = [];
    for(let i=26; i<closes.length; i++) macd.push(ema12[i] - ema26[i]);
    
    let signal = macd.slice(0, 9).reduce((a,b)=>a+b)/9;
    for(let i=9; i<macd.length; i++) signal = (macd[i] - signal)*(2/10) + signal;
    
    let hist = macd[macd.length-1] - signal;
    let prevHist = macd[macd.length-2] - signal; 
    return { isBullish: hist > prevHist && hist > 0 };
}

function getLatestSupertrend(data, period = 14, multiplier = 3) {
    if (data.length < period + 5) return { isBullish: false };
    let trs = [];
    for (let i = 1; i < data.length; i++) {
        trs.push(Math.max(data[i].high - data[i].low, Math.abs(data[i].high - data[i - 1].close), Math.abs(data[i].low - data[i - 1].close)));
    }
    let atrs = new Array(data.length).fill(0);
    let sumTR = trs.slice(0, period).reduce((a, b) => a + b, 0);
    atrs[period] = sumTR / period;
    for (let i = period + 1; i < data.length; i++) {
        atrs[i] = (atrs[i - 1] * (period - 1) + trs[i - 1]) / period;
    }

    let upperBand = 0, lowerBand = 0, supertrend = 0, inUptrend = true;
    for (let i = period; i < data.length; i++) {
        let hl2 = (data[i].high + data[i].low) / 2;
        let basicUpper = hl2 + (multiplier * atrs[i]);
        let basicLower = hl2 - (multiplier * atrs[i]);

        if (i === period) {
            upperBand = basicUpper; lowerBand = basicLower; supertrend = upperBand;
            inUptrend = data[i].close > supertrend;
        } else {
            lowerBand = (basicLower > lowerBand || data[i - 1].close < lowerBand) ? basicLower : lowerBand;
            upperBand = (basicUpper < upperBand || data[i - 1].close > upperBand) ? basicUpper : upperBand;
            if (inUptrend) {
                if (data[i].close < lowerBand) { inUptrend = false; supertrend = upperBand; } else { supertrend = lowerBand; }
            } else {
                if (data[i].close > upperBand) { inUptrend = true; supertrend = lowerBand; } else { supertrend = upperBand; }
            }
        }
    }
    return { isBullish: inUptrend };
}

function getLatestPSAR(data, afStep = 0.02, afMax = 0.2) {
    if (data.length < 10) return { isBullish: false };
    let isLong = data[1].close > data[0].close;
    let sar = isLong ? data[0].low : data[0].high;
    let ep = isLong ? data[1].high : data[1].low;
    let af = afStep;

    for (let i = 1; i < data.length; i++) {
        let nextSar = sar + af * (ep - sar);
        if (isLong) {
            nextSar = Math.min(nextSar, data[i - 1].low, i >= 2 ? data[i - 2].low : data[i - 1].low);
            if (data[i].low < nextSar) {
                isLong = false; sar = ep; ep = data[i].low; af = afStep;
            } else {
                sar = nextSar;
                if (data[i].high > ep) { ep = data[i].high; af = Math.min(af + afStep, afMax); }
            }
        } else {
            nextSar = Math.max(nextSar, data[i - 1].high, i >= 2 ? data[i - 2].high : data[i - 1].high);
            if (data[i].high > nextSar) {
                isLong = true; sar = ep; ep = data[i].high; af = afStep;
            } else {
                sar = nextSar;
                if (data[i].low < ep) { ep = data[i].low; af = Math.min(af + afStep, afMax); }
            }
        }
    }
    return { isBullish: isLong };
}

function calculateIchimoku(data) {
    if (data.length < 52) return { tenkan: [], kijun: [], cloud: [] };
    let tenkan = [], kijun = [], cloud = [];

    function getHLAvg(slice) {
        let h = Math.max(...slice.map(d => d.high));
        let l = Math.min(...slice.map(d => d.low));
        return (h + l) / 2;
    }

    for (let i = 0; i < data.length; i++) {
        let tVal = i >= 8 ? getHLAvg(data.slice(i - 8, i + 1)) : null;
        let kVal = i >= 25 ? getHLAvg(data.slice(i - 25, i + 1)) : null;
        let sBVal = i >= 51 ? getHLAvg(data.slice(i - 51, i + 1)) : null;

        if (tVal !== null) tenkan.push({ time: data[i].time, value: tVal });
        if (kVal !== null) kijun.push({ time: data[i].time, value: kVal });
        
        let sAVal = (tVal !== null && kVal !== null) ? (tVal + kVal) / 2 : null;

        if (sAVal !== null && sBVal !== null) {
            cloud.push({
                time: data[i].time,
                open: sBVal,  
                close: sAVal, 
                high: Math.max(sAVal, sBVal),
                low: Math.min(sAVal, sBVal)
            });
        }
    }
    return { tenkan, kijun, cloud };
}

function calculateStrategyWinRate(stdData, haData) {
    let winningTrades = 0, losingTrades = 0, totalTrades = 0;
    let inPosition = false, buyPrice = 0, totalProfitPct = 0, totalLossPct = 0;

    for (let i = 1; i < haData.length; i++) {
        let prevHA = haData[i - 1], currHA = haData[i], currStd = stdData[i];
        let prevIsRed = prevHA.close < prevHA.open, currIsGreen = currHA.close >= currHA.open;
        let prevIsGreen = prevHA.close >= prevHA.open, currIsRed = currHA.close < currHA.open;

        if (!inPosition && prevIsRed && currIsGreen) {
            inPosition = true; buyPrice = currStd.close; 
        } 
        else if (inPosition && prevIsGreen && currIsRed) {
            inPosition = false; totalTrades++;
            let tradeReturnPct = ((currStd.close - buyPrice) / buyPrice) * 100;
            if (currStd.close > buyPrice) { winningTrades++; totalProfitPct += tradeReturnPct; } 
            else { losingTrades++; totalLossPct += tradeReturnPct; }
        }
    }
    
    let rate = totalTrades === 0 ? 0 : ((winningTrades / totalTrades) * 100);
    let avgProfit = winningTrades === 0 ? 0 : (totalProfitPct / winningTrades);
    let avgLoss = losingTrades === 0 ? 0 : (totalLossPct / losingTrades);

    return { rate: rate.toFixed(0), total: totalTrades, avgProfit: avgProfit.toFixed(2), avgLoss: avgLoss.toFixed(2) };
}

function generateIndicatorHTML(data) {
    let html = '';
    if (appSettings.ma5) html += `<span class="ha-badge ${data.overMA5 ? 'up' : 'down'}" title="Price vs MA5">MA5: ${data.overMA5 ? 'ABOVE' : 'BELOW'}</span>`;
    if (appSettings.ma20) html += `<span class="ha-badge ${data.overMA20 ? 'up' : 'down'}" title="Price vs MA20">MA20: ${data.overMA20 ? 'ABOVE' : 'BELOW'}</span>`;
    if (appSettings.adx && data.adx !== null && data.adx !== undefined) html += `<span class="ha-badge ${data.adx > 25 ? 'up' : 'neutral'}">ADX: ${data.adx.toFixed(0)}</span>`;
    if (appSettings.macd && data.macd) html += `<span class="ha-badge ${data.macd.isBullish ? 'up' : 'down'}">MACD: ${data.macd.isBullish ? 'BULL' : 'BEAR'}</span>`;
    if (appSettings.supertrend && data.supertrend) html += `<span class="ha-badge ${data.supertrend.isBullish ? 'up' : 'down'}">SUPERTREND: ${data.supertrend.isBullish ? 'BULL' : 'BEAR'}</span>`;
    if (appSettings.psar && data.psar) html += `<span class="ha-badge ${data.psar.isBullish ? 'up' : 'down'}">PSAR: ${data.psar.isBullish ? 'BULL' : 'BEAR'}</span>`;
    return html;
}

// --- 4. DATA HOVER ENGINE LOGIC ---
function updateInfoBar(candle, volume, rawTime) {
    const symbolEl = document.getElementById('info-symbol');
    const timeEl = document.getElementById('info-time');
    const openEl = document.getElementById('info-open');
    const highEl = document.getElementById('info-high');
    const lowEl = document.getElementById('info-low');
    const closeEl = document.getElementById('info-close');
    const volumeEl = document.getElementById('info-volume');

    symbolEl.textContent = currentSymbolDisplay;
    if (!candle) {
        if (cachedStandardData.length > 0) {
            const lastCandle = cachedStandardData[cachedStandardData.length - 1];
            updateInfoBar(lastCandle, { value: lastCandle.volume }, lastCandle.time);
        }
        return;
    }
    const dateObj = new Date(rawTime * 1000);
    timeEl.textContent = dateObj.toLocaleDateString() + ' ' + dateObj.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    openEl.textContent = candle.open.toLocaleString();
    highEl.textContent = candle.high.toLocaleString();
    lowEl.textContent = candle.low.toLocaleString();
    closeEl.textContent = candle.close.toLocaleString();
    volumeEl.textContent = volume ? volume.value.toLocaleString() : '0';

    const colorClass = candle.close >= candle.open ? 'text-green' : 'text-red';
    [openEl, highEl, lowEl, closeEl].forEach(el => el.className = `info-value ${colorClass}`);
}

chart.subscribeCrosshairMove(param => {
    if (!param.time || param.point === undefined || param.point.x < 0 || param.point.y < 0) {
        updateInfoBar(null, null, null); return;
    }
    updateInfoBar(param.seriesData.get(candleSeries), param.seriesData.get(volumeSeries), param.time);
});

// --- 5 & 6. CHART RENDERING & DATA FETCHING ---
async function fetchMTFData(symbol) {
    const wEl = document.getElementById('mtf-w');
    const dEl = document.getElementById('mtf-d');
    const hEl = document.getElementById('mtf-h');
    wEl.innerHTML = 'W: ⏳'; dEl.innerHTML = 'D: ⏳'; hEl.innerHTML = 'H: ⏳';

    const timeframes = [
        { id: '1wk', range: '3mo', el: wEl, label: 'W' },
        { id: '1d', range: '1mo', el: dEl, label: 'D' },
        { id: '1h', range: '1mo', el: hEl, label: 'H' }
    ];

    for (const config of timeframes) {
        try {
            const res = await fetch(`https://corsproxy.io/?${encodeURIComponent(`https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=${config.id}&range=${config.range}`)}`);
            const data = await res.json();
            const result = data.chart.result[0];
            const quotes = result.indicators.quote[0];
            let stdData = [];
            for (let i = 0; i < result.timestamp.length; i++) {
                if (quotes.open[i] !== null) stdData.push({ open: quotes.open[i], high: quotes.high[i], low: quotes.low[i], close: quotes.close[i] });
            }
            const haData = calculateHeikinAshi(stdData);
            const isBullish = haData[haData.length - 1].close >= haData[haData.length - 1].open;
            config.el.innerHTML = `${config.label}: ${isBullish ? '🟢' : '🔴'}`;
        } catch (e) { config.el.innerHTML = `${config.label}: ⚠️`; }
        await new Promise(resolve => setTimeout(resolve, 150));
    }
}

async function fetchStockData(overrideSymbol = null) {
    const inputElement = document.getElementById('stock-input');
    const searchBtn = document.getElementById('search-btn');
    let rawInput = overrideSymbol ? overrideSymbol : inputElement.value.trim().toUpperCase();
    if (!rawInput) { return showAppAlert(t("alert-invalid-stock"), t("alert-missing-msg")); }

    let ticker = rawInput.replace('.JK', '');
    let symbol = rawInput.endsWith('.JK') ? rawInput : rawInput + '.JK';
    
    inputElement.value = 'Loading...'; searchBtn.disabled = true;
    const timeframeVal = document.getElementById('timeframe-select').value;
    const [interval, range] = timeframeVal.split('|');
    const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(`https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=${interval}&range=${range}`)}`;

    try {
        const response = await fetch(proxyUrl);
        const data = await response.json();
        
        if (!data.chart || !data.chart.result || data.chart.error) { 
            inputElement.value = rawInput; searchBtn.disabled = false;
            return showAppAlert(t("alert-invalid-stock"), `Yahoo Finance could not find market data for '${ticker}'.`); 
        }

        const result = data.chart.result[0];
        const timestamps = result.timestamp;
        const quotes = result.indicators.quote[0];
        if (!timestamps) { inputElement.value = rawInput; searchBtn.disabled = false; return showAppAlert("Data Error", `No historical data found.`); }

        currentSymbolDisplay = ticker; 
        fetchMTFData(symbol);
        candleSeries.setData([]); volumeSeries.setData([]); cachedStandardData = [];

        let tempArray = [], lastTimestamp = 0;
        for (let i = 0; i < timestamps.length; i++) {
            if (quotes.open[i] === null || quotes.high[i] === null || quotes.low[i] === null || quotes.close[i] === null) continue;
            if (timestamps[i] === lastTimestamp) continue;
            lastTimestamp = timestamps[i];
            tempArray.push({ time: timestamps[i], open: quotes.open[i], high: quotes.high[i], low: quotes.low[i], close: quotes.close[i], volume: quotes.volume[i] || 0 });
        }
        
        cachedStandardData = tempArray; 
        renderChart(); chart.timeScale().fitContent(); 
        inputElement.value = ticker; inputElement.blur(); searchBtn.disabled = false;
    } catch (error) { 
        inputElement.value = rawInput; searchBtn.disabled = false;
        showAppAlert("Network Error", "Unable to connect to the market API."); 
    }
}

function renderChart() {
    if (cachedStandardData.length === 0) return;
    const selectedType = document.getElementById('chart-type').value;
    if (selectedType === 'heikin-ashi') candleSeries.setData(calculateHeikinAshi(cachedStandardData));
    else candleSeries.setData(cachedStandardData);
    
    let volumeData = cachedStandardData.map(current => ({
        time: current.time, value: current.volume, color: current.close >= current.open ? 'rgba(38, 166, 154, 0.4)' : 'rgba(239, 83, 80, 0.4)'
    }));
    volumeSeries.setData(volumeData);

    if (appSettings.ichimoku) {
        const ichi = calculateIchimoku(cachedStandardData);
        tenkanSeries.setData(ichi.tenkan);
        kijunSeries.setData(ichi.kijun);
        cloudSeries.setData(ichi.cloud); 
    } else {
        tenkanSeries.setData([]);
        kijunSeries.setData([]);
        cloudSeries.setData([]);
    }

    updateInfoBar(null, null, null);
}

// --- 7. WATCHLIST UI REWORK ---
let myWatchlist = [];
function loadWatchlistForUser() { myWatchlist = JSON.parse(localStorage.getItem(`idx_watchlist_${currentUser}`)) || []; document.getElementById('current-user-display').textContent = currentUser;}
function saveWatchlist() { localStorage.setItem(`idx_watchlist_${currentUser}`, JSON.stringify(myWatchlist)); }

async function fetchWatchlistMTF() {
    const activeUserAtStart = currentUser;
    for (const ticker of myWatchlist) {
        if (currentUser !== activeUserAtStart) break; 
        const symbol = ticker + '.JK';
        const timeframes = [{ id: '1wk', range: '3mo', elId: `wl-w-${ticker}` }, { id: '1h', range: '1mo', elId: `wl-h-${ticker}` }];

        for (const config of timeframes) {
            try {
                const res = await fetch(`https://corsproxy.io/?${encodeURIComponent(`https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=${config.id}&range=${config.range}`)}`);
                const data = await res.json();
                const quotes = data.chart.result[0].indicators.quote[0];
                let stdData = [];
                for (let i = 0; i < data.chart.result[0].timestamp.length; i++) {
                    if (quotes.open[i] !== null) stdData.push({ open: quotes.open[i], high: quotes.high[i], low: quotes.low[i], close: quotes.close[i] });
                }
                const haData = calculateHeikinAshi(stdData);
                const isBullish = haData[haData.length - 1].close >= haData[haData.length - 1].open;
                const span = document.getElementById(config.elId);
                if (span) span.textContent = `${config.id === '1wk' ? 'W' : 'H'}: ${isBullish ? '🟢' : '🔴'}`;
            } catch (e) {
                const span = document.getElementById(config.elId);
                if (span) span.textContent = `${config.id === '1wk' ? 'W' : 'H'}: ⚠️`;
            }
            await new Promise(resolve => setTimeout(resolve, 250));
        }
    }
}

async function renderWatchlistUI() {
    const ul = document.getElementById('watchlist-ul');
    ul.innerHTML = '<div style="text-align: center; color: #888; padding: 20px;">Fetching live market data...</div>';
    if (myWatchlist.length === 0) { ul.innerHTML = '<div style="text-align: center; color: #888; padding: 20px;">Watchlist is empty.</div>'; return; }

    const results = [];
    for (const ticker of myWatchlist) {
        try {
            const response = await fetch(`https://corsproxy.io/?${encodeURIComponent(`https://query1.finance.yahoo.com/v8/finance/chart/${ticker}.JK?interval=1d&range=6mo`)}`);
            const data = await response.json();
            const result = data.chart.result[0]; const quotes = result.indicators.quote[0];
            let stdData = [];
            for (let i = 0; i < result.timestamp.length; i++) { if (quotes.open[i] !== null) stdData.push({ time: result.timestamp[i], open: quotes.open[i], high: quotes.high[i], low: quotes.low[i], close: quotes.close[i] }); }
            
            const currentPrice = result.meta.regularMarketPrice;
            const haData = calculateHeikinAshi(stdData);
            const isHAUp = haData[haData.length - 1].close >= haData[haData.length - 1].open;
            const last5HA = haData.slice(Math.max(haData.length - 5, 0));
            const winStats = calculateStrategyWinRate(stdData, haData);

            let indicatorData = { price: currentPrice };
            if(appSettings.ma5) indicatorData.overMA5 = currentPrice > getMovingAverage(stdData, 5);
            if(appSettings.ma20) indicatorData.overMA20 = currentPrice > getMovingAverage(stdData, 20);
            if(appSettings.adx) indicatorData.adx = getLatestADX(stdData);
            if(appSettings.macd) indicatorData.macd = getLatestMACD(stdData);
            if(appSettings.supertrend) indicatorData.supertrend = getLatestSupertrend(stdData);
            if(appSettings.psar) indicatorData.psar = getLatestPSAR(stdData);

            let prevClose = stdData.length > 1 ? stdData[stdData.length - 2].close : currentPrice;
            const change = currentPrice - prevClose;

            results.push({ ticker, currentPrice, change, changePct: (change / prevClose) * 100, isHAUp, last5HA, winStats, indicatorData, error: false });
        } catch (e) { results.push({ ticker, error: true }); }
    }

    ul.innerHTML = '';
    results.forEach((item, index) => {
        const li = document.createElement('li'); li.className = 'stock-item';
        li.onclick = () => { fetchStockData(item.ticker); document.querySelector('[data-target="chart-view"]').click(); };

        if (!item.error) {
            let miniChartHTML = '<div class="ha-5day-window" title="Last 5 Days HA Trend">';
            item.last5HA.forEach(candle => {
                const isUp = candle.close >= candle.open;
                miniChartHTML += `<div class="mini-candle ${isUp ? 'up' : 'down'}"></div>`;
            });
            miniChartHTML += '</div>';

            li.innerHTML = `
                <div class="wl-left">
                    <div class="wl-avatar">${item.ticker.substring(0, 2)}</div>
                    <div class="wl-ticker-info">
                        <div style="display:flex; align-items:center; gap:10px; flex-wrap:wrap;">
                            <span class="wl-ticker-name">${item.ticker}</span>
                            <span class="ha-badge ${item.isHAUp ? 'up' : 'down'}">${item.isHAUp ? 'DAILY HA: BULLISH' : 'DAILY HA: BEARISH'}</span>
                            <span class="ha-badge neutral" title="Historic Strategy Winrate">WINRATE: ${item.winStats.rate}% (${item.winStats.total} Trades)</span>
                            ${generateIndicatorHTML(item.indicatorData)}
                        </div>
                        <div style="font-size: 11px; color: #888; margin-top: 2px;">
                            Avg Win: <span class="text-green">+${item.winStats.avgProfit}%</span> | Avg Loss: <span class="text-red">${item.winStats.avgLoss}%</span>
                        </div>
                        <div class="wl-mtf" style="background: none; border: none; padding: 0; display: flex; align-items: center; gap: 10px; margin-top: 4px;">
                            <div class="wl-mtf" style="margin:0;">
                                <span id="wl-w-${item.ticker}">W: ⏳</span>
                                <span>D: ${item.isHAUp ? '🟢' : '🔴'}</span>
                                <span id="wl-h-${item.ticker}">H: ⏳</span>
                            </div>
                            ${miniChartHTML}
                        </div>
                    </div>
                </div>
                <div class="wl-right">
                    <div class="wl-price-info">
                        <span class="wl-price">${item.currentPrice.toLocaleString('en-US')}</span>
                        <span class="wl-change ${item.change >= 0 ? 'text-green' : 'text-red'}">${item.change >= 0 ? '+' : ''}${item.change.toFixed(0)} (${item.change >= 0 ? '+' : ''}${item.changePct.toFixed(2)}%)</span>
                    </div>
                    <button class="add-port-btn" title="Add to Portfolio">+</button>
                    <button class="delete-btn" title="Remove from Watchlist">×</button>
                </div>
            `;
            
            const addPortBtn = li.querySelector('.add-port-btn');
            if (addPortBtn) {
                addPortBtn.onclick = (e) => {
                    e.stopPropagation(); 
                    document.getElementById('new-portfolio-ticker').value = item.ticker;
                    document.getElementById('portfolio-modal').style.display = 'flex';
                };
            }
            li.querySelector('.delete-btn').onclick = (e) => { e.stopPropagation(); myWatchlist.splice(index, 1); saveWatchlist(); renderWatchlistUI(); };
            ul.appendChild(li);
        }
    });
    fetchWatchlistMTF();
}

async function addWatchlistItem() {
    const input = document.getElementById('new-watchlist-item');
    const btn = document.getElementById('add-watchlist-btn');
    let ticker = input.value.trim().toUpperCase().replace('.JK', ''); 
    if (!ticker) return;

    if (myWatchlist.includes(ticker)) return showAppAlert(t("alert-dup"), `${ticker} ${t("alert-dup-msg")}`);
    btn.textContent = "Verifying..."; btn.disabled = true;

    try {
        const response = await fetch(`https://corsproxy.io/?${encodeURIComponent(`https://query1.finance.yahoo.com/v8/finance/chart/${ticker}.JK?interval=1d&range=1d`)}`);
        const data = await response.json();
        
        if (!data.chart || data.chart.error || !data.chart.result) {
            btn.textContent = t("btn-add-list"); btn.disabled = false;
            return showAppAlert(t("alert-invalid-stock"), `The ticker '${ticker}' could not be verified on the live market.`);
        }
        myWatchlist.push(ticker); input.value = ''; btn.textContent = t("btn-add-list"); btn.disabled = false;
        saveWatchlist(); renderWatchlistUI();
    } catch (error) {
        btn.textContent = t("btn-add-list"); btn.disabled = false;
        showAppAlert("Network Error", "Unable to connect to the market API to verify stock.");
    }
}

// --- 8. PORTFOLIO UI REWORK ---
let myPortfolio = [];
function loadPortfolioForUser() { myPortfolio = JSON.parse(localStorage.getItem(`idx_portfolio_${currentUser}`)) || []; }
function savePortfolio() { localStorage.setItem(`idx_portfolio_${currentUser}`, JSON.stringify(myPortfolio)); }

async function addPortfolioItem() {
    const tickerInp = document.getElementById('new-portfolio-ticker');
    const priceInp = document.getElementById('new-portfolio-price');
    const sharesInp = document.getElementById('new-portfolio-shares');
    const btn = document.getElementById('add-portfolio-btn');

    let ticker = tickerInp.value.trim().toUpperCase().replace('.JK', ''); 
    let avgPrice = parseFloat(priceInp.value);
    let lots = parseFloat(sharesInp.value) || 1; 

    if (!ticker || isNaN(avgPrice) || avgPrice <= 0) return showAppAlert(t("alert-missing"), t("alert-missing-msg"));
    btn.textContent = "Verifying Ticker..."; btn.disabled = true;

    try {
        const response = await fetch(`https://corsproxy.io/?${encodeURIComponent(`https://query1.finance.yahoo.com/v8/finance/chart/${ticker}.JK?interval=1d&range=1d`)}`);
        const data = await response.json();
        
        if (!data.chart || data.chart.error || !data.chart.result) {
            btn.textContent = t("btn-save-pos"); btn.disabled = false;
            return showAppAlert(t("alert-invalid-stock"), `The ticker '${ticker}' could not be verified.`);
        }

        const existingIdx = myPortfolio.findIndex(p => p.ticker === ticker);
        if (existingIdx >= 0) { myPortfolio[existingIdx].avgPrice = avgPrice; myPortfolio[existingIdx].lots = lots; } 
        else { myPortfolio.push({ ticker, avgPrice, lots }); }
        
        tickerInp.value = ''; priceInp.value = ''; sharesInp.value = '';
        btn.textContent = t("btn-save-pos"); btn.disabled = false;
        savePortfolio(); renderPortfolioUI(); document.getElementById('portfolio-modal').style.display = 'none';
    } catch (error) {
        btn.textContent = t("btn-save-pos"); btn.disabled = false;
        showAppAlert("Network Error", "Unable to connect to the market API.");
    }
}

async function renderPortfolioUI() {
    const ul = document.getElementById('portfolio-ul');
    ul.innerHTML = '<div style="text-align: center; color: #888; padding: 20px;">Fetching portfolio data...</div>';
    if (myPortfolio.length === 0) { ul.innerHTML = '<div style="text-align: center; color: #888; padding: 20px;">Your portfolio is empty. Add your holdings above!</div>'; return; }

    const results = [];
    for (const item of myPortfolio) {
        try {
            const response = await fetch(`https://corsproxy.io/?${encodeURIComponent(`https://query1.finance.yahoo.com/v8/finance/chart/${item.ticker}.JK?interval=1d&range=6mo`)}`);
            const data = await response.json();
            const result = data.chart.result[0]; const quotes = result.indicators.quote[0];
            let stdData = [];
            for (let i = 0; i < result.timestamp.length; i++) { if (quotes.open[i] !== null) stdData.push({ time: result.timestamp[i], open: quotes.open[i], high: quotes.high[i], low: quotes.low[i], close: quotes.close[i] }); }

            const currentPrice = result.meta.regularMarketPrice;
            const haData = calculateHeikinAshi(stdData);
            const isHAUp = haData[haData.length - 1].close >= haData[haData.length - 1].open;
            const last5HA = haData.slice(Math.max(haData.length - 5, 0));
            const winStats = calculateStrategyWinRate(stdData, haData);
            
            let indicatorData = { price: currentPrice };
            if(appSettings.ma5) indicatorData.overMA5 = currentPrice > getMovingAverage(stdData, 5);
            if(appSettings.ma20) indicatorData.overMA20 = currentPrice > getMovingAverage(stdData, 20);
            if(appSettings.adx) indicatorData.adx = getLatestADX(stdData);
            if(appSettings.macd) indicatorData.macd = getLatestMACD(stdData);
            if(appSettings.supertrend) indicatorData.supertrend = getLatestSupertrend(stdData);
            if(appSettings.psar) indicatorData.psar = getLatestPSAR(stdData);

            let warningBadge = '';
            const bodyLength = Math.abs(haData[haData.length - 1].close - haData[haData.length - 1].open);
            const totalLength = haData[haData.length - 1].high - haData[haData.length - 1].low;
            if (totalLength > 0 && bodyLength < (totalLength * 0.3)) warningBadge = `<span class="ha-badge warning">⚠️ DOJI WARNING</span>`;
            else if (!isHAUp) warningBadge = `<span class="ha-badge down">⚠️ BEARISH</span>`;

            let safeLots = item.lots || item.shares || 1; 
            const totalShares = safeLots * 100;
            const totalCost = item.avgPrice * totalShares;
            const currentValue = currentPrice * totalShares;
            const plAmount = currentValue - totalCost;
            const plPct = ((currentPrice - item.avgPrice) / item.avgPrice) * 100;

            results.push({ ...item, currentPrice, plAmount, plPct, isHAUp, last5HA, warningBadge, safeLots, winStats, indicatorData, error: false });
        } catch (e) { results.push({ ...item, error: true }); }
    }

    ul.innerHTML = '';
    results.forEach((item, index) => {
        const li = document.createElement('li'); li.className = 'stock-item';
        if (!item.error) {
            let miniChartHTML = '<div class="ha-5day-window" title="Last 5 Days HA Trend">';
            item.last5HA.forEach(candle => {
                const isUp = candle.close >= candle.open;
                miniChartHTML += `<div class="mini-candle ${isUp ? 'up' : 'down'}"></div>`;
            });
            miniChartHTML += '</div>';

            li.innerHTML = `
                <div class="wl-left">
                    <div class="wl-avatar">${item.ticker.substring(0, 2)}</div>
                    <div class="wl-ticker-info">
                        <div style="display:flex; align-items:center; gap:10px; flex-wrap:wrap;">
                            <span class="wl-ticker-name">${item.ticker}</span>
                            ${item.warningBadge}
                            <span class="ha-badge neutral" title="Historic Strategy Winrate">WINRATE: ${item.winStats.rate}% (${item.winStats.total} Trades)</span>
                            ${generateIndicatorHTML(item.indicatorData)}
                        </div>
                        <div style="font-size: 11px; color: #888; margin-top: 2px;">
                            Avg Win: <span class="text-green">+${item.winStats.avgProfit}%</span> | Avg Loss: <span class="text-red">${item.winStats.avgLoss}%</span>
                        </div>
                        <div class="wl-mtf" style="background: none; border: none; padding: 0; display: flex; align-items: center; gap: 10px; margin-top: 4px;">
                            <span style="color: #888;">Avg: ${item.avgPrice.toLocaleString('en-US')} | Lots: ${item.safeLots}</span>
                            ${miniChartHTML}
                        </div>
                    </div>
                </div>
                <div class="wl-right">
                    <div class="wl-price-info">
                        <span class="wl-price">${item.currentPrice.toLocaleString('en-US')}</span>
                        <span class="wl-change ${item.plAmount >= 0 ? 'text-green' : 'text-red'}">${item.plAmount >= 0 ? '+' : ''}${item.plAmount.toLocaleString('en-US', {maximumFractionDigits: 0})} (${item.plAmount >= 0 ? '+' : ''}${item.plPct.toFixed(2)}%)</span>
                    </div>
                    <button class="delete-btn">×</button>
                </div>
            `;
            li.onclick = () => { fetchStockData(item.ticker); document.querySelector('[data-target="chart-view"]').click(); };
            li.querySelector('.delete-btn').onclick = (e) => { e.stopPropagation(); myPortfolio.splice(index, 1); savePortfolio(); renderPortfolioUI(); };
            ul.appendChild(li);
        }
    });
}

// --- 9. HEIKIN ASHI SCREENER ENGINE ---
let lastScreenerResults = [];
async function runScreener(isSoftRefresh = false) {
    const ul = document.getElementById('screener-ul');
    const statusText = document.getElementById('screener-status');
    const strategy = document.getElementById('screener-strategy').value; 
    
    if(isSoftRefresh && lastScreenerResults.length > 0) { renderScreenerList(lastScreenerResults, strategy); return; }

    ul.innerHTML = ''; statusText.style.color = "#d1d4dc";
    let matchedStocks = []; 
    const rangeToFetch = strategy === 'golden-reversal' ? '1y' : '2mo';
    
    for (let i = 0; i < IDX_TOP_STOCKS.length; i += 5) {
        const batch = IDX_TOP_STOCKS.slice(i, i + 5);
        statusText.textContent = `Scanning Mega-Universe... Safe Progress: ${i} / ${IDX_TOP_STOCKS.length} tickers`;

        const batchPromises = batch.map(async (ticker) => {
            try {
                const response = await fetch(`https://corsproxy.io/?${encodeURIComponent(`https://query1.finance.yahoo.com/v8/finance/chart/${ticker}.JK?interval=1d&range=${rangeToFetch}`)}`); 
                const data = await response.json();
                const result = data.chart.result[0]; 
                const quotes = result.indicators.quote[0]; 
                let stdData = [];
                for (let j = 0; j < result.timestamp.length; j++) {
                    if (quotes.open[j] !== null) stdData.push({ time: result.timestamp[j], open: quotes.open[j], high: quotes.high[j], low: quotes.low[j], close: quotes.close[j], volume: quotes.volume[j] || 0 });
                }

                const haData = calculateHeikinAshi(stdData);
                const currentHA = haData[haData.length - 1];
                const currentPrice = result.meta.regularMarketPrice || currentHA.close;
                const last5HA = haData.slice(Math.max(haData.length - 5, 0));
                const winStats = calculateStrategyWinRate(stdData, haData);
                
                let indicatorData = { price: currentPrice };
                indicatorData.overMA5 = currentPrice > getMovingAverage(stdData, 5);
                indicatorData.overMA20 = currentPrice > getMovingAverage(stdData, 20);
                indicatorData.adx = getLatestADX(stdData);
                indicatorData.macd = getLatestMACD(stdData);
                indicatorData.supertrend = getLatestSupertrend(stdData);
                indicatorData.psar = getLatestPSAR(stdData);
                
                let bearishStreak = 0;
                for (let k = haData.length - 2; k >= 0; k--) { if (haData[k].close < haData[k].open) bearishStreak++; else break; }
                let goldenRuns = 0;
                if (strategy === 'golden-reversal') { 
                    let currentGreen = 0;
                    for (let k = 0; k < haData.length - 1; k++) {
                        if (haData[k].close >= haData[k].open) { currentGreen++; } 
                        else { if (currentGreen >= 5) { goldenRuns++; } currentGreen = 0; }
                    }
                    if (currentGreen >= 5) goldenRuns++; 
                }

                if (bearishStreak >= 2 && currentHA.close > currentHA.open) {
                    if (strategy === 'golden-reversal' && goldenRuns <= 2) return;
                    matchedStocks.push({ 
                        ticker, price: currentPrice, tradeValue: currentPrice * stdData[stdData.length - 1].volume, 
                        streak: bearishStreak, goldenRuns, indicatorData, winStats, last5HA
                    });
                }
            } catch (e) {}
        });
        await Promise.all(batchPromises); await new Promise(resolve => setTimeout(resolve, 400)); 
    }

    matchedStocks.sort((a, b) => b.winStats.rate - a.winStats.rate || b.tradeValue - a.tradeValue);
    lastScreenerResults = matchedStocks;
    statusText.textContent = `Scan complete. Evaluated ${IDX_TOP_STOCKS.length} tickers. Found ${matchedStocks.length} setups.`;
    renderScreenerList(matchedStocks, strategy);
}

function renderScreenerList(matchedStocks, strategy) {
    const ul = document.getElementById('screener-ul');
    ul.innerHTML = '';
    matchedStocks.forEach(item => {
        const li = document.createElement('li'); li.className = 'stock-item';
        
        let miniChartHTML = '<div class="ha-5day-window" title="Last 5 Days HA Trend">';
        item.last5HA.forEach(candle => {
            const isUp = candle.close >= candle.open;
            miniChartHTML += `<div class="mini-candle ${isUp ? 'up' : 'down'}"></div>`;
        });
        miniChartHTML += '</div>';

        let strategyBadgeText = strategy === 'golden-reversal' ? `REVERSAL + ${item.goldenRuns} GOLDEN RUNS` : `REVERSED A ${item.streak}-DAY RED TREND`;

        li.innerHTML = `
            <div class="wl-left">
                <div class="wl-avatar">${item.ticker.substring(0, 2)}</div>
                <div class="wl-ticker-info">
                    <div style="display:flex; align-items:center; gap:10px; flex-wrap:wrap;">
                        <span class="wl-ticker-name">${item.ticker}</span>
                        <span class="ha-badge up">${strategyBadgeText}</span>
                        <span class="ha-badge neutral">WINRATE: ${item.winStats.rate}% (${item.winStats.total} Trades)</span>
                        ${generateIndicatorHTML(item.indicatorData)}
                    </div>
                    <div style="font-size: 11px; color: #888; margin-top: 2px;">
                        Avg Win: <span class="text-green">+${item.winStats.avgProfit}%</span> | Avg Loss: <span class="text-red">${item.winStats.avgLoss}%</span>
                    </div>
                    <div class="wl-mtf" style="background: none; border: none; padding: 0; display: flex; align-items: center; gap: 10px; margin-top: 4px;">
                        ${miniChartHTML}
                    </div>
                </div>
            </div>
            <div class="wl-right"><div class="wl-price-info"><span class="wl-price">${item.price.toLocaleString('en-US')}</span></div></div>
        `;
        li.onclick = () => { fetchStockData(item.ticker); document.querySelector('[data-target="chart-view"]').click(); };
        ul.appendChild(li);
    });
}

// --- 10. LISTENERS ---
document.getElementById('search-btn').addEventListener('click', () => fetchStockData());
document.getElementById('stock-input').addEventListener('keypress', (e) => { if (e.key === 'Enter') fetchStockData(); });
document.getElementById('chart-type').addEventListener('change', renderChart);
document.getElementById('timeframe-select').addEventListener('change', () => fetchStockData());

document.getElementById('open-portfolio-modal-btn').addEventListener('click', () => {
    document.getElementById('new-portfolio-ticker').value = '';
    document.getElementById('new-portfolio-price').value = '';
    document.getElementById('new-portfolio-shares').value = '';
    document.getElementById('portfolio-modal').style.display = 'flex';
});

document.getElementById('close-port-modal').addEventListener('click', () => {
    document.getElementById('portfolio-modal').style.display = 'none';
});

document.getElementById('add-watchlist-btn').addEventListener('click', addWatchlistItem);
document.getElementById('new-watchlist-item').addEventListener('keypress', (e) => { if (e.key === 'Enter') addWatchlistItem(); });

document.getElementById('add-portfolio-btn').addEventListener('click', addPortfolioItem);
document.getElementById('new-portfolio-shares').addEventListener('keypress', (e) => { if (e.key === 'Enter') addPortfolioItem(); });

document.getElementById('run-screener-btn').addEventListener('click', () => runScreener(false));

document.getElementById('auth-login-btn').addEventListener('click', handleLogin);
document.getElementById('auth-register-btn').addEventListener('click', handleRegistration);
document.getElementById('logout-btn').addEventListener('click', handleLogout);
document.getElementById('auth-password').addEventListener('keypress', (e) => { if (e.key === 'Enter') handleLogin(); });

document.querySelectorAll('.tab-btn').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn, .tab-content').forEach(el => el.classList.remove('active'));
        button.classList.add('active');
        document.getElementById(button.getAttribute('data-target')).classList.add('active');
    });
});

// Fire up the session and apply user language!
verifyBootSession();
