let cachedStandardData = [];
let currentSymbolDisplay = "-"; 

// --- 0. GLOBAL IDX MASTER DATABASE (Used strictly for the Screener now) ---
const IDX_TOP_STOCKS = [
    'AALI','ABBA','ABMM','ACES','ACST','ADCP','ADES','ADHI','ADMG','ADRO','AGAR','AGRO','AGRS','AHAP','AISA','AKKU','AKPI','AKRA','AKSI','ALDO','ALKA','ALMI','ALTO','AMAG','AMAN','AMAR','AMFG','AMIN','AMMN','AMOR','AMRT','ANDI','ANJT','ANTM','APEX','APII','APLI','APLN','ARGO','ARII','ARKA','ARKO','ARNA','ARTA','ARTI','ARTO','ASBI','ASGR','ASHA','ASII','ASJT','ASLC','ASMI','ASRI','ASSA','ATAP','ATIC','AUTO','AWAR','AWST','AXIO','AYLS','AZRX',
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
    if (!userIn || !passIn) return showAppAlert("Missing Info", "Please fill in both fields!");

    let usersDb = JSON.parse(localStorage.getItem('idx_users_db')) || {};
    
    if (!usersDb[userIn]) {
        return showAppAlert("Account Not Found", "Account username does not exist. Please click Register to create it!");
    }
    if (usersDb[userIn] !== passIn) {
        return showAppAlert("Invalid Login", "Incorrect account password. Try again.");
    }

    executeSessionLogin(userIn);
}

function handleRegistration() {
    const userIn = document.getElementById('auth-username').value.trim();
    const passIn = document.getElementById('auth-password').value.trim();
    if (!userIn || !passIn) return showAppAlert("Missing Info", "Please enter a username and password!");
    if (userIn.length < 3 || passIn.length < 4) return showAppAlert("Invalid Format", "Username must be >= 3 chars, Password >= 4 chars.");

    let usersDb = JSON.parse(localStorage.getItem('idx_users_db')) || {};
    
    if (usersDb[userIn]) {
        return showAppAlert("Username Taken", "Username already taken! Choose a unique handle.");
    }

    usersDb[userIn] = passIn;
    localStorage.setItem('idx_users_db', JSON.stringify(usersDb));
    
    showAppAlert("Success", "Registration successful! Logging you in...", false);
    executeSessionLogin(userIn);
}

function executeSessionLogin(username) {
    currentUser = username;
    sessionStorage.setItem('idx_logged_user', username);
    
    document.getElementById('auth-username').value = '';
    document.getElementById('auth-password').value = '';

    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('main-app').style.display = 'flex';
    
    const rect = chartContainer.getBoundingClientRect();
    if (rect.width > 0 && rect.height > 0) {
        chart.resize(rect.width, rect.height);
    }
    
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
    if (currentUser) {
        document.getElementById('login-screen').style.display = 'none';
        document.getElementById('main-app').style.display = 'flex';
        
        loadWatchlistForUser();
        renderWatchlistUI();

        loadPortfolioForUser();
        renderPortfolioUI();
    }
}

// --- 2. INITIALIZE CHART CORE ---
const chartContainer = document.getElementById('chart-container');
const chart = LightweightCharts.createChart(chartContainer, {
    layout: { textColor: '#d1d4dc', background: { type: 'solid', color: '#121212' } },
    grid: { vertLines: { color: '#2b2b43' }, horzLines: { color: '#2b2b43' } },
    timeScale: { borderColor: '#2b2b43', timeVisible: true, secondsVisible: false }
});

new ResizeObserver(entries => {
    if (entries.length === 0 || entries[0].target !== chartContainer) { return; }
    const newRect = entries[0].contentRect;
    if (newRect.width > 0 && newRect.height > 0) {
        chart.resize(newRect.width, newRect.height);
    }
}).observe(chartContainer);

const candleSeries = chart.addCandlestickSeries({
    upColor: '#26a69a', downColor: '#ef5350', borderVisible: false, 
    wickUpColor: '#26a69a', wickDownColor: '#ef5350'
});

const volumeSeries = chart.addHistogramSeries({ priceFormat: { type: 'volume' }, priceScaleId: '' });
candleSeries.priceScale().applyOptions({ scaleMargins: { top: 0.1, bottom: 0.25 } });
volumeSeries.priceScale().applyOptions({ scaleMargins: { top: 0.8, bottom: 0 } });

// --- 3. HEIKIN ASHI MATHEMATICAL ALGORITHM ---
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

