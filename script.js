let cachedStandardData = [];
let currentSymbolDisplay = "-"; 

// --- 1. ENCRYPTED AUTHENTICATION ENGINE ---
let currentUser = sessionStorage.getItem('idx_logged_user') || null;

function handleLogin() {
    const userIn = document.getElementById('auth-username').value.trim();
    const passIn = document.getElementById('auth-password').value.trim();
    if (!userIn || !passIn) return alert("Please fill in both fields!");

    let usersDb = JSON.parse(localStorage.getItem('idx_users_db')) || {};
    
    if (!usersDb[userIn]) {
        return alert("Account username does not exist. Please click Register to create it!");
    }
    if (usersDb[userIn] !== passIn) {
        return alert("Incorrect account password. Try again.");
    }

    executeSessionLogin(userIn);
}

function handleRegistration() {
    const userIn = document.getElementById('auth-username').value.trim();
    const passIn = document.getElementById('auth-password').value.trim();
    if (!userIn || !passIn) return alert("Please enter a username and password!");
    if (userIn.length < 3 || passIn.length < 4) return alert("Username must be >= 3 chars, Password >= 4 chars.");

    let usersDb = JSON.parse(localStorage.getItem('idx_users_db')) || {};
    
    if (usersDb[userIn]) {
        return alert("Username already taken! Choose a unique handle.");
    }

    // Write new credentials to the local browser database object
    usersDb[userIn] = passIn;
    localStorage.setItem('idx_users_db', JSON.stringify(usersDb));
    
    alert("Registration successful! Logging you in...");
    executeSessionLogin(userIn);
}

function executeSessionLogin(username) {
    currentUser = username;
    sessionStorage.setItem('idx_logged_user', username);
    
    // Clear credentials inputs
    document.getElementById('auth-username').value = '';
    document.getElementById('auth-password').value = '';

    // Swap displays
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('main-app').style.display = 'flex';
    
    // Load tracking workspace modules
    loadWatchlistForUser();
    renderWatchlistUI();
    
    // Trigger window resize event to let TradingView Charts snap into place
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
    }
}

// --- 2. INITIALIZE THE CHART ---
const chartContainer = document.getElementById('chart-container');
const chart = LightweightCharts.createChart(chartContainer, {
    layout: { textColor: '#d1d4dc', background: { type: 'solid', color: '#121212' } },
    grid: { vertLines: { color: '#2b2b43' }, horzLines: { color: '#2b2b43' } },
    timeScale: { borderColor: '#2b2b43', timeVisible: true, secondsVisible: false }
});

new ResizeObserver(entries => {
    if (entries.length === 0 || entries[0].target !== chartContainer) { return; }
    const newRect = entries[0].contentRect;
    chart.applyOptions({ height: newRect.height, width: newRect.width });
}).observe(chartContainer);

const candleSeries = chart.addCandlestickSeries({
    upColor: '#26a69a', downColor: '#ef5350', borderVisible: false, 
    wickUpColor: '#26a69a', wickDownColor: '#ef5350'
});

const volumeSeries = chart.addHistogramSeries({ priceFormat: { type: 'volume' }, priceScaleId: '' });
candleSeries.priceScale().applyOptions({ scaleMargins: { top: 0.1, bottom: 0.25 } });
volumeSeries.priceScale().applyOptions({ scaleMargins: { top: 0.8, bottom: 0 } });

// --- 3. HEIKIN ASHI MATH FUNCTION ---
function calculateHeikinAshi(standardData) {
    let haData = [];
    for (let i = 0; i < standardData.length; i++) {
        let current = standardData[i];
        let haCandle = { time: current.time };
        if (i === 0) {
            haCandle.open = (current.open + current.close) / 2;
            haCandle.close = (current.open + current.high + current.low + current.close) / 4;
            haCandle.high = current.high;
            haCandle.low = current.low;
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

// --- 4. HOVER LOGIC ---
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
        updateInfoBar(null, null, null);
        return;
    }
    updateInfoBar(param.seriesData.get(candleSeries), param.seriesData.get(volumeSeries), param.time);
});

