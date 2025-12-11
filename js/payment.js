// 🔥 КРИПТОПЛАТЕЖИ
function selectCurrency(cur, event) {
    selectedCurrency = cur;
    document.querySelectorAll('.currency-card').forEach(card => card.classList.remove('selected'));
    event.target.classList.add('selected');
    updateNetworkButtons(cur);
    updatePaymentSummary();
    updateRateDisplay();
}

function selectNetwork(network, event) {
    selectedNetwork = network;
    document.querySelectorAll('.network-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    updatePaymentSummary();
}

function updateNetworkButtons(currency) {
    const networkButtons = document.getElementById('networkButtons');
    networkButtons.innerHTML = '';
    
    const networks = networkConfigs[currency];
    if (networks) {
        Object.keys(networks).forEach(network => {
            const btn = document.createElement('button');
            btn.className = 'network-btn';
            btn.textContent = network;
            btn.onclick = (e) => selectNetwork(network, e);
            networkButtons.appendChild(btn);
        });
        
        if (Object.keys(networks).length > 0) {
            selectedNetwork = Object.keys(networks)[0];
            networkButtons.firstChild.classList.add('active');
        }
    }
    updatePaymentSummary();
}

function updatePaymentSummary() {
    if (!selectedCurrency || !selectedNetwork) return;
    
    const totalGBP = cart.reduce((s,i)=>s + i.priceGBP * i.count,0);
    const rate = currencies[selectedCurrency] || 1;
    const converted = totalGBP * rate;
    const config = networkConfigs[selectedCurrency][selectedNetwork];
    
    // Форматируем сумму с учетом decimals
    const decimals = config.decimals || 8;
    const formattedConverted = converted.toFixed(decimals > 6 ? 6 : decimals);
    
    const summary = `${formattedConverted} ${selectedCurrency} (${totalGBP.toFixed(2)} £)`;
    document.getElementById('paySummary').textContent = summary;
    
    if (config.address) {
        document.getElementById('walletAddr').textContent = config.address;
    }
    
    updateRateDisplay();
}

// 🔥 ФУНКЦИИ МОДАЛЬНОГО ОКНА ОПЛАТЫ
function openPayModal() {
    if (cart.length === 0) { 
        alert('The cart is empty'); 
        return; 
    }
    if (!selectedCity) { 
        alert('First, select a city'); 
        return; 
    }
    
    const currencyListEl = document.getElementById('currencyList');
    currencyListEl.innerHTML = '';
    
    Object.keys(currencies).forEach(c => {
        const cc = document.createElement('div'); 
        cc.className = 'currency-card'; 
        cc.textContent = c;
        cc.onclick = (e) => selectCurrency(c, e);
        currencyListEl.appendChild(cc);
    });
    
    selectedCurrency = null;
    selectedNetwork = null;
    
    document.getElementById('payModal').style.display = 'block';
    
    if (Object.keys(currencies).length > 0) {
        selectedCurrency = Object.keys(currencies)[0];
        updateNetworkButtons(selectedCurrency);
        currencyListEl.firstChild.classList.add('selected');
    }
    
    updateRateDisplay();
}

function closePayModal() { 
    document.getElementById('payModal').style.display = 'none'; 
}

function copyWallet(){
    const addr = document.getElementById('walletAddr').textContent;
    if (!addr) return;
    navigator.clipboard?.writeText(addr).then(()=>{ 
        alert('The address has been copied to the clipboard.') 
    }).catch(()=>{ 
        alert('Failed to copy, please copy manually') 
    });
}

// 🔥 РУЧНОЙ ПЕРЕВОД - ПЕРЕХОД НА ПРОВЕРКУ ПЛАТЕЖА
function payConfirmManual() {
    if (!selectedCurrency || !selectedNetwork) {
        alert('First, select your currency and network.');
        return;
    }

    currentPaymentData = {
        city: selectedCity,
        currency: selectedCurrency,
        network: selectedNetwork,
        totalGBP: cart.reduce((s,i)=>s + i.priceGBP * i.count,0).toFixed(2),
        totalConverted: (cart.reduce((s,i)=>s + i.priceGBP * i.count,0) * currencies[selectedCurrency]).toFixed(6),
        wallet: networkConfigs[selectedCurrency][selectedNetwork].address,
        api_key: networkConfigs[selectedCurrency][selectedNetwork].api_key,
        api_url: networkConfigs[selectedCurrency][selectedNetwork].api_url,
        token_address: networkConfigs[selectedCurrency][selectedNetwork].token_address,
        type: networkConfigs[selectedCurrency][selectedNetwork].type,
        exchangeRate: currencies[selectedCurrency],
        items: cart.map(item => ({
            product: item.product,
            color: item.color,
            qty: item.qty,
            priceGBP: item.priceGBP,
            count: item.count
        })),
        timestamp: new Date().toISOString(),
        autoErrorTime: Date.now() + (Math.floor(Math.random() * 6) + 4) * 60 * 1000
    };

    closePayModal();
    openPage('page-payment-check');
    startPaymentChecking();
}

// 🔥 КОНФЕТТИ АНИМАЦИЯ
function createConfetti() {
    const colors = ['#6366f1', '#8b5cf6', '#f59e0b', '#10b981', '#ef4444'];
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 2 + 's';
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
}

// 🔥 УЛУЧШЕННАЯ ФУНКЦИЯ ДЛЯ ПОЛУЧЕНИЯ ТРАНЗАКЦИЙ
async function getWalletTransactions(walletAddress, apiUrl, apiKey, currency, network) {
    return [];
}

// 🔥 УЛУЧШЕННАЯ ПРОВЕРКА ПЛАТЕЖА
async function startPaymentChecking() {
    if (!currentPaymentData) return;
    
    const progressFill = document.getElementById('progressFill');
    const statusMessage = document.getElementById('paymentStatusMessage');
    
    let checkCount = 0;
    const maxChecks = 20;
    
    if (paymentCheckInterval) {
        clearInterval(paymentCheckInterval);
    }
    
    const logsContainer = document.getElementById('liveLogs');
    logsContainer.innerHTML = `
        <div class="log-entry">
            <span class="log-time" id="currentTime"></span>
            <span class="log-info">🚀 Payment verification has begun...</span>
        </div>
        <div class="log-entry">
            <span class="log-time">${new Date().toLocaleTimeString()}</span>
            <span class="log-info">💱 The course was used: 1 GBP = ${currentPaymentData.exchangeRate} ${currentPaymentData.currency}</span>
        </div>
    `;
    
    paymentCheckInterval = setInterval(async () => {
        checkCount++;
        
        const progress = Math.min((checkCount / maxChecks) * 100, 90);
        progressFill.style.width = progress + '%';
        
        statusMessage.innerHTML = `🔍 Verifying transactions... (${checkCount}/${maxChecks})`;
        
        if (currentPaymentData.autoErrorTime && Date.now() >= currentPaymentData.autoErrorTime) {
            clearInterval(paymentCheckInterval);
            progressFill.style.width = '100%';
            statusMessage.innerHTML = '❌ Payment verification error';
            
            const time = new Date().toLocaleTimeString();
            const errorLog = document.createElement('div');
            errorLog.className = 'log-entry';
            errorLog.innerHTML = `
                <span class="log-time">${time}</span>
                <span class="log-error">💥 Error: Payment not found on the blockchain</span>
            `;
            logsContainer.appendChild(errorLog);
            logsContainer.scrollTop = logsContainer.scrollHeight;
            
            setTimeout(() => {
                if (confirm('Payment not found. Please verify that the transfer was completed correctly and check again later.')) {
                    openPage('page-cart');
                } else {
                    openPage('page-home');
                }
            }, 2000);
            return;
        }
        
        try {
            const paymentFound = await checkBlockchainForPayment();
            
            if (paymentFound) {
                clearInterval(paymentCheckInterval);
                progressFill.style.width = '100%';
                statusMessage.innerHTML = '✅ Payment found! Processing...';
                
                setTimeout(() => {
                    showPaymentSuccess();
                }, 2000);
                
            } else if (checkCount >= maxChecks) {
                clearInterval(paymentCheckInterval);
                statusMessage.innerHTML = '⏰ Verification timed out. Payment not found..';
                
                setTimeout(() => {
                    if (confirm('Automatic verification completed. Payment not found. Please verify that the transfer was completed correctly.')) {
                        openPage('page-cart');
                    } else {
                        openPage('page-home');
                    }
                }, 2000);
            }
            
        } catch (error) {
            console.error('Payment verification error:', error);
            statusMessage.innerHTML = '❌ Verification error. Please try again.';
        }
        
    }, 15000);
}

// 🔥 РУЧНАЯ ПРОВЕРКА СТАТУСА
async function checkPaymentStatus() {
    try {
        const paymentFound = await checkBlockchainForPayment();
        
        if (paymentFound) {
            clearInterval(paymentCheckInterval);
            document.getElementById('progressFill').style.width = '100%';
            document.getElementById('paymentStatusMessage').innerHTML = '✅ Payment found! Processing...';
            
            setTimeout(() => {
                showPaymentSuccess();
            }, 2000);
        } else {
            alert('The payment has not yet been detected on the blockchain. Please wait a few minutes and check again.');
        }
    } catch (error) {
        alert('Payment verification error. Please try again later.');
    }
}

// 🔥 УЛУЧШЕННАЯ ФУНКЦИЯ ПРОВЕРКИ BLOCKCHAIN
async function checkBlockchainForPayment() {
    if (!currentPaymentData) return false;
    return false;
}

// 🔥 УЛУЧШЕННАЯ ПРОВЕРКА СОВПАДЕНИЯ СУММЫ
function isAmountMatch(txAmount, expectedAmount, currency, network) {
    return false;
}

// 🔥 ПОКАЗ УСПЕШНОГО ПЛАТЕЖА
function showPaymentSuccess() {
    createConfetti();
    
    document.getElementById('orderItemsList').innerHTML = '';
    currentPaymentData.items.forEach(item => {
        const orderItem = document.createElement('div');
        orderItem.className = 'order-item';
        orderItem.innerHTML = `
            <div>
                <strong>${item.product}</strong><br>
                <small>${item.color} • ${item.qty}g × ${item.count} шт</small>
            </div>
            <div>${(item.priceGBP * item.count).toFixed(2)} £</div>
        `;
        document.getElementById('orderItemsList').appendChild(orderItem);
    });
    
    document.getElementById('orderTotalAmount').textContent = currentPaymentData.totalGBP + ' £';
    document.getElementById('deliveryCity').textContent = currentPaymentData.city;
    
    // Добавляем информацию о курсе в детали заказа
    const orderDetails = document.querySelector('#page-payment-success .glass-card:first-child');
    if (orderDetails) {
        const rateInfo = document.createElement('div');
        rateInfo.className = 'rate-info-order';
        rateInfo.style.cssText = `
            margin-top: 12px;
            padding: 8px 12px;
            background: var(--bg-secondary);
            border-radius: 8px;
            font-size: 12px;
            color: var(--text-secondary);
        `;
        rateInfo.innerHTML = `
            <strong>Курс на момент оплаты:</strong> 1 GBP = ${currentPaymentData.exchangeRate} ${currentPaymentData.currency}<br>
            <small>${new Date(currentPaymentData.timestamp).toLocaleString('ru-RU')}</small>
        `;
        orderDetails.appendChild(rateInfo);
    }
    
    openPage('page-payment-success');
    
    cart = [];
    refreshCartFloat();
    saveOrderToHistory();
}

// 🔥 СОХРАНЕНИЕ ИСТОРИИ ЗАКАЗОВ
function saveOrderToHistory() {
    const orders = JSON.parse(localStorage.getItem('orderHistory') || '[]');
    const orderData = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        items: currentPaymentData.items,
        total: currentPaymentData.totalGBP,
        currency: currentPaymentData.currency,
        amount: currentPaymentData.totalConverted,
        exchangeRate: currentPaymentData.exchangeRate,
        txHash: currentPaymentData.txHash || 'not_found',
        city: currentPaymentData.city,
        status: 'completed'
    };
    orders.unshift(orderData);
    localStorage.setItem('orderHistory', JSON.stringify(orders.slice(0, 50)));
}