// --- 5. VISUAL RENDERING PLATFORM ---
function renderChart() {
    if (cachedStandardData.length === 0) return;
    const selectedType = document.getElementById('chart-type').value;
    
    if (selectedType === 'heikin-ashi') {
        candleSeries.setData(calculateHeikinAshi(cachedStandardData));
    } else {
        candleSeries.setData(cachedStandardData);
    }

    let volumeData = cachedStandardData.map(current => ({
        time: current.time, value: current.volume,
        color: current.close >= current.open ? 'rgba(38, 166, 154, 0.4)' : 'rgba(239, 83, 80, 0.4)'
    }));
    volumeSeries.setData(volumeData);
    updateInfoBar(null, null, null);
}

// --- 6. CHART DATA STREAMING & MTF FRAMEWORK ---
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
        const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(`https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=${config.id}&range=${config.range}`)}`;
        try {
            const res = await fetch(proxyUrl);
            const data = await res.json();
            const result = data.chart.result[0];
            const quotes = result.indicators.quote[0];
            
            let stdData = [];
            for (let i = 0; i < result.timestamp.length; i++) {
                if (quotes.open[i] !== null) {
                    stdData.push({ time: result.timestamp[i], open: quotes.open[i], high: quotes.high[i], low: quotes.low[i], close: quotes.close[i] });
                }
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
    if (!rawInput) { return showAppAlert("Input Error", "Please enter a stock ticker first!"); }

    let ticker = rawInput.replace('.JK', '');
    let symbol = rawInput.endsWith('.JK') ? rawInput : rawInput + '.JK';
    
    // UX Feedback
    inputElement.value = 'Loading...';
    searchBtn.disabled = true;

    const timeframeVal = document.getElementById('timeframe-select').value;
    const [interval, range] = timeframeVal.split('|');
    const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(`https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=${interval}&range=${range}`)}`;

    try {
        const response = await fetch(proxyUrl);
        const data = await response.json();
        
        // REAL-TIME API REJECTION LOGIC
        if (!data.chart || !data.chart.result || data.chart.error) { 
            inputElement.value = rawInput; 
            searchBtn.disabled = false;
            return showAppAlert("Invalid Stock", `Yahoo Finance could not find market data for '${ticker}'. Please check the ticker name.`); 
        }

        const result = data.chart.result[0];
        const timestamps = result.timestamp;
        const quotes = result.indicators.quote[0];
        
        if (!timestamps) { 
            inputElement.value = rawInput; 
            searchBtn.disabled = false;
            return showAppAlert("Data Error", `No historical data found for ${symbol} on this timeframe.`); 
        }

        // If we made it here, the stock is completely VALID. Load the chart!
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
        renderChart(); 
        chart.timeScale().fitContent(); 
        
        inputElement.value = ticker; 
        inputElement.blur();
        searchBtn.disabled = false;
        
    } catch (error) { 
        inputElement.value = rawInput; 
        searchBtn.disabled = false;
        showAppAlert("Network Error", "Unable to connect to the market API."); 
    }
}

// --- 7. ACCOUNT SPECIFIC WATCHLIST PLATFORM ---
let myWatchlist = [];

function loadWatchlistForUser() {
    const savedData = localStorage.getItem(`idx_watchlist_${currentUser}`);
    myWatchlist = savedData ? JSON.parse(savedData) : [];
    document.getElementById('current-user-display').textContent = currentUser;
}

function saveWatchlist() { 
    localStorage.setItem(`idx_watchlist_${currentUser}`, JSON.stringify(myWatchlist)); 
}

