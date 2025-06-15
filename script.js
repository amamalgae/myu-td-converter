document.addEventListener('DOMContentLoaded', function() {
    const muInput = document.getElementById('mu-input');
    const tdInput = document.getElementById('td-input');
    const calculationResult = document.getElementById('calculation-result');
    
    const LN2 = Math.LN2; // ln(2) ≈ 0.6931471805599453
    
    let isUpdating = false;
    
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
            
            updateCalculationDisplay(
                formatNumber(muValue),
                formatNumber(tdValue),
                'h⁻¹',
                'h',
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
            
            updateCalculationDisplay(
                formatNumber(tdValue),
                formatNumber(muValue),
                'h',
                'h⁻¹',
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
    
    clearCalculationDisplay();
});