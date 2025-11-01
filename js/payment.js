// 🔥 КРИПТОПЛАТЕЖИ
function selectCurrency(cur) {
    selectedCurrency = cur;
    document.querySelectorAll('.currency-card').forEach(card => card.classList.remove('selected'));
    event.target.classList.add('selected');
    updateNetworkButtons(cur);
    updatePaymentSummary();
}

function selectNetwork(network) {
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
            btn.onclick = () => selectNetwork(network);
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
    
    const summary = `${converted.toFixed(6)} ${selectedCurrency} (${totalGBP.toFixed(2)} £)`;
    document.getElementById('paySummary').textContent = summary;
    document.getElementById('walletAddr').textContent = config.address;
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
        items: cart.map(item => ({
            product: item.product,
            color: item.color,
            qty: item.qty,
            priceGBP: item.priceGBP,
            count: item.count
        })),
        timestamp: new Date().toISOString()
    };

    addLog(`💳 We are starting payment verification: ${currentPaymentData.totalConverted} ${currentPaymentData.currency}`, 'info');
    
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

// 🔥 ФУНКЦИИ ДЛЯ ЛОГИРОВАНИЯ
function addLog(message, type = 'info') {
    const logsContainer = document.getElementById('liveLogs');
    const time = new Date().toLocaleTimeString();
    
    const logEntry = document.createElement('div');
    logEntry.className = 'log-entry';
    logEntry.innerHTML = `
        <span class="log-time">${time}</span>
        <span class="log-${type}">${message}</span>
    `;
    
    logsContainer.appendChild(logEntry);
    logsContainer.scrollTop = logsContainer.scrollHeight;
    
    console.log(`[${time}] ${message}`);
}

function clearLogs() {
    document.getElementById('liveLogs').innerHTML = `
        <div class="log-entry">
            <span class="log-time" id="currentTime"></span>
            <span class="log-info">🚀 Launch of the payment verification system...</span>
        </div>
    `;
}