async function fetchWatchlistMTF() {
    const activeUserAtStart = currentUser;
    for (const ticker of myWatchlist) {
        if (currentUser !== activeUserAtStart) break; 
        const symbol = ticker + '.JK';
        const timeframes = [{ id: '1wk', range: '3mo', elId: `wl-w-${ticker}` }, { id: '1h', range: '1mo', elId: `wl-h-${ticker}` }];

        for (const config of timeframes) {
            const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(`https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=${config.id}&range=${config.range}`)}`;
            try {
                const res = await fetch(proxyUrl);
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

    if (myWatchlist.length === 0) {
        ul.innerHTML = '<div style="text-align: center; color: #888; padding: 20px;">Watchlist is empty. Add some tickers below!</div>'; return;
    }

    const results = [];
    for (const ticker of myWatchlist) {
        const symbol = ticker + '.JK';
        const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(`https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1d&range=1mo`)}`;
        try {
            const response = await fetch(proxyUrl);
            const data = await response.json();
            const result = data.chart.result[0];
            const quotes = result.indicators.quote[0];
            let stdData = [];
            for (let i = 0; i < result.timestamp.length; i++) {
                if (quotes.open[i] !== null) stdData.push({ time: result.timestamp[i], open: quotes.open[i], high: quotes.high[i], low: quotes.low[i], close: quotes.close[i] });
            }
            const currentPrice = result.meta.regularMarketPrice;
            let prevClose = stdData.length > 1 ? stdData[stdData.length - 2].close : currentPrice;
            const change = currentPrice - prevClose;
            const haData = calculateHeikinAshi(stdData);
            const isHAUp = haData[haData.length - 1].close >= haData[haData.length - 1].open;
            results.push({ ticker, currentPrice, change, changePct: (change / prevClose) * 100, isHAUp, error: false });
        } catch (e) { 
            results.push({ ticker, error: true }); 
        }
        await new Promise(resolve => setTimeout(resolve, 200));
    }

    ul.innerHTML = '';
    results.forEach((item, index) => {
        const li = document.createElement('li'); li.className = 'stock-item';
        li.onclick = () => { fetchStockData(item.ticker); document.querySelector('[data-target="chart-view"]').click(); };

        if (item.error) {
            li.innerHTML = `<span style="color:#ef5350;">Failed to load data for ${item.ticker}</span><button class="delete-btn">×</button>`;
        } else {
            const avatarLetters = item.ticker.substring(0, 2);
            const changeSign = item.change >= 0 ? '+' : '';
            const colorClass = item.change >= 0 ? 'text-green' : 'text-red';
            
            li.innerHTML = `
                <div class="wl-left">
                    <div class="wl-avatar">${avatarLetters}</div>
                    <div class="wl-ticker-info">
                        <div style="display:flex; align-items:center; gap:10px;">
                            <span class="wl-ticker-name">${item.ticker}</span>
                            <span class="ha-badge ${item.isHAUp ? 'up' : 'down'}">${item.isHAUp ? 'DAILY HA: BULLISH' : 'DAILY HA: BEARISH'}</span>
                        </div>
                        <div class="wl-mtf">
                            <span id="wl-w-${item.ticker}">W: ⏳</span>
                            <span>D: ${item.isHAUp ? '🟢' : '🔴'}</span>
                            <span id="wl-h-${item.ticker}">H: ⏳</span>
                        </div>
                    </div>
                </div>
                <div class="wl-right">
                    <div class="wl-price-info">
                        <span class="wl-price">${item.currentPrice.toLocaleString('en-US')}</span>
                        <span class="wl-change ${colorClass}">${changeSign}${item.change.toFixed(0)} (${changeSign}${item.changePct.toFixed(2)}%)</span>
                    </div>
                    <button class="add-port-btn" title="Add to Portfolio">+</button>
                    <button class="delete-btn" title="Remove from Watchlist">×</button>
                </div>
            `;
        }
        
        const addPortBtn = li.querySelector('.add-port-btn');
        if (addPortBtn) {
            addPortBtn.onclick = (e) => {
                e.stopPropagation(); 
                document.getElementById('new-portfolio-ticker').value = item.ticker;
                document.getElementById('new-portfolio-price').value = '';
                document.getElementById('new-portfolio-shares').value = '';
                document.getElementById('portfolio-modal').style.display = 'flex';
            };
        }

        li.querySelector('.delete-btn').onclick = (e) => { e.stopPropagation(); myWatchlist.splice(index, 1); saveWatchlist(); renderWatchlistUI(); };
        ul.appendChild(li);
    });
    fetchWatchlistMTF();
}