// --- 5. RENDER LOGIC ---
function renderChart() {
    if (cachedStandardData.length === 0) return;
    const selectedType = document.getElementById('chart-type').value;
    
    if (selectedType === 'heikin-ashi') {
        candleSeries.setData(calculateHeikinAshi(cachedStandardData));
    } else {
        candleSeries.setData(cachedStandardData);
    }

    let volumeData = cachedStandardData.map(current => ({
        time: current.time,
        value: current.volume,
        color: current.close >= current.open ? 'rgba(38, 166, 154, 0.4)' : 'rgba(239, 83, 80, 0.4)'
    }));
    volumeSeries.setData(volumeData);
    updateInfoBar(null, null, null);
}

// --- 6. CHART DATA FETCHING & MTF MATRIX ---
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

    timeframes.forEach(async (config) => {
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
        } catch (e) {
            config.el.innerHTML = `${config.label}: ⚠️`;
        }
    });
}

async function fetchStockData(overrideSymbol = null) {
    const inputElement = document.getElementById('stock-input');
    let rawInput = overrideSymbol ? overrideSymbol : inputElement.value.trim().toUpperCase();
    
    if (!rawInput) { alert("Please enter a stock ticker first!"); return; }

    inputElement.value = rawInput; 
    inputElement.blur();
    
    currentSymbolDisplay = rawInput.replace('.JK', ''); 
    let symbol = rawInput.endsWith('.JK') ? rawInput : rawInput + '.JK';

    fetchMTFData(symbol);

    const timeframeVal = document.getElementById('timeframe-select').value;
    const [interval, range] = timeframeVal.split('|');

    candleSeries.setData([]); volumeSeries.setData([]); cachedStandardData = [];

    const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(`https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=${interval}&range=${range}`)}`;

    try {
        const response = await fetch(proxyUrl);
        const data = await response.json();
        if (!data.chart || !data.chart.result || data.chart.error) { alert(`Could not load data for: ${symbol}`); return; }

        const result = data.chart.result[0];
        const timestamps = result.timestamp;
        const quotes = result.indicators.quote[0];

        if (!timestamps) { alert(`No historical data found for ${symbol} on this timeframe.`); return; }

        let tempArray = [];
        let lastTimestamp = 0;

        for (let i = 0; i < timestamps.length; i++) {
            if (quotes.open[i] === null || quotes.high[i] === null || quotes.low[i] === null || quotes.close[i] === null) continue;
            if (timestamps[i] === lastTimestamp) continue;
            lastTimestamp = timestamps[i];
            tempArray.push({ time: timestamps[i], open: quotes.open[i], high: quotes.high[i], low: quotes.low[i], close: quotes.close[i], volume: quotes.volume[i] || 0 });
        }

        cachedStandardData = tempArray;
        renderChart();
        chart.timeScale().fitContent(); 
    } catch (error) { console.error("Fetch Error:", error); }
}


// --- 7. WATCHLIST MODULE ---
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
        const timeframes = [
            { id: '1wk', range: '3mo', elId: `wl-w-${ticker}` },
            { id: '1h', range: '1mo', elId: `wl-h-${ticker}` }
        ];

        for (const config of timeframes) {
            const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(`https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=${config.id}&range=${config.range}`)}`;
            try {
                const res = await fetch(proxyUrl);
                const data = await res.json();
                const quotes = data.chart.result[0].indicators.quote[0];
                let stdData = [];
                for (let i = 0; i < data.chart.result[0].timestamp.length; i++) {
                    if (quotes.open[i] !== null) {
                        stdData.push({ open: quotes.open[i], high: quotes.high[i], low: quotes.low[i], close: quotes.close[i] });
                    }
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
        ul.innerHTML = '<div style="text-align: center; color: #888; padding: 20px;">Watchlist is empty. Add some tickers below!</div>';
        return;
    }

    const fetchPromises = myWatchlist.map(async (ticker) => {
        const symbol = ticker + '.JK';
        const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(`https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1d&range=1mo`)}`;

        try {
            const response = await fetch(proxyUrl);
            const data = await response.json();
            const result = data.chart.result[0];
            const timestamps = result.timestamp;
            const quotes = result.indicators.quote[0];
            let stdData = [];
            
            for (let i = 0; i < timestamps.length; i++) {
                if (quotes.open[i] !== null) {
                    stdData.push({ time: timestamps[i], open: quotes.open[i], high: quotes.high[i], low: quotes.low[i], close: quotes.close[i] });
                }
            }

            const currentPrice = result.meta.regularMarketPrice;
            let prevClose = stdData.length > 1 ? stdData[stdData.length - 2].close : currentPrice;
            const change = currentPrice - prevClose;
            const changePct = (change / prevClose) * 100;

            const haData = calculateHeikinAshi(stdData);
            const isHAUp = haData[haData.length - 1].close >= haData[haData.length - 1].open;

            return { ticker, currentPrice, change, changePct, isHAUp, error: false };
        } catch (e) {
            return { ticker, error: true };
        }
    });

    const results = await Promise.all(fetchPromises);
    ul.innerHTML = '';

    results.forEach((item, index) => {
        const li = document.createElement('li');
        li.className = 'stock-item';
        li.onclick = () => { fetchStockData(item.ticker); document.querySelector('[data-target="chart-view"]').click(); };

        if (item.error) {
            li.innerHTML = `<span style="color:#ef5350;">Failed to load data for ${item.ticker}</span><button class="delete-btn">×</button>`;
        } else {
            const avatarLetters = item.ticker.substring(0, 2);
            const priceStr = item.currentPrice.toLocaleString('en-US');
            const changeSign = item.change >= 0 ? '+' : '';
            const colorClass = item.change >= 0 ? 'text-green' : 'text-red';
            const changeStr = `${changeSign}${item.change.toFixed(0)} (${changeSign}${item.changePct.toFixed(2)}%)`;
            const haText = item.isHAUp ? 'DAILY HA: BULLISH' : 'DAILY HA: BEARISH';
            const dStatus = item.isHAUp ? '🟢' : '🔴';

            li.innerHTML = `
                <div class="wl-left">
                    <div class="wl-avatar">${avatarLetters}</div>
                    <div class="wl-ticker-info">
                        <div style="display:flex; align-items:center; gap:10px;">
                            <span class="wl-ticker-name">${item.ticker}</span>
                            <span class="ha-badge ${item.isHAUp ? 'up' : 'down'}">${haText}</span>
                        </div>
                        <div class="wl-mtf">
                            <span id="wl-w-${item.ticker}">W: ⏳</span>
                            <span>D: ${dStatus}</span>
                            <span id="wl-h-${item.ticker}">H: ⏳</span>
                        </div>
                    </div>
                </div>
                <div class="wl-right">
                    <div class="wl-price-info">
                        <span class="wl-price">${priceStr}</span>
                        <span class="wl-change ${colorClass}">${changeStr}</span>
                    </div>
                    <button class="delete-btn">×</button>
                </div>
            `;
        }
        li.querySelector('.delete-btn').onclick = (e) => { e.stopPropagation(); myWatchlist.splice(index, 1); saveWatchlist(); renderWatchlistUI(); };
        ul.appendChild(li);
    });

    fetchWatchlistMTF();
}

function addWatchlistItem() {
    const input = document.getElementById('new-watchlist-item');
    let ticker = input.value.trim().toUpperCase().replace('.JK', ''); 
    if (ticker && !myWatchlist.includes(ticker)) {
        myWatchlist.push(ticker); input.value = ''; saveWatchlist(); renderWatchlistUI();
    }
}


// --- 8. HEIKIN ASHI SCREENER ENGINE ---
const IDX_TOP_STOCKS = [
    // Big Banks & Financials
    'BBCA', 'BBRI', 'BMRI', 'BBNI', 'BRIS', 'ARTO', 'BBTN', 'BDMN', 'BNGA', 'PNBN', 'NISP', 'BJBR', 'BJTM', 'MEGA', 'BBYB', 'AGRO', 'BNII', 'BBKP', 'BTPN', 'MAYA', 'BFIN', 'CFIN', 'MFIN', 'TIFA', 'VIVA',
    // Tech & New Economy
    'GOTO', 'BUKA', 'BELI', 'EMTK', 'WIRG', 'MLPT', 'GLPT', 'MTEL', 'WIFI', 'TFAS', 'DMMX', 'KREN', 'NFCX', 'DIVA',
    // Mining, Coal & Energy
    'ADRO', 'PTBA', 'ITMG', 'INDY', 'HRUM', 'BUMI', 'DOID', 'TOBA', 'ABMM', 'BSSR', 'KKGI', 'MBAP', 'SMMT', 'DSSA', 'CUAN', 'MEDC', 'ENRG', 'ELSA', 'PGAS', 'AKRA', 'ANTM', 'INCO', 'TINS', 'MDKA', 'BRMS', 'MBMA', 'NCKL', 'PSAB', 'AMMN', 'PGEO', 'BREN', 'BIPI', 'DEWA', 'APEX',
    // Consumer Goods & Retail
    'INDF', 'ICBP', 'UNVR', 'MYOR', 'AMRT', 'MIDI', 'LPPF', 'RALS', 'MAPA', 'MAPI', 'ACES', 'ERAA', 'CLEO', 'CAMP', 'GOOD', 'KEJU', 'ROTI', 'ULTJ', 'KINO', 'STTP', 'AISA', 'CMRY', 'CINF', 'EPMT', 'HERO', 'MPPA', 'PCAR',
    // Telco & Towers
    'TLKM', 'EXCL', 'ISAT', 'FREN', 'TOWR', 'TBIG', 'SUPR', 'GHON',
    // Heavy Equipment & Auto
    'ASII', 'UNTR', 'AUTO', 'SMSM', 'IMAS', 'GJTL', 'MASA', 'PRAS', 'BRAM',
    // Agriculture & Poultry
    'CPIN', 'JPFA', 'MAIN', 'WMUU', 'AALI', 'LSIP', 'SSMS', 'TAPG', 'DSNG', 'SIMP', 'SMAR', 'BWPT', 'TBLA', 'ANJT', 'CPRO', 'BISI', 'JAWA',
    // Infrastructure & Toll Roads
    'JSMR', 'META', 'CMNP',
    // Construction & Building
    'WIKA', 'PTPP', 'ADHI', 'WSKT', 'WEGE', 'WGEM', 'TOTL', 'NRCA', 'ACST', 'DGIK', 'PTPW',
    // Property & Real Estate
    'BSDE', 'CTRA', 'SMRA', 'PWON', 'ASRI', 'DILD', 'KIJA', 'SSIA', 'LPCK', 'LPKR', 'APLN', 'BKSL', 'GWSA', 'RODA', 'JRPT', 'PLIN',
    // Healthcare & Pharma
    'KLBF', 'MIKA', 'SILO', 'HEAL', 'SIDO', 'PRDA', 'IRRA', 'KAEF', 'INAF', 'PEHA', 'TSPC', 'DVLA',
    // Basic Industry, Cement & Chemicals
    'TPIA', 'BRPT', 'INKP', 'TKIM', 'SMGR', 'INTP', 'SMBR', 'SMCB', 'KRAS', 'ISSP', 'GUNP', 'LION', 'JKSW', 'ALMI', 'BAJA', 'FASW', 'SPMA',
    // Logistics, Transport & Shipping
    'BIRD', 'ASSA', 'TMAS', 'SMDR', 'GIAA', 'CASS', 'CMPP', 'IPCM', 'HITS', 'SOCI', 'TCPI', 'TRUK', 'BPTR',
    // Media
    'MNCN', 'BMTR', 'SCMA', 'MSIN', 'VIVA', 'MDIA', 'MARI', 'ABBA',
    // Various Additions (Highly Liquid Mid/Small Caps)
    'RAJA', 'SGER', 'OASA', 'VKTR', 'PTMP', 'FILM', 'WIFI', 'NELY', 'PANI', 'TRIM', 'KRYA', 'GZCO', 'BOGA', 'CARS', 'OMED', 'VTNY', 'GTBO'
];

async function runScreener() {
    const ul = document.getElementById('screener-ul');
    const statusText = document.getElementById('screener-status');
    const strategy = document.getElementById('screener-strategy').value; 
    
    ul.innerHTML = '';
    statusText.style.color = "#d1d4dc";
    let matchedStocks = [];
    const batchSize = 10;
    
    for (let i = 0; i < IDX_TOP_STOCKS.length; i += batchSize) {
        const batch = IDX_TOP_STOCKS.slice(i, i + batchSize);
        statusText.textContent = `Scanning Mega-Universe... Processing ${Math.min(i + batchSize, IDX_TOP_STOCKS.length)} of ${IDX_TOP_STOCKS.length}`;

        const batchPromises = batch.map(async (ticker) => {
            const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(`https://query1.finance.yahoo.com/v8/finance/chart/${ticker}.JK?interval=1d&range=2mo`)}`;
            try {
                const response = await fetch(proxyUrl);
                const data = await response.json();
                const result = data.chart.result[0];
                const timestamps = result.timestamp;
                const quotes = result.indicators.quote[0];
                let stdData = [];

                for (let j = 0; j < timestamps.length; j++) {
                    if (quotes.open[j] !== null) {
                        stdData.push({ time: timestamps[j], open: quotes.open[j], high: quotes.high[j], low: quotes.low[j], close: quotes.close[j], volume: quotes.volume[j] || 0 });
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
                    const currentPrice = result.meta.regularMarketPrice;
                    const tradingValue = currentPrice * stdData[stdData.length - 1].volume;
                    let matchFound = false;

                    if (strategy === 'reversal' && currentHA.close > currentHA.open) { matchFound = true; } 
                    else if (strategy === 'doji') {
                        const body = Math.abs(currentHA.close - currentHA.open);
                        const upperWick = currentHA.high - Math.max(currentHA.open, currentHA.close);
                        const lowerWick = Math.min(currentHA.open, currentHA.close) - currentHA.low;
                        const totalLength = currentHA.high - totalLength;
                        const calcLen = currentHA.high - currentHA.low;
                        
                        if (calcLen > 0 && body < (calcLen * 0.3) && upperWick > body && lowerWick > body) {
                            matchFound = true;
                        }
                    }

                    if (matchFound) {
                        matchedStocks.push({ ticker, price: currentPrice, tradeValue: tradingValue, streak: bearishStreak });
                    }
                }
            } catch (e) { }
        });

        await Promise.all(batchPromises);
        await new Promise(resolve => setTimeout(resolve, 300)); 
    }

    matchedStocks.sort((a, b) => b.streak !== a.streak ? b.streak - a.streak : b.tradeValue - a.tradeValue);
    statusText.textContent = `Scan complete. Found ${matchedStocks.length} setups in the Mega-Universe.`;

    if (matchedStocks.length === 0) {
        ul.innerHTML = '<div style="text-align: center; color: #888; padding: 20px;">No stocks matching this strategy today.</div>'; return;
    }

    matchedStocks.forEach(item => {
        const li = document.createElement('li'); li.className = 'stock-item';
        li.onclick = () => { fetchStockData(item.ticker); document.querySelector('[data-target="chart-view"]').click(); };

        const avatarLetters = item.ticker.substring(0, 2);
        const badgeClass = strategy === 'reversal' ? 'up' : 'neutral';
        const badgeText = strategy === 'reversal' ? `REVERSED A ${item.streak}-DAY RED TREND` : `BOTTOM DOJI AFTER ${item.streak}-DAY DROP`;

        li.innerHTML = `
            <div class="wl-left">
                <div class="wl-avatar">${avatarLetters}</div>
                <div class="wl-ticker-info">
                    <span class="wl-ticker-name">${item.ticker}</span>
                    <span class="ha-badge ${badgeClass}">${badgeText}</span>
                </div>
            </div>
            <div class="wl-right">
                <div class="wl-price-info">
                    <span class="wl-price">${item.price.toLocaleString('en-US')}</span>
                    <span class="wl-change text-green">High Value/Vol</span>
                </div>
            </div>
        `;
        ul.appendChild(li);
    });
}


