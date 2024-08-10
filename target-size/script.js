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
            detectedModel = "iPhone (other)";
            ppi = 326;
            scaleFactor = 2;
        }
    } else if (/iPad/.test(userAgent)) {
        if (/iPad13,([1-2])/.test(userAgent)) {
            detectedModel = "iPad Pro 12.9-inch (5th gen)";
            ppi = 264;
            scaleFactor = 2;
        } else if (/iPad13,([4-6])/.test(userAgent)) {
            detectedModel = "iPad Pro 11-inch (3rd gen)";
            ppi = 264;
            scaleFactor = 2;
        } else if (/iPad13,16/.test(userAgent)) {
            detectedModel = "iPad Air (5th gen)";
            ppi = 264;
            scaleFactor = 2;
        } else if (/iPad14,1/.test(userAgent)) {
            detectedModel = "iPad mini (6th gen)";
            ppi = 326;
            scaleFactor = 2;
        } else {
            detectedModel = "iPad (other)";
            ppi = 264;
            scaleFactor = 2;
        }
    } else if (/Android/.test(userAgent)) {
        // Samsung
        if (/SM-S908[BNE]/.test(userAgent)) {
            detectedModel = "Samsung Galaxy S22 Ultra";
            ppi = 500;
        } else if (/SM-S901[BNE]/.test(userAgent)) {
            detectedModel = "Samsung Galaxy S22";
            ppi = 422;
        } else if (/SM-S906[BNE]/.test(userAgent)) {
            detectedModel = "Samsung Galaxy S22+";
            ppi = 393;
        } else if (/SM-G998[BNE]/.test(userAgent)) {
            detectedModel = "Samsung Galaxy S21 Ultra";
            ppi = 515;
        } else if (/SM-G991[BNE]/.test(userAgent)) {
            detectedModel = "Samsung Galaxy S21";
            ppi = 421;
        } else if (/SM-F926[BNE]/.test(userAgent)) {
            detectedModel = "Samsung Galaxy Z Fold3";
            ppi = 374;
        } else if (/SM-F711[BNE]/.test(userAgent)) {
            detectedModel = "Samsung Galaxy Z Flip3";
            ppi = 425;
        } else if (/SM-X900/.test(userAgent)) {
            detectedModel = "Samsung Galaxy Tab S8 Ultra";
            ppi = 240;
        } else if (/SM-T970/.test(userAgent)) {
            detectedModel = "Samsung Galaxy Tab S7+";
            ppi = 266;
        }
        // Google Pixel
        else if (/Pixel 6 Pro/.test(userAgent)) {
            detectedModel = "Google Pixel 6 Pro";
            ppi = 512;
        } else if (/Pixel 6/.test(userAgent)) {
            detectedModel = "Google Pixel 6";
            ppi = 411;
        } else if (/Pixel 5/.test(userAgent)) {
            detectedModel = "Google Pixel 5";
            ppi = 432;
        } else if (/Pixel 4 XL/.test(userAgent)) {
            detectedModel = "Google Pixel 4 XL";
            ppi = 537;
        } else if (/Pixel 4/.test(userAgent)) {
            detectedModel = "Google Pixel 4";
            ppi = 444;
        }
        // OnePlus
        else if (/OnePlus 9 Pro/.test(userAgent)) {
            detectedModel = "OnePlus 9 Pro";
            ppi = 525;
        }
        // Xiaomi
        else if (/Mi 11/.test(userAgent)) {
            detectedModel = "Xiaomi Mi 11";
            ppi = 515;
        }
        // Sony
        else if (/XQ-BC72/.test(userAgent)) {
            detectedModel = "Sony Xperia 1 III";
            ppi = 643;
        }
        // Huawei
        else if (/ELS-NX9/.test(userAgent)) {
            detectedModel = "Huawei P40 Pro";
            ppi = 441;
        }
        // Motorola
        else if (/motorola edge\+/.test(userAgent)) {
            detectedModel = "Motorola Edge+";
            ppi = 385;
        }
        // LG (참고: LG는 스마트폰 사업을 중단했지만, 기존 기기를 위해 포함)
        else if (/LM-G900/.test(userAgent)) {
            detectedModel = "LG Velvet";
            ppi = 395;
        } else if (/LM-V600/.test(userAgent)) {
            detectedModel = "LG V60 ThinQ";
            ppi = 395;
        } else {
            detectedModel = "Android 기기";
            ppi = 160 * devicePixelRatio;
        }
        scaleFactor = devicePixelRatio;
    }

    document.getElementById('deviceInfo').textContent = `감지된 기기: ${detectedModel}, 예상 화면 픽셀 밀도: ${ppi} PPI, 디스플레이 배율: ${scaleFactor.toFixed(1)}`;
    document.getElementById('ppi').value = ppi;
    document.getElementById('scaleFactor').value = scaleFactor.toFixed(1);

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

    // WCAG 2.2 가이드라인에 따른 최소 간격 계산 (타겟 크기 포함)
    updateTargetInfo(roundedCSSPixels);

    const target1Wrapper = document.getElementById('target-1-wrapper');
    const targetsContainer = document.getElementById('targets-2-to-4');
    target1Wrapper.innerHTML = '';
    targetsContainer.innerHTML = '';

    // 단일 타겟 (1번) 생성
    const originalTarget = createTargetButton(roundedCSSPixels, 1);
    target1Wrapper.appendChild(originalTarget);
    target1Wrapper.style.width = `${roundedCSSPixels}px`;
    target1Wrapper.style.height = `${roundedCSSPixels}px`;

    // 연속 타겟 생성 및 배치
    for (let i = 0; i < 3; i++) {
        const sequenceTarget = createTargetButton(roundedCSSPixels, i + 2);
        sequenceTarget.style.left = `${i * roundedCSSPixels}px`;
        targetsContainer.appendChild(sequenceTarget);
    }

    // 타겟 컨테이너의 크기 설정 (최소 200px, 필요시 더 크게)
    const calculatedWidth = 3 * roundedCSSPixels;
    const containerWidth = Math.max(200, calculatedWidth);
    targetsContainer.style.width = `${containerWidth}px`;
    targetsContainer.style.height = `${roundedCSSPixels}px`;

    const resultText = `
        <li><strong>선택된 모델:</strong> ${modelName}</li>
        <li><strong>타겟 대각선 길이:</strong> ${diagonalMm}mm (${diagonalInches.toFixed(4)} inches)</li>
        <li><strong>화면 픽셀 밀도:</strong> ${ppi} PPI</li>
        <li><strong>디스플레이 배율:</strong> ${scaleFactor}x</li>
        <li><strong>타겟 한 변의 길이 (물리적 픽셀):</strong> ${sidePhysicalPixels.toFixed(2)} 픽셀</li>
        <li><strong>타겟 한 변의 길이 (CSS 픽셀):</strong> ${sideCSSPixels.toFixed(2)} 픽셀</li>
        <li><strong>변환 CSS 픽셀 크기:</strong> ${roundedCSSPixels}px</li>
    `;

    document.getElementById('result').innerHTML = resultText;
    document.getElementById('warning').innerHTML = `
        주의: 실제 물리적 크기는 화면 설정과 기기에 따라 다를 수 있습니다.<br>
        이 시각화는 참고용이며, 정확한 물리적 크기를 보장하지 않습니다.<br>
        소수점 단위의 CSS pixel은 반올림 처리합니다.
    `;

    setupButtonInteractions();
}