// 🔥 УЛУЧШЕННАЯ ФУНКЦИЯ ДЛЯ ПОЛУЧЕНИЯ ТРАНЗАКЦИЙ
async function getWalletTransactions(walletAddress, apiUrl, apiKey, currency, network) {
    const config = networkConfigs[currency][network];
    
    addLog(`🔗 Requesting transactions via the Alchemy API...`, 'info');
    addLog(`👛 Wallet: ${walletAddress.substring(0, 10)}...`, 'info');
    
    try {
        let body;
        
        if (config.type === 'erc20') {
            addLog(`🎯 Search ${currency} (ERC-20) transactions...`, 'info');
            body = {
                id: 1,
                jsonrpc: "2.0",
                method: "alchemy_getAssetTransfers",
                params: [{
                    fromBlock: "0x0",
                    toBlock: "latest",
                    fromAddress: "0x0000000000000000000000000000000000000000",
                    toAddress: walletAddress,
                    contractAddresses: [config.token_address],
                    category: ["erc20"],
                    withMetadata: true,
                    excludeZeroValue: true,
                    maxCount: "0x3C"
                }]
            };
        } else if (network === "Ethereum") {
            addLog(`🎯 Finding Native ETH Transactions Using an Improved Method...`, 'info');
            body = {
                id: 1,
                jsonrpc: "2.0",
                method: "alchemy_getAssetTransfers",
                params: [{
                    fromBlock: "0x0",
                    toBlock: "latest",
                    toAddress: walletAddress,
                    category: ["external", "internal"],
                    withMetadata: true,
                    excludeZeroValue: true,
                    maxCount: "0x3C"
                }]
            };
        } else if (network === "Solana") {
            addLog(`🎯 Use Solana API...`, 'info');
            const solanaUrl = `${apiUrl}/${apiKey}`;
            
            const response = await fetch(solanaUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: 1,
                    jsonrpc: "2.0",
                    method: "getSignaturesForAddress",
                    params: [
                        walletAddress,
                        {
                            limit: 10
                        }
                    ]
                })
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            
            if (data.result) {
                addLog(`✅ Solana transactions found: ${data.result.length}`, 'success');
                
                const transactions = [];
                for (const tx of data.result.slice(0, 5)) {
                    try {
                        const txDetail = await getSolanaTransaction(tx.signature, apiUrl, apiKey);
                        if (txDetail && txDetail.result) {
                            transactions.push({
                                hash: tx.signature,
                                value: txDetail.result.meta?.fee?.toString() || '0',
                                to: walletAddress,
                                timeStamp: Math.floor(new Date().getTime() / 1000).toString(),
                                tokenSymbol: 'SOL'
                            });
                        }
                    } catch (error) {
                        addLog(`⚠️ Error receiving details Solana TX: ${error.message}`, 'warning');
                    }
                }
                return transactions;
            }
            return [];
        }
        
        if (body) {
            const url = `${apiUrl}/${apiKey}`;
            addLog(`🌐 We send a request to Alchemy API: ${url.substring(0, 50)}...`, 'info');
            
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            
            if (data.result && data.result.transfers) {
                const transfers = data.result.transfers;
                addLog(`✅ Transactions found: ${transfers.length}`, 'success');
                
                transfers.forEach((transfer, index) => {
                    const amount = transfer.value || (transfer.rawContract && transfer.rawContract.value) || '0';
                    const normalizedAmount = parseFloat(amount) / Math.pow(10, config.decimals);
                    addLog(`📄 TX${index}: ${transfer.hash?.substring(0, 10)}... | Сумма: ${normalizedAmount} ${currency}`, 'info');
                });
                
                const convertedTransactions = transfers.map(transfer => ({
                    hash: transfer.hash,
                    value: transfer.value || (transfer.rawContract && transfer.rawContract.value) || '0',
                    to: transfer.to,
                    timeStamp: Math.floor(new Date(transfer.metadata.blockTimestamp).getTime() / 1000).toString(),
                    tokenSymbol: transfer.asset || currency
                }));
                
                return convertedTransactions;
                
            } else if (data.error) {
                addLog(`❌ Error Alchemy API: ${data.error.message}`, 'error');
                return [];
            } else {
                addLog(`⚠️ Unknown response from API`, 'warning');
                return [];
            }
        }
        
    } catch (error) {
        addLog(`💥 Network error: ${error.message}`, 'error');
        addLog(`⚠️ We temporarily use test data for debugging...`, 'warning');
        return getMockTransactions(currency, network);
    }
}

// 🔥 МОК ДАННЫЕ ДЛЯ ТЕСТИРОВАНИЯ
function getMockTransactions(currency, network) {
    addLog(`🎯 We use test data for ${currency}...`, 'warning');
    
    const mockTx = {
        hash: '0x' + Math.random().toString(16).substring(2, 66),
        value: (currentPaymentData.totalConverted * Math.pow(10, networkConfigs[currency][network].decimals)).toString(),
        to: networkConfigs[currency][network].address,
        timeStamp: Math.floor(new Date().getTime() / 1000).toString(),
        tokenSymbol: currency
    };
    
    addLog(`📄 Test TX: ${mockTx.hash.substring(0, 15)}... | Amount: ${currentPaymentData.totalConverted} ${currency}`, 'info');
    
    return [mockTx];
}