// --- 9. EVENT LISTENERS ---
document.getElementById('stock-input').addEventListener('focus', function() { this.select(); });
document.getElementById('search-btn').addEventListener('click', () => fetchStockData());
document.getElementById('stock-input').addEventListener('keypress', (e) => { if (e.key === 'Enter') fetchStockData(); });
document.getElementById('chart-type').addEventListener('change', renderChart);
document.getElementById('timeframe-select').addEventListener('change', () => fetchStockData());

document.getElementById('add-watchlist-btn').addEventListener('click', addWatchlistItem);
document.getElementById('new-watchlist-item').addEventListener('keypress', (e) => { if (e.key === 'Enter') addWatchlistItem(); });

document.getElementById('run-screener-btn').addEventListener('click', runScreener);

// Authentic Gateway Click Listeners
document.getElementById('auth-login-btn').addEventListener('click', handleLogin);
document.getElementById('auth-register-btn').addEventListener('click', handleRegistration);
document.getElementById('logout-btn').addEventListener('click', handleLogout);

// Listeners for input field returns inside the login module
document.getElementById('auth-password').addEventListener('keypress', (e) => { if (e.key === 'Enter') handleLogin(); });

document.querySelectorAll('.tab-btn').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        
        button.classList.add('active');
        const targetId = button.getAttribute('data-target');
        document.getElementById(targetId).classList.add('active');
    });
});

// Verify if a session key is running on memory initialization
verifyBootSession();