// UPGRADED: Real-time API Validation before adding
async function addWatchlistItem() {
    const input = document.getElementById('new-watchlist-item');
    const btn = document.getElementById('add-watchlist-btn');
    
    let ticker = input.value.trim().toUpperCase().replace('.JK', ''); 
    if (!ticker) return;

    if (myWatchlist.includes(ticker)) {
        return showAppAlert("Duplicate", `${ticker} is already in your watchlist.`);
    }

    // UX Feedback
    btn.textContent = "Verifying...";
    btn.disabled = true;

    const symbol = ticker + '.JK';
    const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(`https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1d&range=1d`)}`;

    try {
        const response = await fetch(proxyUrl);
        const data = await response.json();
        
        // REAL-TIME API REJECTION
        if (!data.chart || data.chart.error || !data.chart.result) {
            btn.textContent = "Add to List"; btn.disabled = false;
            return showAppAlert("Invalid Stock", `The ticker '${ticker}' could not be verified on the live market.`);
        }

        // Successfully Validated!
        myWatchlist.push(ticker); 
        input.value = ''; 
        btn.textContent = "Add to List"; btn.disabled = false;
        
        saveWatchlist(); 
        renderWatchlistUI();

    } catch (error) {
        btn.textContent = "Add to List"; btn.disabled = false;
        showAppAlert("Network Error", "Unable to connect to the market API to verify stock.");
    }
}


// --- 8. PORTFOLIO HOLDINGS MODULE ---
let myPortfolio = [];

function loadPortfolioForUser() {
    const savedData = localStorage.getItem(`idx_portfolio_${currentUser}`);
    myPortfolio = savedData ? JSON.parse(savedData) : [];
}

function savePortfolio() {
    localStorage.setItem(`idx_portfolio_${currentUser}`, JSON.stringify(myPortfolio));
}

// UPGRADED: Real-time API Validation before adding
async function addPortfolioItem() {
    const tickerInp = document.getElementById('new-portfolio-ticker');
    const priceInp = document.getElementById('new-portfolio-price');
    const sharesInp = document.getElementById('new-portfolio-shares');
    const btn = document.getElementById('add-portfolio-btn');

    let ticker = tickerInp.value.trim().toUpperCase().replace('.JK', ''); 
    let avgPrice = parseFloat(priceInp.value);
    let lots = parseFloat(sharesInp.value) || 1; 

    if (!ticker || isNaN(avgPrice) || avgPrice <= 0) {
        return showAppAlert("Input Error", "Please enter a valid stock ticker and an average purchase price.");
    }

    // UX Feedback
    btn.textContent = "Verifying Ticker...";
    btn.disabled = true;

    const symbol = ticker + '.JK';
    const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(`https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1d&range=1d`)}`;

    try {
        const response = await fetch(proxyUrl);
        const data = await response.json();
        
        // REAL-TIME API REJECTION
        if (!data.chart || data.chart.error || !data.chart.result) {
            btn.textContent = "Save Position"; btn.disabled = false;
            return showAppAlert("Invalid Stock", `The ticker '${ticker}' could not be verified on the live market.`);
        }

        // Successfully Validated!
        const existingIdx = myPortfolio.findIndex(p => p.ticker === ticker);
        if (existingIdx >= 0) {
            myPortfolio[existingIdx].avgPrice = avgPrice;
            myPortfolio[existingIdx].lots = lots;
        } else {
            myPortfolio.push({ ticker, avgPrice, lots });
        }
        
        tickerInp.value = ''; priceInp.value = ''; sharesInp.value = '';
        btn.textContent = "Save Position"; btn.disabled = false;
        
        savePortfolio();
        renderPortfolioUI();
        document.getElementById('portfolio-modal').style.display = 'none';

    } catch (error) {
        btn.textContent = "Save Position"; btn.disabled = false;
        showAppAlert("Network Error", "Unable to connect to the market API to verify stock.");
    }
}

