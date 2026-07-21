let cachedStandardData = [];
let currentSymbolDisplay = "-"; 

// --- 0. GLOBAL IDX MASTER DATABASE ---
// IMPORTANT: Paste your full list of 900+ stocks here!
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
    if (!userIn || !passIn) return showAppAlert("Missing Info", "Please fill in both fields!");

    let usersDb = JSON.parse(localStorage.getItem('idx_users_db')) || {};
    if (!usersDb[userIn]) return showAppAlert("Account Not Found", "Account username does not exist.");
    if (usersDb[userIn] !== passIn) return showAppAlert("Invalid Login", "Incorrect account password.");
    
    executeSessionLogin(userIn);
}

function handleRegistration() {
    const userIn = document.getElementById('auth-username').value.trim();
    const passIn = document.getElementById('auth-password').value.trim();
    if (!userIn || !passIn) return showAppAlert("Missing Info", "Please enter a username and password!");
    if (userIn.length < 3 || passIn.length < 4) return showAppAlert("Invalid Format", "Username must be >= 3 chars, Password >= 4 chars.");

    let usersDb = JSON.parse(localStorage.getItem('idx_users_db')) || {};
    if (usersDb[userIn]) return showAppAlert("Username Taken", "Username already taken!");

    usersDb[userIn] = passIn;
    localStorage.setItem('idx_users_db', JSON.stringify(usersDb));
    showAppAlert("Success", "Registration successful! Logging you in...", false);
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

// Ichimoku Chart Series
const tenkanSeries = chart.addLineSeries({ color: '#2962FF', lineWidth: 1, title: 'Tenkan' });
const kijunSeries = chart.addLineSeries({ color: '#E53935', lineWidth: 1, title: 'Kijun' });
const spanASeries = chart.addLineSeries({ color: '#26a69a', lineWidth: 1, title: 'Span A' });
const spanBSeries = chart.addLineSeries({ color: '#ef5350', lineWidth: 1, title: 'Span B' });

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

// Supertrend Calculator (14-period, 3 multiplier)
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

// Parabolic SAR Calculator
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

// Ichimoku Cloud Calculator
function calculateIchimoku(data) {
    if (data.length < 52) return { tenkan: [], kijun: [], spanA: [], spanB: [] };
    let tenkan = [], kijun = [], spanA = [], spanB = [];

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
        if (tVal !== null && kVal !== null) spanA.push({ time: data[i].time, value: (tVal + kVal) / 2 });
        if (sBVal !== null) spanB.push({ time: data[i].time, value: sBVal });
    }
    return { tenkan, kijun, spanA, spanB };
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
    if (!rawInput) { return showAppAlert("Input Error", "Please enter a stock ticker first!"); }

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
            return showAppAlert("Invalid Stock", `Yahoo Finance could not find market data for '${ticker}'.`); 
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

    // Ichimoku Cloud Chart Rendering
    if (appSettings.ichimoku) {
        const ichi = calculateIchimoku(cachedStandardData);
        tenkanSeries.setData(ichi.tenkan);
        kijunSeries.setData(ichi.kijun);
        spanASeries.setData(ichi.spanA);
        spanBSeries.setData(ichi.spanB);
    } else {
        tenkanSeries.setData([]);
        kijunSeries.setData([]);
        spanASeries.setData([]);
        spanBSeries.setData([]);
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

    if (myWatchlist.includes(ticker)) return showAppAlert("Duplicate", `${ticker} is already in your watchlist.`);
    btn.textContent = "Verifying..."; btn.disabled = true;

    try {
        const response = await fetch(`https://corsproxy.io/?${encodeURIComponent(`https://query1.finance.yahoo.com/v8/finance/chart/${ticker}.JK?interval=1d&range=1d`)}`);
        const data = await response.json();
        
        if (!data.chart || data.chart.error || !data.chart.result) {
            btn.textContent = "Add to List"; btn.disabled = false;
            return showAppAlert("Invalid Stock", `The ticker '${ticker}' could not be verified on the live market.`);
        }
        myWatchlist.push(ticker); input.value = ''; btn.textContent = "Add to List"; btn.disabled = false;
        saveWatchlist(); renderWatchlistUI();
    } catch (error) {
        btn.textContent = "Add to List"; btn.disabled = false;
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

    if (!ticker || isNaN(avgPrice) || avgPrice <= 0) return showAppAlert("Input Error", "Please enter a valid stock ticker and an average purchase price.");
    btn.textContent = "Verifying Ticker..."; btn.disabled = true;

    try {
        const response = await fetch(`https://corsproxy.io/?${encodeURIComponent(`https://query1.finance.yahoo.com/v8/finance/chart/${ticker}.JK?interval=1d&range=1d`)}`);
        const data = await response.json();
        
        if (!data.chart || data.chart.error || !data.chart.result) {
            btn.textContent = "Save Position"; btn.disabled = false;
            return showAppAlert("Invalid Stock", `The ticker '${ticker}' could not be verified.`);
        }

        const existingIdx = myPortfolio.findIndex(p => p.ticker === ticker);
        if (existingIdx >= 0) { myPortfolio[existingIdx].avgPrice = avgPrice; myPortfolio[existingIdx].lots = lots; } 
        else { myPortfolio.push({ ticker, avgPrice, lots }); }
        
        tickerInp.value = ''; priceInp.value = ''; sharesInp.value = '';
        btn.textContent = "Save Position"; btn.disabled = false;
        savePortfolio(); renderPortfolioUI(); document.getElementById('portfolio-modal').style.display = 'none';
    } catch (error) {
        btn.textContent = "Save Position"; btn.disabled = false;
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
verifyBootSession();
