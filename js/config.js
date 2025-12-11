// 🔥 КОНФИГУРАЦИЯ СЕТИ И КУРСОВ
const networkConfigs = {
    "BNB": {
        "BNB Smart Chain": { 
            address: "0xd699bD1dDED8fc07C71cA3E8d14FB619877D6f46", 
            chainId: "0x38", 
            decimals: 18, 
            type: "native",
            api_key: "aVi4_WTrobYoB_Nk-iRqB",
            api_url: "https://eth-mainnet.g.alchemy.com/v2",
            coinGeckoId: "binancecoin"
        }
    },
    "ETH": {
        "Ethereum": { 
            address: "0xd699bD1dDED8fc07C71cA3E8d14FB619877D6f46", 
            chainId: "0x1", 
            decimals: 18, 
            type: "native",
            api_key: "aVi4_WTrobYoB_Nk-iRqB",
            api_url: "https://eth-mainnet.g.alchemy.com/v2",
            coinGeckoId: "ethereum"
        }
    },
    "USDT": {
        "Ethereum (ERC-20)": { 
            address: "0xd699bD1dDED8fc07C71cA3E8d14FB619877D6f46", 
            chainId: "0x1", 
            decimals: 6, 
            type: "erc20",
            token_address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
            api_key: "aVi4_WTrobYoB_Nk-iRqB",
            api_url: "https://eth-mainnet.g.alchemy.com/v2",
            coinGeckoId: "tether"
        },
        "BNB Smart Chain (BEP-20)": { 
            address: "0xd699bD1dDED8fc07C71cA3E8d14FB619877D6f46", 
            chainId: "0x38", 
            decimals: 18, 
            type: "bep20",
            token_address: "0x55d398326f99059fF775485246999027B3197955",
            api_key: "aVi4_WTrobYoB_Nk-iRqB",
            api_url: "https://eth-mainnet.g.alchemy.com/v2",
            coinGeckoId: "tether"
        },
        "Tron (TRC-20)": { 
            address: "TE38XYV24FfCiFQGGS2ydT2MaCUpoUYEnK", 
            chainId: "tron", 
            decimals: 6, 
            type: "trc20",
            token_address: "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t",
            api_key: "b1dec944-c5d9-4271-b35b-53dd07fe3441",
            api_url: "https://api.trongrid.io",
            coinGeckoId: "tether"
        },
        "Solana": { 
            address: "4cm2juwWBYMeojpAusSc23gVinQtRqECiowTxnqq46zg", 
            chainId: "mainnet-beta", 
            decimals: 6, 
            type: "spl",
            token_address: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
            api_key: "15288533-b225-49f2-8113-f8709f69fc37",
            api_url: "https://solana-mainnet.g.alchemy.com/v2",
            coinGeckoId: "tether"
        }
    },
    "SOL": {
        "Solana": { 
            address: "4cm2juwWBYMeojpAusSc23gVinQtRqECiowTxnqq46zg", 
            chainId: "mainnet-beta", 
            decimals: 9, 
            type: "native",
            api_key: "15288533-b225-49f2-8113-f8709f69fc37",
            api_url: "https://solana-mainnet.g.alchemy.com/v2",
            coinGeckoId: "solana"
        }
    },
    "USDC": {
        "Ethereum (ERC-20)": { 
            address: "0xd699bD1dDED8fc07C71cA3E8d14FB619877D6f46", 
            chainId: "0x1", 
            decimals: 6, 
            type: "erc20",
            token_address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
            api_key: "aVi4_WTrobYoB_Nk-iRqB",
            api_url: "https://eth-mainnet.g.alchemy.com/v2",
            coinGeckoId: "usd-coin"
        },
        "BNB Smart Chain (BEP-20)": { 
            address: "0xd699bD1dDED8fc07C71cA3E8d14FB619877D6f46", 
            chainId: "0x38", 
            decimals: 18, 
            type: "bep20",
            token_address: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
            api_key: "aVi4_WTrobYoB_Nk-iRqB",
            api_url: "https://eth-mainnet.g.alchemy.com/v2",
            coinGeckoId: "usd-coin"
        },
        "Solana": { 
            address: "4cm2juwWBYMeojpAusSc23gVinQtRqECiowTxnqq46zg", 
            chainId: "mainnet-beta", 
            decimals: 6, 
            type: "spl",
            token_address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
            api_key: "15288533-b225-49f2-8113-f8709f69fc37",
            api_url: "https://solana-mainnet.g.alchemy.com/v2",
            coinGeckoId: "usd-coin"
        }
    },
    "BTC": {
        "Bitcoin": { 
            address: "bc1qppqgf82wquwexqmd3vdcavzvc4a6q5f86uuz0y", 
            chainId: "bitcoin", 
            decimals: 8, 
            type: "native",
            api_key: "6a5ef465160041f2b04d0544741736b2",
            api_url: "https://blockstream.info/api",
            coinGeckoId: "bitcoin"
        }
    },
    "LTC": {
        "Litecoin": { 
            address: "ltc1ql9s6gm4gm66v00e9fu8g4ufzhychku7m0zeqw7", 
            chainId: "litecoin", 
            decimals: 8, 
            type: "native",
            api_key: "6a5ef465160041f2b04d0544741736b2",
            api_url: "https://api.blockcypher.com/v1/ltc/main",
            coinGeckoId: "litecoin"
        }
    }
};

