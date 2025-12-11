// 🔥 АВТООБНОВЛЕНИЕ КУРСОВ ЧЕРЕЗ COINGECKO API

// 🔥 ФУНКЦИЯ ДЛЯ ПОЛУЧЕНИЯ АКТУАЛЬНЫХ КУРСОВ
async function updateExchangeRates() {
    try {
        const currencyIds = Object.values(currencyToCoinGeckoId).join(',');
        const vsCurrency = 'gbp';
        
        const response = await fetch(
            `https://api.coingecko.com/api/v3/simple/price?ids=${currencyIds}&vs_currencies=${vsCurrency}`,
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }
        );
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Обновляем курсы для каждой валюты
        for (const [currency, coinGeckoId] of Object.entries(currencyToCoinGeckoId)) {
            if (data[coinGeckoId] && data[coinGeckoId][vsCurrency]) {
                const gbpPrice = data[coinGeckoId][vsCurrency];
                const cryptoAmount = 1 / gbpPrice;
                
                // Сохраняем с точностью до 8 знаков
                currencies[currency] = parseFloat(cryptoAmount.toFixed(8));
                
                exchangeRatesCache[currency] = {
                    gbpPrice: gbpPrice,
                    cryptoAmount: cryptoAmount,
                    updated: new Date().toISOString()
                };
            }
        }
        
        lastUpdateTime = new Date();
        
        // Обновляем отображение курсов, если модалка оплаты открыта
        if (selectedCurrency && document.getElementById('payModal').style.display === 'block') {
            updatePaymentSummary();
            updateRateDisplay();
        }
        
    } catch (error) {
        console.error('Ошибка при обновлении курсов:', error);
        
        // Используем статические курсы при ошибке
        if (Object.keys(exchangeRatesCache).length === 0) {
            currencies = {
                "BNB": 0.0012202329797278563,
                "ETH": 0.00034756495989100367,
                "USDT": 1.3156163662675964,
                "SOL": 0.0071032817161528995,
                "USDC": 1.3157029142819552,
                "BTC": 0.000015,
                "LTC": 0.003
            };
        }
    }
}

// 🔥 ФУНКЦИЯ ДЛЯ ОТОБРАЖЕНИЯ ТЕКУЩЕГО КУРСА В МОДАЛКЕ
function updateRateDisplay() {
    if (!selectedCurrency) return;
    
    const rateInfo = document.getElementById('rateInfo');
    if (!rateInfo) return;
    
    const cryptoAmount = currencies[selectedCurrency];
    if (!cryptoAmount) return;
    
    const gbpPrice = exchangeRatesCache[selectedCurrency]?.gbpPrice || (1 / cryptoAmount);
    
    const rateText = `💰 1 ${selectedCurrency} = ${gbpPrice.toFixed(2)} GBP | 1 GBP = ${cryptoAmount.toFixed(6)} ${selectedCurrency}`;
    
    const timeText = lastUpdateTime ? 
        `🕐 Updated: ${lastUpdateTime.toLocaleTimeString('ru-RU', {hour: '2-digit', minute:'2-digit'})}` : 
        '🔄 Courses are loading...';
    
    rateInfo.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 4px;">
            <span style="font-size: 11px; color: var(--text-secondary);">${rateText}</span>
            <span style="font-size: 10px; color: var(--text-muted);">${timeText}</span>
        </div>
    `;
}

// 🔥 ИНИЦИАЛИЗАЦИЯ АВТООБНОВЛЕНИЯ ПРИ ЗАГРУЗКЕ
document.addEventListener('DOMContentLoaded', () => {
    // Первоначальное обновление курсов
    updateExchangeRates();
    
    // Устанавливаем интервал обновления каждые 5 минут
    exchangeRateUpdateInterval = setInterval(updateExchangeRates, 300000);
});

// 🔥 ОСТАНОВКА АВТООБНОВЛЕНИЯ ПРИ ЗАКРЫТИИ СТРАНИЦЫ
window.addEventListener('beforeunload', () => {
    if (exchangeRateUpdateInterval) {
        clearInterval(exchangeRateUpdateInterval);
    }
});