document.addEventListener('DOMContentLoaded', function() {
    const muInput = document.getElementById('mu-input');
    const tdInput = document.getElementById('td-input');
    const calculationResult = document.getElementById('calculation-result');
    const muUnit = document.getElementById('mu-unit');
    const tdUnit = document.getElementById('td-unit');
    const timeUnitRadios = document.querySelectorAll('input[name="time-unit"]');
    
    const LN2 = Math.LN2; // ln(2) ≈ 0.6931471805599453
    
    let isUpdating = false;
    let currentTimeUnit = 'hours'; // デフォルトは時間単位
    
    function validateInput(value) {
        return !isNaN(value) && value > 0 && isFinite(value);
    }
    
    function formatNumber(num) {
        if (num >= 1000) {
            return num.toExponential(3);
        } else if (num >= 1) {
            return num.toFixed(4);
        } else if (num >= 0.001) {
            return num.toFixed(6);
        } else {
            return num.toExponential(3);
        }
    }
    
    function updateUnits() {
        if (currentTimeUnit === 'hours') {
            muUnit.textContent = 'h⁻¹';
            tdUnit.textContent = 'h';
            muInput.placeholder = '例: 0.1';
            tdInput.placeholder = '例: 6.93';
        } else {
            muUnit.textContent = 'day⁻¹';
            tdUnit.textContent = 'day';
            muInput.placeholder = '例: 2.4';
            tdInput.placeholder = '例: 0.29';
        }
    }
    
    function updateCalculationDisplay(fromValue, toValue, fromUnit, toUnit, formula) {
        calculationResult.innerHTML = `
            <div style="margin-bottom: 10px;">
                <strong>計算過程:</strong><br>
                ${formula}
            </div>
            <div>
                <strong>結果:</strong> ${fromValue} ${fromUnit} → ${toValue} ${toUnit}
            </div>
        `;
    }
    
    function clearCalculationDisplay() {
        calculationResult.innerHTML = '<span style="color: #95a5a6;">値を入力すると計算結果が表示されます</span>';
    }
    
    function convertMuToTd(mu) {
        if (!validateInput(mu)) {
            return null;
        }
        return LN2 / mu;
    }
    
    function convertTdToMu(td) {
        if (!validateInput(td)) {
            return null;
        }
        return LN2 / td;
    }
    
    function handleMuInput() {
        if (isUpdating) return;
        
        const muValue = parseFloat(muInput.value);
        
        if (muInput.value === '') {
            tdInput.value = '';
            clearCalculationDisplay();
            return;
        }
        
        if (!validateInput(muValue)) {
            muInput.style.borderColor = '#e74c3c';
            tdInput.value = '';
            calculationResult.innerHTML = '<span style="color: #e74c3c;">正の数値を入力してください</span>';
            return;
        }
        
        muInput.style.borderColor = '#27ae60';
        
        const tdValue = convertMuToTd(muValue);
        if (tdValue !== null) {
            isUpdating = true;
            tdInput.value = formatNumber(tdValue);
            tdInput.style.borderColor = '#27ae60';
            
            const muUnitText = currentTimeUnit === 'hours' ? 'h⁻¹' : 'day⁻¹';
            const tdUnitText = currentTimeUnit === 'hours' ? 'h' : 'day';
            
            updateCalculationDisplay(
                formatNumber(muValue),
                formatNumber(tdValue),
                muUnitText,
                tdUnitText,
                `td = ln(2) / μ = ${LN2.toFixed(4)} / ${formatNumber(muValue)} = ${formatNumber(tdValue)}`
            );
            
            isUpdating = false;
        }
    }
    
    function handleTdInput() {
        if (isUpdating) return;
        
        const tdValue = parseFloat(tdInput.value);
        
        if (tdInput.value === '') {
            muInput.value = '';
            clearCalculationDisplay();
            return;
        }
        
        if (!validateInput(tdValue)) {
            tdInput.style.borderColor = '#e74c3c';
            muInput.value = '';
            calculationResult.innerHTML = '<span style="color: #e74c3c;">正の数値を入力してください</span>';
            return;
        }
        
        tdInput.style.borderColor = '#27ae60';
        
        const muValue = convertTdToMu(tdValue);
        if (muValue !== null) {
            isUpdating = true;
            muInput.value = formatNumber(muValue);
            muInput.style.borderColor = '#27ae60';
            
            const muUnitText = currentTimeUnit === 'hours' ? 'h⁻¹' : 'day⁻¹';
            const tdUnitText = currentTimeUnit === 'hours' ? 'h' : 'day';
            
            updateCalculationDisplay(
                formatNumber(tdValue),
                formatNumber(muValue),
                tdUnitText,
                muUnitText,
                `μ = ln(2) / td = ${LN2.toFixed(4)} / ${formatNumber(tdValue)} = ${formatNumber(muValue)}`
            );
            
            isUpdating = false;
        }
    }
    
    function resetInputStyle(input) {
        if (input.value === '') {
            input.style.borderColor = '#bdc3c7';
        }
    }
    
    // 単位変更イベントリスナー
    function handleUnitChange() {
        currentTimeUnit = document.querySelector('input[name="time-unit"]:checked').value;
        updateUnits();
        
        // 入力値をクリアして再計算
        muInput.value = '';
        tdInput.value = '';
        clearCalculationDisplay();
        resetInputStyles();
    }
    
    function resetInputStyles() {
        muInput.style.borderColor = '#bdc3c7';
        tdInput.style.borderColor = '#bdc3c7';
    }
    
    // イベントリスナー登録
    timeUnitRadios.forEach(radio => {
        radio.addEventListener('change', handleUnitChange);
    });
    
    muInput.addEventListener('input', handleMuInput);
    tdInput.addEventListener('input', handleTdInput);
    
    muInput.addEventListener('blur', function() {
        resetInputStyle(muInput);
    });
    
    tdInput.addEventListener('blur', function() {
        resetInputStyle(tdInput);
    });
    
    muInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            tdInput.focus();
        }
    });
    
    tdInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            muInput.focus();
        }
    });
    
    // 初期化
    updateUnits();
    clearCalculationDisplay();
    
    // Advertisement functionality
    function initializeAds() {
        // Placeholder for Google AdSense initialization
        // This function will be used to initialize actual AdSense code
        console.log('Advertisement spaces initialized');
        
        // Add hover effects to ad placeholders
        const adSpaces = document.querySelectorAll('.ad-placeholder');
        adSpaces.forEach(adSpace => {
            adSpace.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.02)';
                this.style.transition = 'transform 0.2s ease';
            });
            
            adSpace.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
        });
    }
    
    // Initialize ads when page loads
    initializeAds();
    
    // Function to load actual AdSense ads (to be called when implementing real ads)
    function loadGoogleAds() {
        // This function will contain the actual Google AdSense code
        // Example structure:
        /*
        (adsbygoogle = window.adsbygoogle || []).push({
            google_ad_client: "ca-pub-XXXXXXXXXX",
            enable_page_level_ads: true
        });
        */
        console.log('Google AdSense would be loaded here');
    }
    
    // Responsive ad layout adjustments
    function adjustAdLayout() {
        const screenWidth = window.innerWidth;
        const sidebarAds = document.querySelectorAll('.ad-sidebar');
        
        if (screenWidth <= 768) {
            // Mobile layout adjustments
            sidebarAds.forEach(ad => {
                ad.style.maxWidth = '100%';
            });
        } else {
            // Desktop layout
            sidebarAds.forEach(ad => {
                ad.style.maxWidth = '300px';
            });
        }
    }
    
    // Adjust layout on window resize
    window.addEventListener('resize', adjustAdLayout);
    adjustAdLayout(); // Initial call
});