async function renderPortfolioUI() {
    const ul = document.getElementById('portfolio-ul');
    ul.innerHTML = '<div style="text-align: center; color: #888; padding: 20px;">Fetching portfolio data...</div>';

    if (myPortfolio.length === 0) {
        ul.innerHTML = '<div style="text-align: center; color: #888; padding: 20px;">Your portfolio is empty. Add your holdings above!</div>'; return;
    }

    const results = [];
    for (const item of myPortfolio) {
        const symbol = item.ticker + '.JK';
        const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(`https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1d&range=1mo`)}`;
        try {
            const response = await fetch(proxyUrl);
            const data = await response.json();
            
            if (!data.chart || data.chart.error) {
                throw new Error("Invalid Ticker Data");
            }
            
            const result = data.chart.result[0];
            const quotes = result.indicators.quote[0];
            let stdData = [];
            
            for (let i = 0; i < result.timestamp.length; i++) {
                if (quotes.open[i] !== null) {
                    stdData.push({ time: result.timestamp[i], open: quotes.open[i], high: quotes.high[i], low: quotes.low[i], close: quotes.close[i] });
                }
            }

            const currentPrice = result.meta.regularMarketPrice;
            const haData = calculateHeikinAshi(stdData);
            
            const currentHA = haData[haData.length - 1];
            const isHAUp = currentHA.close >= currentHA.open;
            const last5HA = haData.slice(Math.max(haData.length - 5, 0));

            let warningBadge = '';
            const bodyLength = Math.abs(currentHA.close - currentHA.open);
            const totalLength = currentHA.high - currentHA.low;
            
            if (totalLength > 0 && bodyLength < (totalLength * 0.3)) {
                warningBadge = `<span class="ha-badge warning">⚠️ DOJI WARNING</span>`;
            } else if (!isHAUp) {
                warningBadge = `<span class="ha-badge down">⚠️ BEARISH</span>`;
            }

            let safeLots = item.lots || item.shares || 1; 
            const totalShares = safeLots * 100;
            const totalCost = item.avgPrice * totalShares;
            const currentValue = currentPrice * totalShares;
            const plAmount = currentValue - totalCost;
            const plPct = ((currentPrice - item.avgPrice) / item.avgPrice) * 100;

            results.push({ ...item, currentPrice, plAmount, plPct, isHAUp, last5HA, warningBadge, safeLots, error: false });
        } catch (e) {
            results.push({ ...item, error: true });
        }
        await new Promise(resolve => setTimeout(resolve, 200));
    }

    ul.innerHTML = '';
    results.forEach((item, index) => {
        const li = document.createElement('li');
        li.className = 'stock-item';
        li.onclick = () => { fetchStockData(item.ticker); document.querySelector('[data-target="chart-view"]').click(); };

        if (item.error) {
            li.innerHTML = `<span style="color:#ef5350;">Failed to load data for ${item.ticker} (Check Ticker Name)</span><button class="delete-btn">×</button>`;
        } else {
            const avatarLetters = item.ticker.substring(0, 2);
            const sign = item.plAmount >= 0 ? '+' : '';
            const colorClass = item.plAmount >= 0 ? 'text-green' : 'text-red';

            let miniChartHTML = '<div class="ha-5day-window" title="Last 5 Days HA Trend">';
            item.last5HA.forEach(candle => {
                const isUp = candle.close >= candle.open;
                miniChartHTML += `<div class="mini-candle ${isUp ? 'up' : 'down'}"></div>`;
            });
            miniChartHTML += '</div>';

            li.innerHTML = `
                <div class="wl-left">
                    <div class="wl-avatar">${avatarLetters}</div>
                    <div class="wl-ticker-info">
                        <div style="display:flex; align-items:center; gap:10px;">
                            <span class="wl-ticker-name">${item.ticker}</span>
                            ${item.warningBadge}
                        </div>
                        <div class="wl-mtf" style="background: none; border: none; padding: 0; display: flex; align-items: center; gap: 10px;">
                            <span style="color: #888;">Avg: ${item.avgPrice.toLocaleString('en-US')} | Lots: ${item.safeLots}</span>
                            ${miniChartHTML}
                        </div>
                    </div>
                </div>
                <div class="wl-right">
                    <div class="wl-price-info">
                        <span class="wl-price">${item.currentPrice.toLocaleString('en-US')}</span>
                        <span class="wl-change ${colorClass}">${sign}${item.plAmount.toLocaleString('en-US', {maximumFractionDigits: 0})} (${sign}${item.plPct.toFixed(2)}%)</span>
                    </div>
                    <button class="delete-btn">×</button>
                </div>
            `;
        }
        
        li.querySelector('.delete-btn').onclick = (e) => { 
            e.stopPropagation(); 
            myPortfolio.splice(index, 1); 
            savePortfolio(); 
            renderPortfolioUI(); 
        };
        ul.appendChild(li);
    });
}


// --- 9. HEIKIN ASHI SCREENER ENGINE ---
async function runScreener() {
    const ul = document.getElementById('screener-ul');
    const statusText = document.getElementById('screener-status');
    const strategy = document.getElementById('screener-strategy').value; 
    
    ul.innerHTML = ''; 
    statusText.style.color = "#d1d4dc";
    let matchedStocks = []; 
    
    const microBatchSize = 5; 
    
    for (let i = 0; i < IDX_TOP_STOCKS.length; i += microBatchSize) {
        const batch = IDX_TOP_STOCKS.slice(i, i + microBatchSize);
        statusText.textContent = `Scanning Mega-Universe... Safe Progress: ${i} / ${IDX_TOP_STOCKS.length} tickers`;

        const batchPromises = batch.map(async (ticker) => {
            const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(`https://query1.finance.yahoo.com/v8/finance/chart/${ticker}.JK?interval=1d&range=2mo`)}`;
            try {
                const response = await fetch(proxyUrl); 
                const data = await response.json();
                
                if (!data.chart || !data.chart.result) return;
                
                const result = data.chart.result[0]; 
                const timestamps = result.timestamp;
                const quotes = result.indicators.quote[0]; 
                let stdData = [];

                if (!timestamps || !quotes) return;

                for (let j = 0; j < timestamps.length; j++) {
                    if (quotes.open[j] !== null && quotes.high[j] !== null && quotes.low[j] !== null && quotes.close[j] !== null) {
                        stdData.push({ 
                            time: timestamps[j], 
                            open: quotes.open[j], 
                            high: quotes.high[j], 
                            low: quotes.low[j], 
                            close: quotes.close[j], 
                            volume: quotes.volume[j] || 0 
                        });
                    }
                }
                if (stdData.length < 10) return; 

                const haData = calculateHeikinAshi(stdData);
                const currentHA = haData[haData.length - 1];
                
                let bearishStreak = 0;
                for (let k = haData.length - 2; k >= 0; k--) {
                    if (haData[k].close < haData[k].open) { bearishStreak++; } else { break; }
                }

                if (bearishStreak >= 2) {
                    const currentPrice = result.meta.regularMarketPrice || currentHA.close;
                    const tradingValue = currentPrice * stdData[stdData.length - 1].volume;
                    let matchFound = false;

                    if (strategy === 'reversal' && currentHA.close > currentHA.open) matchFound = true;
                    else if (strategy === 'doji') {
                        const body = Math.abs(currentHA.close - currentHA.open);
                        const upperWick = currentHA.high - Math.max(currentHA.open, currentHA.close);
                        const lowerWick = Math.min(currentHA.open, currentHA.close) - currentHA.low;
                        const calcLen = currentHA.high - currentHA.low;
                        
                        if (calcLen > 0 && body < (calcLen * 0.3) && upperWick > body && lowerWick > body) matchFound = true;
                    }

                    if (matchFound) matchedStocks.push({ ticker, price: currentPrice, tradeValue: tradingValue, streak: bearishStreak });
                }
            } catch (e) { 
                // Skip gracefully
            }
        });

        await Promise.all(batchPromises);
        await new Promise(resolve => setTimeout(resolve, 400)); 
    }

    matchedStocks.sort((a, b) => b.streak !== a.streak ? b.streak - a.streak : b.tradeValue - a.tradeValue);
    statusText.textContent = `Scan complete. Evaluated ${IDX_TOP_STOCKS.length} tickers. Found ${matchedStocks.length} structural setups.`;

    if (matchedStocks.length === 0) {
        ul.innerHTML = '<div style="text-align: center; color: #888; padding: 20px;">No stocks matching this strategy today.</div>'; return;
    }

    matchedStocks.forEach(item => {
        const li = document.createElement('li'); li.className = 'stock-item';
        li.onclick = () => { fetchStockData(item.ticker); document.querySelector('[data-target="chart-view"]').click(); };

        li.innerHTML = `
            <div class="wl-left">
                <div class="wl-avatar">${item.ticker.substring(0, 2)}</div>
                <div class="wl-ticker-info">
                    <span class="wl-ticker-name">${item.ticker}</span>
                    <span class="ha-badge ${strategy === 'reversal' ? 'up' : 'neutral'}">${strategy === 'reversal' ? `REVERSED A ${item.streak}-DAY RED TREND` : `BOTTOM DOJI AFTER ${item.streak}-DAY DROP`}</span>
                </div>
            </div>
            <div class="wl-right">
                <div class="wl-price-info">
                    <span class="wl-price">${item.price.toLocaleString('en-US')}</span>
                    <span class="wl-change text-green">Matched Scan</span>
                </div>
            </div>
        `;
        ul.appendChild(li);
    });
}

// --- 10. MODULE TERMINAL REGISTRATION LISTENERS ---
document.getElementById('stock-input').addEventListener('focus', function() { this.select(); });
document.getElementById('search-btn').addEventListener('click', () => fetchStockData());
document.getElementById('stock-input').addEventListener('keypress', (e) => { if (e.key === 'Enter') fetchStockData(); });
document.getElementById('chart-type').addEventListener('change', renderChart);
document.getElementById('timeframe-select').addEventListener('change', () => fetchStockData());

// Custom Portfolio Modal Controls
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

document.getElementById('run-screener-btn').addEventListener('click', runScreener);

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

verifyBootSession();
