function updateDeviceInfo() {
    const deviceSelect = document.getElementById('deviceSelect');
    const [ppi, dpr] = deviceSelect.value.split(',');
    if (ppi && dpr) {
        document.getElementById('ppi').value = ppi;
        document.getElementById('dpr').value = dpr;
    }
}

function calculate() {
    const diagonalMm = parseFloat(document.getElementById('diagonalLength').value);
    const ppi = parseFloat(document.getElementById('ppi').value);
    const dpr = parseFloat(document.getElementById('dpr').value);
    if (isNaN(diagonalMm) || diagonalMm <= 0 || isNaN(ppi) || ppi <= 0 || isNaN(dpr) || dpr <= 0) {
        alert('올바른 값을 입력해주세요.');
        return;
    }

    const diagonalInches = diagonalMm / 25.4;
    const diagonalPhysicalPixels = diagonalInches * ppi;
    const sidePhysicalPixels = diagonalPhysicalPixels / Math.sqrt(2);
    const sideCSSPixels = sidePhysicalPixels / dpr;
    const roundedCSSPixels = Math.round(sideCSSPixels);

    const resultText = `
        타겟 대각선 길이: ${diagonalMm}mm (${diagonalInches.toFixed(4)} inches)<br>
        화면 해상도: ${ppi} PPI<br>
        디스플레이 배율: ${dpr}x<br>
        타겟 한 변의 길이 (물리적 픽셀): ${sidePhysicalPixels.toFixed(2)} 픽셀<br>
        타겟 한 변의 길이 (CSS 픽셀): ${sideCSSPixels.toFixed(2)} 픽셀<br>
        권장 CSS 픽셀 크기: ${roundedCSSPixels}px
    `;

    document.getElementById('result').innerHTML = resultText;

    const targetButton = document.getElementById('target-button');
    targetButton.style.width = `${roundedCSSPixels}px`;
    targetButton.style.height = `${roundedCSSPixels}px`;
    
    const targetSizeLabel = document.getElementById('target-size-label');
    targetSizeLabel.textContent = `${roundedCSSPixels}px`;

    document.getElementById('warning').innerHTML = `
        주의: 실제 물리적 크기는 화면 설정과 기기에 따라 다를 수 있습니다.<br>
        이 시각화는 참고용이며, 정확한 물리적 크기를 보장하지 않습니다.
    `;

    setupButtonInteractions();
}

function setupButtonInteractions() {
    const targetButton = document.getElementById('target-button');
    const feedbackSpan = document.getElementById('interaction-feedback');

    targetButton.onmouseover = () => {
        feedbackSpan.textContent = "마우스 오버";
    };

    targetButton.onmouseout = () => {
        feedbackSpan.textContent = "";
    };

    targetButton.onclick = () => {
        feedbackSpan.textContent = "클릭";
    };

    targetButton.ontouchstart = (e) => {
        e.preventDefault(); // 기본 동작 방지
        feedbackSpan.textContent = "터치";
    };
}

function resetCalculator() {
    document.getElementById('diagonalLength').value = '6';
    document.getElementById('deviceSelect').value = '';
    document.getElementById('ppi').value = '96';
    document.getElementById('dpr').value = '1';
    document.getElementById('result').innerHTML = '';
    document.getElementById('warning').innerHTML = '';
    const targetButton = document.getElementById('target-button');
    targetButton.style.width = '50px';
    targetButton.style.height = '50px';
    document.getElementById('target-size-label').textContent = '';
    document.getElementById('interaction-feedback').textContent = '';
}

// 페이지 로드 시 기본값으로 계산 실행
window.onload = calculate;