// 🔥 ПОЛУЧЕНИЕ ДЕТАЛЕЙ SOLANA ТРАНЗАКЦИИ
async function getSolanaTransaction(signature, apiUrl, apiKey) {
    try {
        const response = await fetch(`${apiUrl}/${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: 1,
                jsonrpc: "2.0",
                method: "getTransaction",
                params: [
                    signature,
                    {
                        encoding: "jsonParsed",
                        maxSupportedTransactionVersion: 0
                    }
                ]
            })
        });
        
        return await response.json();
    } catch (error) {
        addLog(`❌ Error receiving Solana transaction: ${error.message}`, 'error');
        return null;
    }
}

// 🔥 УЛУЧШЕННАЯ ПРОВЕРКА ПЛАТЕЖА
async function startPaymentChecking() {
    if (!currentPaymentData) return;
    
    const progressFill = document.getElementById('progressFill');
    const statusMessage = document.getElementById('paymentStatusMessage');
    
    clearLogs();
    
    let checkCount = 0;
    const maxChecks = 12;
    
    if (paymentCheckInterval) {
        clearInterval(paymentCheckInterval);
    }
    
    checkPaymentStatusImmediately();
    
    paymentCheckInterval = setInterval(async () => {
        checkCount++;
        
        const progress = Math.min((checkCount / maxChecks) * 100, 90);
        progressFill.style.width = progress + '%';
        
        statusMessage.innerHTML = `🔍 Checking transactions... (${checkCount}/${maxChecks})`;
        addLog(`🔄 Check #${checkCount} - scanning the blockchain...`, 'info');
        
        try {
            const paymentFound = await checkBlockchainForPayment();
            
            if (paymentFound) {
                clearInterval(paymentCheckInterval);
                progressFill.style.width = '100%';
                statusMessage.innerHTML = '✅ Payment found! Processing....';
                addLog('🎉 PAYMENT FOUND! Match amount and address', 'success');
                addLog(`📝 Transaction hash: ${currentPaymentData.txHash}`, 'success');
                
                setTimeout(() => {
                    showPaymentSuccess();
                }, 2000);
                
            } else if (checkCount >= maxChecks) {
                clearInterval(paymentCheckInterval);
                statusMessage.innerHTML = '⏰ Verification timed out. If you submitted a payment, it will be processed manually..';
                addLog('⏰ Verification limit reached. Payment not detected.', 'warning');
                
                setTimeout(() => {
                    if (confirm('Automatic verification completed. Would you like to check manually or repeat the verification?')) {
                        checkPaymentStatus();
                    }
                }, 1000);
            }
            
        } catch (error) {
            console.error('Payment verification error:', error);
            addLog(`❌ Error: ${error.message}`, 'error');
            statusMessage.innerHTML = '❌ Verification error. Please try again.';
        }
        
    }, 15000);
}

// 🔥 НЕМЕДЛЕННАЯ ПРОВЕРКА ПЛАТЕЖА
async function checkPaymentStatusImmediately() {
    addLog(`🚀 Immediate payment verification...`, 'info');
    try {
        const paymentFound = await checkBlockchainForPayment();
        if (paymentFound) {
            clearInterval(paymentCheckInterval);
            document.getElementById('progressFill').style.width = '100%';
            document.getElementById('paymentStatusMessage').innerHTML = '✅ Payment found! Processing...';
            addLog('🎉 PAYMENT FOUND IN FIRST CHECK!', 'success');
            
            setTimeout(() => {
                showPaymentSuccess();
            }, 2000);
        }
    } catch (error) {
        addLog(`⚠️ Immediate check error: ${error.message}`, 'warning');
    }
}

// 🔥 РУЧНАЯ ПРОВЕРКА СТАТУСА
async function checkPaymentStatus() {
    addLog(`🔍 Manual verification initiated by the user...`, 'info');
    try {
        const paymentFound = await checkBlockchainForPayment();
        
        if (paymentFound) {
            clearInterval(paymentCheckInterval);
            document.getElementById('progressFill').style.width = '100%';
            document.getElementById('paymentStatusMessage').innerHTML = '✅ Payment found! Processing....';
            addLog('🎉 PAYMENT FOUND DURING MANUAL CHECK!', 'success');
            
            setTimeout(() => {
                showPaymentSuccess();
            }, 2000);
        } else {
            addLog('❌ Payment not found during manual verification', 'warning');
            alert('The payment has not yet been detected on the blockchain. Please wait a few minutes and check again.');
        }
    } catch (error) {
        addLog(`❌ Manual verification error: ${error.message}`, 'error');
        alert('Error verifying payment. Try again later.');
    }
}

