let devicesData = {
    "devices": [
        {
            "category": "iPhone",
            "models": [
                { "name": "iPhone 15 시리즈", "ppi": 460, "dpr": 3, "scaleFactor": 1 },
                { "name": "iPhone 14 Pro/Pro Max", "ppi": 460, "dpr": 3, "scaleFactor": 1 },
                { "name": "iPhone 13 Pro/Pro Max", "ppi": 460, "dpr": 3, "scaleFactor": 1 },
                { "name": "iPhone SE (2nd/3rd gen)", "ppi": 326, "dpr": 2, "scaleFactor": 1 },
                { "name": "iPhone 12 mini", "ppi": 401, "dpr": 3, "scaleFactor": 1 },
                { "name": "iPhone 11", "ppi": 326, "dpr": 2, "scaleFactor": 1 },
                { "name": "iPhone 8/7/6s/6", "ppi": 326, "dpr": 2, "scaleFactor": 1 }
            ]
        },
        {
            "category": "iPad",
            "models": [
                { "name": "iPad Pro 12.9-inch (5th gen)", "ppi": 264, "dpr": 2, "scaleFactor": 1 },
                { "name": "iPad Pro 11-inch (3rd gen)", "ppi": 264, "dpr": 2, "scaleFactor": 1 },
                { "name": "iPad Air (5th gen)", "ppi": 264, "dpr": 2, "scaleFactor": 1 },
                { "name": "iPad mini (6th gen)", "ppi": 326, "dpr": 2, "scaleFactor": 1 },
                { "name": "iPad (9th gen)", "ppi": 264, "dpr": 2, "scaleFactor": 1 }
            ]
        },
        {
            "category": "Samsung Galaxy",
            "models": [
                { "name": "Samsung Galaxy S22 Ultra", "ppi": 500, "dpr": 4, "scaleFactor": 1 },
                { "name": "Samsung Galaxy S22", "ppi": 422, "dpr": 3, "scaleFactor": 1 },
                { "name": "Samsung Galaxy S22+", "ppi": 393, "dpr": 3, "scaleFactor": 1 },
                { "name": "Samsung Galaxy S21 Ultra", "ppi": 515, "dpr": 3.75, "scaleFactor": 1 },
                { "name": "Samsung Galaxy S21", "ppi": 421, "dpr": 3, "scaleFactor": 1 },
                { "name": "Samsung Galaxy S20 Ultra", "ppi": 525, "dpr": 3.5, "scaleFactor": 1 },
                { "name": "Samsung Galaxy S20", "ppi": 563, "dpr": 4, "scaleFactor": 1 },
                { "name": "Samsung Galaxy S10+", "ppi": 522, "dpr": 3.5, "scaleFactor": 1 },
                { "name": "Samsung Galaxy S10", "ppi": 550, "dpr": 4, "scaleFactor": 1 },
                { "name": "Samsung Galaxy S9+", "ppi": 529, "dpr": 4, "scaleFactor": 1 },
                { "name": "Samsung Galaxy S9", "ppi": 570, "dpr": 4, "scaleFactor": 1 },
                { "name": "Samsung Galaxy Z Fold2", "ppi": 373, "dpr": 2, "scaleFactor": 1 },
                { "name": "Samsung Galaxy Z Flip", "ppi": 425, "dpr": 2.625, "scaleFactor": 1 },
                { "name": "Samsung Galaxy Note 20 Ultra", "ppi": 496, "dpr": 3.5, "scaleFactor": 1 },
                { "name": "Samsung Galaxy Note 20", "ppi": 393, "dpr": 2.625, "scaleFactor": 1 }
            ]
        },
        {
            "category": "Samsung Galaxy Tab",
            "models": [
                { "name": "Samsung Galaxy Tab S8 Ultra", "ppi": 266, "dpr": 2, "scaleFactor": 1 },
                { "name": "Samsung Galaxy Tab S7+", "ppi": 274, "dpr": 2, "scaleFactor": 1 },
                { "name": "Samsung Galaxy Tab S6", "ppi": 276, "dpr": 2, "scaleFactor": 1 },
                { "name": "Samsung Galaxy Tab A7", "ppi": 287, "dpr": 1.5, "scaleFactor": 1 }
            ]
        },
        {
            "category": "Google Pixel",
            "models": [
                { "name": "Google Pixel 6 Pro", "ppi": 441, "dpr": 3, "scaleFactor": 1 },
                { "name": "Google Pixel 6", "ppi": 411, "dpr": 2.625, "scaleFactor": 1 },
                { "name": "Google Pixel 5", "ppi": 432, "dpr": 3, "scaleFactor": 1 },
                { "name": "Google Pixel 4 XL", "ppi": 444, "dpr": 2.75, "scaleFactor": 1 },
                { "name": "Google Pixel 4", "ppi": 444, "dpr": 2.75, "scaleFactor": 1 }
            ]
        },
        {
            "category": "Other Android",
            "models": [
                { "name": "OnePlus 9 Pro", "ppi": 403, "dpr": 2.75, "scaleFactor": 1 },
                { "name": "Xiaomi Mi 11", "ppi": 393, "dpr": 2.75, "scaleFactor": 1 },
                { "name": "Sony Xperia 1 III", "ppi": 443, "dpr": 3.5, "scaleFactor": 1 },
                { "name": "Huawei P40 Pro", "ppi": 387, "dpr": 2.75, "scaleFactor": 1 },
                { "name": "Motorola Edge+", "ppi": 370, "dpr": 3, "scaleFactor": 1 }
            ]
        },
        {
            "category": "Laptops",
            "models": [
                { "name": "MacBook Pro 16-inch (2021)", "ppi": 254, "dpr": 2, "scaleFactor": 1 },
                { "name": "MacBook Pro 14-inch (2021)", "ppi": 254, "dpr": 2, "scaleFactor": 1 },
                { "name": "MacBook Air 13-inch (M1, 2020)", "ppi": 227, "dpr": 2, "scaleFactor": 1 },
                { "name": "Dell XPS 15 (4K)", "ppi": 282, "dpr": 2, "scaleFactor": 1.5 },
                { "name": "Dell XPS 13 (4K)", "ppi": 331, "dpr": 2, "scaleFactor": 1.5 },
                { "name": "HP Spectre x360 14 (3K2K)", "ppi": 254, "dpr": 2, "scaleFactor": 1.5 },
                { "name": "Lenovo ThinkPad X1 Carbon (4K)", "ppi": 331, "dpr": 2, "scaleFactor": 1.5 },
                { "name": "Microsoft Surface Laptop 4 (13.5-inch)", "ppi": 201, "dpr": 1.5, "scaleFactor": 1.25 },
                { "name": "ASUS ROG Zephyrus G14 (QHD)", "ppi": 204, "dpr": 1.5, "scaleFactor": 1.25 },
                { "name": "Razer Blade 15 (4K OLED)", "ppi": 282, "dpr": 2, "scaleFactor": 1.5 }
            ]
        }
    ]
};