function updateTargetInfo(targetSize) {
    document.getElementById('target-size-value').textContent = `${targetSize}px`;
    // document.getElementById('target-spacing-value').textContent = `${targetSize}px`;
}


function createTargetButton(size, number) {
    const targetButton = document.createElement('div');
    targetButton.className = 'target-button';
    targetButton.style.width = `${size}px`;
    targetButton.style.height = `${size}px`;
    targetButton.textContent = number;
    return targetButton;
}

function updateTargetInfo(targetSize, spacing) {
    document.getElementById('target-size-value').textContent = `${targetSize}px`;
    // document.getElementById('target-spacing-value').textContent = `${spacing}px`;
}

function setupButtonInteractions() {
    const targetButtons = document.querySelectorAll('.target-button');
    const interactionContent = document.getElementById('interaction-content');

    targetButtons.forEach((button) => {
        button.onmouseover = () => {
            updateInteractionInfo(`타겟 ${button.textContent} 마우스 오버`);
        };

        button.onmouseout = () => {
            updateInteractionInfo("");
        };

        button.onclick = () => {
            updateInteractionInfo(`타겟 ${button.textContent} 클릭`);
        };

        button.ontouchstart = (e) => {
            e.preventDefault();
            updateInteractionInfo(`타겟 ${button.textContent} 터치`);
        };
    });
}

function updateInteractionInfo(content) {
    const interactionContent = document.getElementById('interaction-content');
    interactionContent.textContent = content;
}

function resetCalculator() {
    document.getElementById('diagonalLength').value = '6';
    document.getElementById('deviceModel').value = '';
    document.getElementById('ppi').value = '96';
    document.getElementById('scaleFactor').value = '1';
    document.getElementById('result').innerHTML = '';
    document.getElementById('warning').innerHTML = '';
    const target1Container = document.getElementById('target-1');
    const targetsContainer = document.getElementById('targets-2-to-4');
    target1Container.innerHTML = '';
    targetsContainer.innerHTML = '';
    updateTargetInfo('-', '-');
    detectDevice();
}

window.onload = () => {
    resetCalculator();
    detectDevice();
    updateDeviceInfo();
    updateInteractionInfo();
};