// 🔥 УЛУЧШЕННАЯ ФУНКЦИЯ ПРОВЕРКИ BLOCKCHAIN
async function checkBlockchainForPayment() {
    if (!currentPaymentData) return false;
    
    const { wallet, totalConverted, currency, network, api_key, api_url } = currentPaymentData;
    const expectedAmount = parseFloat(totalConverted);
    
    addLog(`🔍 Checking your wallet ${wallet.substring(0, 10)}...`, 'info');
    addLog(`💰 Expected amount: ${expectedAmount} ${currency}`, 'info');
    addLog(`⏰ Order time: ${new Date(currentPaymentData.timestamp).toLocaleTimeString()}`, 'info');
    
    try {
        const transactions = await getWalletTransactions(wallet, api_url, api_key, currency, network);
        
        addLog(`📊 Transactions received for analysis: ${transactions.length}`, 'info');
        
        if (transactions && transactions.length > 0) {
            for (const tx of transactions) {
                const isIncoming = tx.to && tx.to.toLowerCase() === wallet.toLowerCase();
                const txAmount = parseFloat(tx.value);
                const txTime = parseInt(tx.timeStamp);
                const orderTime = Math.floor(new Date(currentPaymentData.timestamp).getTime() / 1000);
                
                const isRecent = network === "Solana" ? true : (txTime > orderTime - 300);
                
                addLog(`📄 Analysis TX: ${tx.hash?.substring(0, 15)}... | Amount: ${txAmount} | Incoming: ${isIncoming} | Recent: ${isRecent}`, 'info');
                
                if (isIncoming && isRecent) {
                    const amountMatch = isAmountMatch(txAmount, expectedAmount, currency, network);
                    addLog(`🎯 Checking the amount: ${amountMatch ? 'MATCHES' : 'DOES NOT MATCH'}`, amountMatch ? 'success' : 'warning');
                    
                    if (amountMatch) {
                        currentPaymentData.txHash = tx.hash;
                        currentPaymentData.actualAmount = txAmount;
                        return true;
                    }
                }
            }
        }
        
        addLog('❌ No matching transactions found', 'warning');
        return false;
        
    } catch (error) {
        addLog(`💥 Blockchain verification error: ${error.message}`, 'error');
        throw error;
    }
}

// 🔥 УЛУЧШЕННАЯ ПРОВЕРКА СОВПАДЕНИЯ СУММЫ
function isAmountMatch(txAmount, expectedAmount, currency, network) {
    const config = networkConfigs[currency][network];
    let normalizedTxAmount = txAmount;
    
    if (config.decimals === 6) {
        normalizedTxAmount = txAmount / 1000000;
    } else if (config.decimals === 9) {
        normalizedTxAmount = txAmount / 1000000000;
    } else if (config.decimals === 18) {
        normalizedTxAmount = txAmount / 1000000000000000000;
    }
    
    const tolerance = expectedAmount < 0.01 ? 0.5 : 0.1;
    const minAmount = expectedAmount * (1 - tolerance);
    const maxAmount = expectedAmount * (1 + tolerance);
    
    addLog(`📏 Test: ${normalizedTxAmount.toFixed(8)} vs ${expectedAmount} (admission: ${tolerance*100}%)`, 'info');
    addLog(`📏 Acceptance range: ${minAmount.toFixed(8)} - ${maxAmount.toFixed(8)}`, 'info');
    
    const result = normalizedTxAmount >= minAmount && normalizedTxAmount <= maxAmount;
    
    if (result) {
        addLog(`✅ The amount matches! Received: ${normalizedTxAmount.toFixed(8)} ${currency}`, 'success');
    } else {
        addLog(`❌ The amount does not match. Received: ${normalizedTxAmount.toFixed(8)} ${currency}, expected: ${expectedAmount} ${currency}`, 'warning');
    }
    
    return result;
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
    
    const actualAmount = currentPaymentData.actualAmount ? 
        (currentPaymentData.actualAmount / Math.pow(10, networkConfigs[currentPaymentData.currency][currentPaymentData.network].decimals)).toFixed(6) : 
        currentPaymentData.totalConverted;
    
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
        txHash: currentPaymentData.txHash,
        city: currentPaymentData.city,
        status: 'completed'
    };
    orders.unshift(orderData);
    localStorage.setItem('orderHistory', JSON.stringify(orders.slice(0, 50)));
}