// 🔥 ИНИЦИАЛИЗАЦИЯ КУРСОВ (будут обновляться через API)
let currencies = {
    "BNB": 0.0012202329797278563,
    "ETH": 0.00034756495989100367,
    "USDT": 1.3156163662675964,
    "SOL": 0.0071032817161528995,
    "USDC": 1.3157029142819552,
    "BTC": 0.000015,
    "LTC": 0.003
};

// 🔥 MAP ДЛЯ СООТВЕТСТВИЯ ВАЛЮТ И COINGECKO ID
const currencyToCoinGeckoId = {
    "BNB": "binancecoin",
    "ETH": "ethereum",
    "USDT": "tether",
    "SOL": "solana",
    "USDC": "usd-coin",
    "BTC": "bitcoin",
    "LTC": "litecoin"
};

// 🔥 ВРЕМЯ ПОСЛЕДНЕГО ОБНОВЛЕНИЯ КУРСОВ
let lastUpdateTime = null;
let exchangeRatesCache = {};
let exchangeRateUpdateInterval = null;

// 🔥 ТОВАРЫ И КАТЕГОРИИ
const submenus = {
    "🥦 WEED 🥦": ["🍍Pineapple Express hybrid THC20%🍍", "🍒Cherry Dawg sativa THC22%🍒", "💮Mimosa hybrid THC19%💮", "🍃RS11 hybrid THC24%🍃", "♥️Lust hybrid THC22%♥️", "🐘Purple Elephant indica THC22%🐘", "🍫Maracan HASH🍫", "🧁THC EDIBLES Gummies 500mg (1pack of 5pcs)🧁"],
    "❄️🧊🥥STIMULANTS🥥🧊❄️": ["🥥Cocaine🥥", "🧊Meth🧊", "❄️Ketamine❄️"],
    "🍄💊PSYHODELIC & HALLUCINOGENS💊🍄": ["💊LSD💊", "🍄Muschrooms🍄", "👽DMT👽"],
    "🌈🔥EMPATHOGENS🔥🌈": ["🌈Ecstasy (1g = 1pcs)🌈", "💊Molly (1g = 1pcs)💊", "🔥Mephedrone🔥"],
    "😮 💨VAPE THC😮 💨": ["🍏Sour Apple  Bubble🍏", "🍓🥭Strawberry Mango Haze🍓🥭", "🌴Hawaiian Saxpot Gelato🌴", "🍓Jedimind fuck🍓", "🍋Cheetah Piss🍋", "🍇Purple Barnie🍇", "💜Grandaddy Pluto💜"],
    "🔥WEEKLY DEALS🔥": ["🍫HASH 14g -30%🍫", "🎁Different Sort 6x3.5🎁", "🥦Rasta Starter Pack (vape+hush+edibles+2sorts)🥦"]
};

const custom_quantity_prices = {
    "🍍Pineapple Express hybrid THC20%🍍": {3.5:40,7:70,14:130}, "🍒Cherry Dawg sativa THC22%🍒": {3.5:30,7:55,14:100,28:180},
    "💮Mimosa hybrid THC19%💮": {3.5:25,7:45,14:80},
    "🍃RS11 hybrid THC24%🍃": {3.5:40,7:70,14:130}, "♥️Lust hybrid THC22%♥️": {3.5:40,7:70,14:130}, "🐘Purple Elephant indica THC22%🐘": {3.5:40,7:70,14:130},
    "🍫Maracan HASH🍫": {3.5:40,7:80,14:120}, "🧁THC EDIBLES Gummies 500mg (1pack of 5pcs)🧁": {1:50,2:85,3:110}, "🥥Cocaine🥥": {1:50,3.5:140,7:240},
    "🧊Meth🧊": {3.5:17,7:30,14:55,28:90}, "❄️Ketamine❄️": {1:25,3.5:50,7:90,14:175},
    "💊LSD 💊": {5:42,10:78,25:175,50:300}, "🍄Muschrooms🍄": {3.5:40,7:70,14:130},
    "👽DMT👽": {2.5:320,5:500,7.5:650}, "🌈Ecstasy (1g = 1pcs)🌈": {5:30,10:55,15:100,25:170}, "💊Molly (1g = 1pcs)💊": {5:30,10:55,15:100,25:170},
    "🔥Mephedrone🔥": {1:35,3.5:75,7:140}, "🍏Sour Apple  Bubble🍏": {5:120}, "🍓🥭Strawberry Mango Haze🍓🥭": {5:120},
    "🌴Hawaiian Saxpot Gelato🌴": {5:120}, "🍓Jedimind fuck🍓": {2:80}, "🍋Cheetah Piss🍋": {2:80},
    "🍇Purple Barnie🍇": {2:80}, "💜Grandaddy Pluto💜": {2:80}, "🍫HASH 14g -30%🍫": {14:90},
    "🎁Different Sort 6x3.5🎁": {21:150}, "🥦Rasta Starter Pack (vape+hush+edibles+2sorts)🥦": {19:170}
};