function detectDevice() {
    const userAgent = navigator.userAgent;
    const dpr = window.devicePixelRatio || 1;
    let detectedModel = "알 수 없는 기기";
    let ppi = 96; // PC 기본값
    let scaleFactor = 1;

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

    // 감지된 정보를 화면에 표시
    const deviceInfoElement = document.getElementById('deviceInfo');
    if (deviceInfoElement) {
        deviceInfoElement.textContent = `감지된 기기: ${detectedModel}, 예상 화면 픽셀 밀도: ${ppi} PPI, Device Pixel Ratio: ${dpr.toFixed(2)}, Scale Factor: ${scaleFactor}`;
    } else {
        console.error('deviceInfo element not found');
    }

    // PPI 입력 필드 업데이트
    const ppiInput = document.getElementById('ppi');
    if (ppiInput) {
        ppiInput.value = ppi;
    } else {
        console.error('ppi input element not found');
    }

    // DPR 입력 필드 업데이트
    const dprInput = document.getElementById('dpr');
    if (dprInput) {
        dprInput.value = dpr.toFixed(2);
    } else {
        console.error('dpr input element not found');
    }

    // Scale Factor 입력 필드 업데이트
    // const scaleFactorInput = document.getElementById('scaleFactor');
    // if (scaleFactorInput) {
    //     scaleFactorInput.value = scaleFactor;
    // } else {
    //     console.error('scaleFactor input element not found');
    // }

    // 기기 모델 선택 업데이트
    const modelSelect = document.getElementById('deviceModel');
    if (modelSelect) {
        for (let i = 0; i < modelSelect.options.length; i++) {
            if (modelSelect.options[i].text.includes(detectedModel)) {
                modelSelect.selectedIndex = i;
                break;
            }
        }
    } else {
        console.error('deviceModel select element not found');
    }
}

function updateDeviceInfo() {
    const deviceModel = document.getElementById('deviceModel');
    const [ppi, scaleFactor, dpr, modelName] = deviceModel.value.split(',');
    if (ppi && scaleFactor && dpr) {
        document.getElementById('ppi').value = ppi;
        // document.getElementById('scaleFactor').value = scaleFactor;
        document.getElementById('dpr').value = dpr;
    }
}

