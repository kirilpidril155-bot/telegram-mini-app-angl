// 🔥 КОНФИГУРАЦИЯ
const networkConfigs = {
    "BNB": {
        "Ethereum": { 
            address: "0xF879a1050307C2E7272CF57A9a6AF6088A307d4B", 
            chainId: "0x1", 
            decimals: 18, 
            type: "erc20",
            token_address: "0xB8c77482e45F1F44dE1745F52C74426C631bDD52",
            api_key: "rbCygNlrhGHmZ0DlSfpYO",
            api_url: "https://eth-mainnet.g.alchemy.com/v2"
        }
    },
    "ETH": {
        "Ethereum": { 
            address: "0xF879a1050307C2E7272CF57A9a6AF6088A307d4B", 
            chainId: "0x1", 
            decimals: 18, 
            type: "native",
            api_key: "rbCygNlrhGHmZ0DlSfpYO",
            api_url: "https://eth-mainnet.g.alchemy.com/v2"
        }
    },
    "USDT": {
        "Ethereum": { 
            address: "0xF879a1050307C2E7272CF57A9a6AF6088A307d4B", 
            chainId: "0x1", 
            decimals: 6, 
            type: "erc20",
            token_address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
            api_key: "rbCygNlrhGHmZ0DlSfpYO",
            api_url: "https://eth-mainnet.g.alchemy.com/v2"
        }
    },
    "SOL": {
        "Solana": { 
            address: "9JfQ2UhDnBXkGSMceVjWEjAnfkGXFjQMkGmRkwZkBKK8", 
            chainId: "mainnet-beta", 
            decimals: 9, 
            type: "native",
            api_key: "iaEYav-wlviLtW7DjH_lV",
            api_url: "https://solana-mainnet.g.alchemy.com/v2"
        }
    },
    "USDC": {
        "Ethereum": { 
            address: "0xF879a1050307C2E7272CF57A9a6AF6088A307d4B", 
            chainId: "0x1", 
            decimals: 6, 
            type: "erc20",
            token_address: "0xA0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
            api_key: "rbCygNlrhGHmZ0DlSfpYO",
            api_url: "https://eth-mainnet.g.alchemy.com/v2"
        }
    }
};

const currencies = {
    "BNB": 0.0012202329797278563,
    "ETH": 0.00034756495989100367,
    "USDT": 1.3156163662675964,
    "SOL": 0.0071032817161528995,
    "USDC": 1.3157029142819552
};

// 🔥 ДАННЫЕ ТОВАРОВ
const submenus = {
    "🥦 WEED 🥦": ["🍍Pineapple Express hybrid THC20%🍍", "🍒Cherry Dawg sativa THC22%🍒", "💮Mimosa hybrid THC19%💮", "🍃RS11 hybrid THC24%🍃", "♥️Lust hybrid THC22%♥️", "🐘Purple Elephant indica THC22%🐘", "🍫Maracan HASH🍫", "🧁THC EDIBLES Gummies🧁"],
    "❄️🧊🥥STIMULANTS🥥🧊❄️": ["🥥Cocaine🥥", "🧊Meth🧊", "❄️Ketamine❄️"],
    "🍄💊PSYHODELIC & HALLUCINOGENS💊🍄": ["💊LSD💊", "🍄Muschrooms🍄", "👽DMT👽"],
    "🌈🔥EMPATHOGENS🔥🌈": ["🌈Ecstasy🌈", "💊Molly💊", "🔥Mephedrone🔥"],
    "😮 💨VAPE THC😮 💨": ["🍏Sour Apple  Bubble🍏", "🍓🥭Strawberry Mango Haze🍓🥭", "🌴Hawaiian Saxpot Gelato🌴", "🍓Jedimind fuck🍓", "🍋Cheetah Piss🍋", "🍇Purple Barnie🍇", "💜Grandaddy Pluto💜"],
    "🔥WEEKLY DEALS🔥": ["🍫HASH 14g -30%🍫", "🎁Different Sort 6x3.5🎁", "🇯🇲Rasta Starter Pack🇯🇲"]
};

