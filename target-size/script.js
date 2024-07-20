function detectDevice() {
    const userAgent = navigator.userAgent;
    const devicePixelRatio = window.devicePixelRatio || 1;
    let detectedModel = "알 수 없는 기기";
    let ppi = 96; // PC 기본값
    let scaleFactor = devicePixelRatio;

    if (/iPhone/.test(userAgent)) {
        if (/iPhone1[345]/.test(userAgent)) {
            detectedModel = "iPhone 15 시리즈";
            ppi = 460;
            scaleFactor = 3;
        } else if (/iPhone14,([34])/.test(userAgent)) {
            detectedModel = "iPhone 14 Pro/Pro Max";
            ppi = 460;
            scaleFactor = 3;
        } else if (/iPhone12,([5-8])/.test(userAgent)) {
            detectedModel = "iPhone 13 Pro/Pro Max";
            ppi = 460;
            scaleFactor = 3;
        } else {
            detectedModel = "iPhone (기타 모델)";
            ppi = 326;
            scaleFactor = 2;
        }
    } else if (/Android/.test(userAgent)) {
        if (/SM-G998/.test(userAgent)) {
            detectedModel = "Samsung Galaxy S21 Ultra";
            ppi = 515;
            scaleFactor = 3.5;
        } else if (/Pixel 6/.test(userAgent)) {
            detectedModel = "Google Pixel 6";
            ppi = 421;
            scaleFactor = 2.5;
        } else {
            detectedModel = "Android (기타 모델)";
            ppi = 400;
            scaleFactor = 2.75;
        }
    } else {
        detectedModel = "PC/기타 기기";
    }

    document.getElementById('deviceInfo').textContent = `감지된 기기: ${detectedModel}, 예상 PPI: ${ppi}, 디스플레이 배율: ${scaleFactor.toFixed(1)}`;
    document.getElementById('ppi').value = ppi;
    document.getElementById('scaleFactor').value = scaleFactor.toFixed(1);

    // 기기 모델 선택 옵션 업데이트
    const modelSelect = document.getElementById('deviceModel');
    for (let i = 0; i < modelSelect.options.length; i++) {
        if (modelSelect.options[i].text.includes(detectedModel)) {
            modelSelect.selectedIndex = i;
            break;
        }
    }
}

function updateDeviceInfo() {
    const deviceModel = document.getElementById('deviceModel');
    const [ppi, scaleFactor, modelName] = deviceModel.value.split(',');
    if (ppi && scaleFactor) {
        document.getElementById('ppi').value = ppi;
        document.getElementById('scaleFactor').value = scaleFactor;
    }
}

function calculate() {
    const diagonalMm = parseFloat(document.getElementById('diagonalLength').value);
    const ppi = parseFloat(document.getElementById('ppi').value);
    const scaleFactor = parseFloat(document.getElementById('scaleFactor').value);
    const modelName = document.getElementById('deviceModel').options[document.getElementById('deviceModel').selectedIndex].text;

    if (isNaN(diagonalMm) || diagonalMm <= 0 || isNaN(ppi) || ppi <= 0 || isNaN(scaleFactor) || scaleFactor <= 0) {
        alert('올바른 값을 입력해주세요.');
        return;
    }

    const diagonalInches = diagonalMm / 25.4;
    const diagonalPhysicalPixels = diagonalInches * ppi;
    const sidePhysicalPixels = diagonalPhysicalPixels / Math.sqrt(2);
    const sideCSSPixels = sidePhysicalPixels / scaleFactor;
    const roundedCSSPixels = Math.round(sideCSSPixels);

    const targetButton = document.getElementById('target-button');
    targetButton.style.width = `${roundedCSSPixels}px`;
    targetButton.style.height = `${roundedCSSPixels}px`;
    
    const targetSizeLabel = document.getElementById('target-size-label');
    targetSizeLabel.textContent = `${roundedCSSPixels}px`;

    const resultText = `
        <li><strong>선택된 모델:</strong> ${modelName}</li>
        <li><strong>타겟 대각선 길이:</strong> ${diagonalMm}mm (${diagonalInches.toFixed(4)} inches)</li>
        <li><strong>화면 해상도:</strong> ${ppi} PPI</li>
        <li><strong>디스플레이 배율:</strong> ${scaleFactor}x</li>
        <li><strong>타겟 한 변의 길이 (물리적 픽셀):</strong> ${sidePhysicalPixels.toFixed(2)} 픽셀</li>
        <li><strong>타겟 한 변의 길이 (CSS 픽셀):</strong> ${sideCSSPixels.toFixed(2)} 픽셀</li>
        <li><strong>변환 CSS 픽셀 크기:</strong> ${roundedCSSPixels}px</li>
    `;

    document.getElementById('result').innerHTML = resultText;

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
        e.preventDefault();
        feedbackSpan.textContent = "터치";
    };
}

function resetCalculator() {
    document.getElementById('diagonalLength').value = '6';
    document.getElementById('deviceModel').value = '';
    document.getElementById('ppi').value = '96';
    document.getElementById('scaleFactor').value = '1';
    document.getElementById('result').innerHTML = '';
    document.getElementById('warning').innerHTML = '';
    const targetButton = document.getElementById('target-button');
    targetButton.style.width = '50px';
    targetButton.style.height = '50px';
    document.getElementById('target-size-label').textContent = '';
    document.getElementById('interaction-feedback').textContent = '';
    detectDevice();
}

window.onload = () => {
    detectDevice();
    updateDeviceInfo();
};