function calculate() {
    const diagonalMm = parseFloat(document.getElementById('diagonalLength').value);
    const ppi = parseFloat(document.getElementById('ppi').value);
    const dpr = window.devicePixelRatio || 1;
    const modelName = document.getElementById('deviceModel').options[document.getElementById('deviceModel').selectedIndex].text;

    if (isNaN(diagonalMm) || diagonalMm <= 0 || isNaN(ppi) || ppi <= 0) {
        alert('올바른 값을 입력해주세요.');
        return;
    }

    const diagonalInches = diagonalMm / 25.4;
    const diagonalPhysicalPixels = diagonalInches * ppi;
    const sidePhysicalPixels = diagonalPhysicalPixels / Math.sqrt(2);
    const sideCSSPixels = sidePhysicalPixels / dpr;
    const roundedCSSPixels = Math.round(sideCSSPixels);

    // 물리적 크기 계산 (mm)
    const physicalSizeMm = (roundedCSSPixels * dpr * 25.4) / ppi;

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
        <li><strong>타겟 대각선 길이:</strong> ${diagonalMm.toFixed(2)}mm (${diagonalInches.toFixed(4)} inches)</li>
        <li><strong>화면 픽셀 밀도:</strong> ${ppi} PPI</li>
        <li><strong>Device Pixel Ratio:</strong> ${dpr}</li>
        <li><strong>타겟 대각선 길이 (물리적 픽셀):</strong> ${diagonalPhysicalPixels.toFixed(2)} 픽셀</li>
        <li><strong>타겟 한 변의 길이 (물리적 픽셀):</strong> ${sidePhysicalPixels.toFixed(2)} 픽셀</li>
        <li><strong>타겟 한 변의 길이 (CSS 픽셀):</strong> ${sideCSSPixels.toFixed(2)} 픽셀</li>
        <li><strong>타겟 한 변의 길이 (반올림된 CSS 픽셀):</strong> ${roundedCSSPixels}px</li>
        <li><strong>실제 물리적 크기 (대각선):</strong> ${(physicalSizeMm * Math.sqrt(2)).toFixed(2)}mm</li>
        <li><strong>실제 물리적 크기 (한 변):</strong> ${physicalSizeMm.toFixed(2)}mm</li>
    `;

    document.getElementById('result').innerHTML = resultText;
    document.getElementById('warning').innerHTML = `
        주의: 실제 물리적 크기는 화면 설정과 기기에 따라 다를 수 있습니다.<br>
        이 시각화는 참고용이며, 정확한 물리적 크기를 보장하지 않습니다.<br>
        CSS 픽셀 값은 정수로 반올림됩니다.
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
    // document.getElementById('scaleFactor').value = '1';
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

// 물리적 크기 계산
function calculatePhysicalSize(cssPixels, ppi, dpr) {
    const physicalPixels = cssPixels * dpr;
    const inchSize = (physicalPixels * Math.sqrt(2)) / ppi;
    return inchSize * 25.4; // inch를 mm로 변환
}

// 표 생성
function generateTable() {
    const table = document.getElementById('sizeByDevice');
    if (!table) {
        console.error('Table not found');
        return;
    }

    table.innerHTML = '<caption>CSS 픽셀 크기별 물리적 크기 환산(대각선 길이, mm)</caption>';

    const cssPixelSizes = [16, 24, 32, 44, 48]; // CSS 픽셀 크기

    // thead 생성
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');

    // '기기' 열 헤더
    const deviceHeader = document.createElement('th');
    deviceHeader.textContent = '기기';
    headerRow.appendChild(deviceHeader);

    // CSS 픽셀 크기 열 헤더
    cssPixelSizes.forEach(size => {
        const sizeHeader = document.createElement('th');
        sizeHeader.textContent = `${size}px`;
        headerRow.appendChild(sizeHeader);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    // tbody 생성
    const tbody = document.createElement('tbody');

    devicesData.devices.forEach(category => {
        category.models.forEach(device => {
            const row = document.createElement('tr');

            // 기기 이름 셀
            const nameCell = document.createElement('th');
            nameCell.classList.add("device-name");
            nameCell.textContent = device.name;
            row.appendChild(nameCell);

            // CSS 픽셀 크기별 물리적 크기 계산 및 셀 추가
            cssPixelSizes.forEach(pixelSize => {
                const sizeCell = document.createElement('td');
                const physicalSize = calculatePhysicalSize(pixelSize, device.ppi, device.dpr);
                sizeCell.textContent = physicalSize.toFixed(2);
                row.appendChild(sizeCell);
                if (physicalSize < 6) {
                    sizeCell.classList.add("small")
                }
            });

            tbody.appendChild(row);
        });
    });

    table.appendChild(tbody);
}

// 페이지 로드 시 표 생성
document.addEventListener('DOMContentLoaded', generateTable);