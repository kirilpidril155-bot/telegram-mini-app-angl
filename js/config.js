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
    "🍍Pineapple Express hybrid THC20%🍍": "https://i.postimg.cc/Hk8GxPQT/1.webp",
    "🍒Cherry Dawg sativa THC22%🍒": "https://i.postimg.cc/KcdJnBp1/Dark-Maroccian-hash.jpg", 
    "💮Mimosa hybrid THC19%💮": "https://i.postimg.cc/ncbyS1mR/4.jpg",
    "🍃RS11 hybrid THC24%🍃": "https://i.postimg.cc/SNfvTbkM/3.jpg",
    "♥️Lust hybrid THC22%♥️": "https://i.postimg.cc/YqzsnBMC/11.webp",
    "🐘Purple Elephant indica THC22%🐘": "https://i.postimg.cc/5NVrS2d4/5.jpg",
    "🍫Maracan HASH🍫": "https://i.postimg.cc/Wbvyw1LV/7.webp",
    "🧁THC EDIBLES Gummies🧁": "https://i.postimg.cc/VL8hWkQk/8.jpg",
    "🥥Cocaine🥥": "https://i.postimg.cc/hPBY1tW4/6.jpg",
    "🧊Meth🧊": "https://i.postimg.cc/8PSYmzQj/12.webp",
    "❄️Ketamine❄️": "https://i.postimg.cc/ZKSQx5tB/13.jpg",
    "💊LSD💊": "https://i.postimg.cc/HsgN9kDn/9.webp",
    "🍄Muschrooms🍄": "https://i.postimg.cc/wTprQj8v/10.webp",
    "👽DMT👽": "https://i.postimg.cc/MKSLmp2n/14.webp",
    "🌈Ecstasy🌈": "https://i.postimg.cc/65fmjxtR/15.webp",
    "💊Molly💊": "https://i.postimg.cc/J4526CMh/16.webp",
    "🔥Mephedrone🔥": "https://i.postimg.cc/K8rxDHHG/applebuble.png",
    "🍏Sour Apple  Bubble🍏": "https://i.postimg.cc/JzcM5221/mangohaze.png",
    "🍓🥭Strawberry Mango Haze🍓🥭": "https://i.postimg.cc/fRjDfrrQ/sexpot.png",
    "🌴Hawaiian Saxpot Gelato🌴": "https://i.postimg.cc/fRjDfrrQ/sexpot.png",
    "🍓Jedimind fuck🍓": "https://i.postimg.cc/fRjDfrrQ/sexpot.png",
    "🍋Cheetah Piss🍋": "https://i.postimg.cc/fRjDfrrQ/sexpot.png",
    "🍇Purple Barnie🍇": "https://i.postimg.cc/fRjDfrrQ/sexpot.png",
    "💜Grandaddy Pluto💜": "https://i.postimg.cc/fRjDfrrQ/sexpot.png",
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