const product_images = {
    "🍍Pineapple Express hybrid THC20%🍍": "https://i.postimg.cc/prFCLSPy/pineapple-express.png",
    "🍒Cherry Dawg sativa THC22%🍒": "https://i.postimg.cc/mg8YB475/strain-9.jpg", 
    "💮Mimosa hybrid THC19%💮": "https://i.postimg.cc/nhRDNkJr/s-E4UZNIUQb-Sxoq-EEk0E1-Mimosa.png",
    "🍃RS11 hybrid THC24%🍃": "https://i.postimg.cc/Zn4nWBSV/strain-27.jpg",
    "♥️Lust hybrid THC22%♥️": "https://i.postimg.cc/HWzsSLmS/strain-11.png",
    "🐘Purple Elephant indica THC22%🐘": "https://i.postimg.cc/zvG5mn5G/strain-10.jpg",
    "🍫Maracan HASH🍫": "https://i.postimg.cc/tC1QhR4F/Dark-Maroccian-hash.jpg",
    "🧁THC EDIBLES Gummies 500mg (1pack of 5pcs)🧁": "https://i.postimg.cc/vTcjLXbg/cannabis-gummies-washington-ban-561000665.jpg",
    "🥥Cocaine🥥": "https://i.postimg.cc/yNp2JwCL/High-Grade-Cocaine-91-Pure-1.webp",
    "🧊Meth🧊": "https://i.postimg.cc/hP8w8JqT/speed-white-powder-599x400-jpg.png",
    "❄️Ketamine❄️": "https://i.postimg.cc/rpDQHs7J/Ketamine-Powder-Indian-Isomer-EC-94-1536x2048-2.jpg",
    "💊LSD💊": "https://i.postimg.cc/kMkrn37t/LSD-200ug-White-Fluff.png",
    "🍄Muschrooms🍄": "https://i.postimg.cc/fbWJW0M3/Buy-golden-teacher-mushroom-1.jpg",
    "👽DMT👽": "https://i.postimg.cc/RFkPzmwF/Ketamine-Powder-Indian-Isomer-EC-94-1536x2048-2-1.jpg",
    "🌈Ecstasy (1g = 1pcs)🌈": "https://i.postimg.cc/JnfrXyCc/flat750x1000075f-u2-1.jpg",
    "💊Molly (1g = 1pcs)💊": "https://i.postimg.cc/hPbDJPy8/blue-4.jpg",
    "🔥Mephedrone🔥": "https://i.postimg.cc/90PhqJpX/Mephedrone.jpg",
    "🍏Sour Apple  Bubble🍏": "https://i.postimg.cc/wx243C5b/applebuble.png",
    "🍓🥭Strawberry Mango Haze🍓🥭": "https://i.postimg.cc/HW63TQHv/mangohaze.png",
    "🌴Hawaiian Saxpot Gelato🌴": "https://i.postimg.cc/6pnd4RJw/sexpot.png",
    "🍓Jedimind fuck🍓": "https://i.postimg.cc/KcQFFsR7/jedimind.png",
    "🍋Cheetah Piss🍋": "https://i.postimg.cc/pTfWDWVv/cheetah-piss.png",
    "🍇Purple Barnie🍇": "https://i.postimg.cc/brYhk1F7/purple-barnie.png",
    "💜Grandaddy Pluto💜": "https://i.postimg.cc/59p11k6B/granddaddypluto.png",
    "🍫HASH 14g -30%🍫": "https://i.postimg.cc/tC1QhR4F/Dark-Maroccian-hash.jpg",
    "🎁Different Sort 6x3.5🎁": "https://i.postimg.cc/1z5RphnD/Screenshot-20251030-214824.png",
    "🥦Rasta Starter Pack (vape+hush+edibles+2sorts)🥦": "https://i.postimg.cc/c153ChzR/OIP.webp",
    // ... добавь картинки для всех товаров
};

// 🔥 ГОРОДА И КОРЗИНА
let selectedCity = null;
let cart = [];
let selectedCurrency = null;
let selectedNetwork = null;
let currentPaymentData = null;
let paymentCheckInterval = null;
const cityList = ["London","Manchester","Birmingham","Cambridge","Edinburgh","Oxford","Portsmouth","Bedford","Norwich","Glasgow","Egham","Harlow"];