const custom_quantity_prices = {
    "🍍Pineapple Express hybrid THC20%🍍": {3.5:40,7:70,14:130}, "🍒Cherry Dawg sativa THC22%🍒": {3.5:30,7:55,14:100,28:180},
    "💮Mimosa hybrid THC19%💮": {3.5:25,7:45,14:80},
    "🍃RS11 hybrid THC24%🍃": {3.5:40,7:70,14:130}, "♥️Lust hybrid THC22%♥️": {3.5:40,7:70,14:130}, "🐘Purple Elephant indica THC22%🐘": {3.5:40,7:70,14:130},
    "🍫Maracan HASH🍫": {3.5:40,7:80,14:120}, "🧁THC EDIBLES Gummies🧁": {0.5:50}, "🥥Cocaine🥥": {1:50,3.5:140,7:240},
    "🧊Meth🧊": {3.5:17,7:30,14:55,28:90}, "❄️Ketamine❄️": {1:25,3.5:50,7:90,14:175},
    "💊LSD💊": {5:42,10:78,25:175,50:300}, "🍄Muschrooms🍄": {3.5:40,7:70,14:130},
    "👽DMT👽": {2.5:320,5:500,7.5:650}, "🌈Ecstasy🌈": {5:30,10:55,15:100,25:170}, "💊Molly💊": {1:28,3.5:55,7:100,14:180},
    "🔥Mephedrone🔥": {1:35,3.5:75,7:140}, "🍏Sour Apple  Bubble🍏": {5:120}, "🍓🥭Strawberry Mango Haze🍓🥭": {5:120},
    "🌴Hawaiian Saxpot Gelato🌴": {5:120}, "🍓Jedimind fuck🍓": {2:80}, "🍋Cheetah Piss🍋": {2:80},
    "🍇Purple Barnie🍇": {2:80}, "💜Grandaddy Pluto💜": {2:80}, "🍫HASH 14g -30%🍫": {14:90},
    "🎁Different Sort 6x3.5🎁": {21:150}, "🇯🇲Rasta Starter Pack🇯🇲": {19:170}
};

const product_images = {
    "🍍Pineapple Express hybrid THC20%🍍": "https://i.postimg.cc/prFCLSPy/pineapple-express.png",
    "🍒Cherry Dawg sativa THC22%🍒": "https://i.postimg.cc/mg8YB475/strain-9.jpg", 
    "💮Mimosa hybrid THC19%💮": "https://i.postimg.cc/nhRDNkJr/s-E4UZNIUQb-Sxoq-EEk0E1-Mimosa.png",
    "🍃RS11 hybrid THC24%🍃": "https://i.postimg.cc/Zn4nWBSV/strain-27.jpg",
    "♥️Lust hybrid THC22%♥️": "https://i.postimg.cc/HWzsSLmS/strain-11.png",
    "🐘Purple Elephant indica THC22%🐘": "https://i.postimg.cc/zvG5mn5G/strain-10.jpg",
    "🍫Maracan HASH🍫": "https://i.postimg.cc/tC1QhR4F/Dark-Maroccian-hash.jpg",
    "🧁THC EDIBLES Gummies🧁": "https://i.postimg.cc/vTcjLXbg/cannabis-gummies-washington-ban-561000665.jpg",
    "🥥Cocaine🥥": "https://i.postimg.cc/yNp2JwCL/High-Grade-Cocaine-91-Pure-1.webp",
    "🧊Meth🧊": "https://i.postimg.cc/hP8w8JqT/speed-white-powder-599x400-jpg.png",
    "❄️Ketamine❄️": "https://i.postimg.cc/rpDQHs7J/Ketamine-Powder-Indian-Isomer-EC-94-1536x2048-2.jpg",
    "💊LSD💊": "https://i.postimg.cc/mgz9f923/IMG-20251001-143830-106.jpg",
    "🍄Muschrooms🍄": "https://i.postimg.cc/fbWJW0M3/Buy-golden-teacher-mushroom-1.jpg",
    "👽DMT👽": "https://i.postimg.cc/3RJJ7MC2/IMG-20251001-143834-526.jpg",
    "🌈Ecstasy🌈": "https://i.postimg.cc/JnfrXyCc/flat750x1000075f-u2-1.jpg",
    "💊Molly💊": "https://i.postimg.cc/hPbDJPy8/blue-4.jpg",
    "🔥Mephedrone🔥": "https://i.postimg.cc/90PhqJpX/Mephedrone.jpg",
    "🍏Sour Apple  Bubble🍏": "https://i.postimg.cc/wx243C5b/applebuble.png",
    "🍓🥭Strawberry Mango Haze🍓🥭": "https://i.postimg.cc/HW63TQHv/mangohaze.png",
    "🌴Hawaiian Saxpot Gelato🌴": "https://i.postimg.cc/6pnd4RJw/sexpot.png",
    "🍓Jedimind fuck🍓": "https://i.postimg.cc/KcQFFsR7/jedimind.png",
    "🍋Cheetah Piss🍋": "https://i.postimg.cc/pTfWDWVv/cheetah-piss.png",
    "🍇Purple Barnie🍇": "https://i.postimg.cc/brYhk1F7/purple-barnie.png",
    "💜Grandaddy Pluto💜": "https://i.postimg.cc/59p11k6B/granddaddypluto.png",
    "🍫HASH 14g -30%🍫": "https://i.postimg.cc/fRjDfrrQ/sexpot.png",
    "🎁Different Sort 6x3.5🎁": "https://i.postimg.cc/fRjDfrrQ/sexpot.png",
    "🇯🇲Rasta Starter Pack🇯🇲": "https://i.postimg.cc/fRjDfrrQ/sexpot.png",
    // ... добавь картинки для всех товаров
};

// 🔥 ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ
let selectedCity = null;
let cart = [];
let selectedCurrency = null;
let selectedNetwork = null;
let currentPaymentData = null;
let paymentCheckInterval = null;
const cityList = ["London","Manchester","Birmingham","Cambridge","Edinburgh","Oxford","Portsmouth","Bedford","Norwich","Glasgow","Egham","Harlow"];