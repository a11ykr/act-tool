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

// 한 변(mm) 고정
const FIXED_SIDE_MM = 9;

function generateTable() {
    const table = document.getElementById('sizeByDevice');
    table.innerHTML = '<caption>행 클릭시 대각선 길이 약 12.73mm인 정사각형 시뮬레이션</caption>';

    // thead 생성
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');

    const headers = [
        '기기',
        '한 변 물리 px',
        '한 변 CSS px',
        'Android dp',
        'iOS pt'
    ];
    headers.forEach(h => {
        const th = document.createElement('th');
        th.textContent = h;
        headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    // tbody 생성
    const tbody = document.createElement('tbody');

    devicesData.devices.forEach(category => {
        category.models.forEach(device => {
            const row = document.createElement('tr');

            const sideMm = FIXED_SIDE_MM;
            const sidePx = (sideMm / 25.4) * device.ppi;
            const cssPx = sidePx / device.dpr;
            const dp = sidePx * 160 / device.ppi;
            const pt = cssPx;

            // 기기명
            const nameCell = document.createElement('th');
            nameCell.classList.add("device-name");
            nameCell.textContent = device.name;
            row.appendChild(nameCell);

            [sidePx, cssPx, dp, pt].forEach(val => {
                const td = document.createElement('td');
                td.textContent = val.toFixed(2);
                row.appendChild(td);
            });

            // 모달 이벤트
            row.addEventListener('click', () => showValueModal(device, cssPx, dp, pt));

            tbody.appendChild(row);
        });
    });

    table.appendChild(tbody);
}

function showSimulation(deviceName, cssPx) {
    const container = document.getElementById('simulation');
    container.innerHTML = `
        <h3>${deviceName} 시뮬레이션</h3>
        <div class="target-box" style="width:${cssPx}px;height:${cssPx}px;background:#4caf50;margin:10px;display:inline-block;"></div>
        <p>한 변: ${cssPx.toFixed(2)} CSS px</p>
    `;
}

function showValueModal(device, cssPx, dp, pt) {
    document.getElementById('modalDeviceName').textContent = device.name;

    // 실제 크기의 사각형 추가
    const modalBox = document.getElementById('modalBox');
    modalBox.innerHTML = `
        <div style="display:flex;align-items:center;gap:24px;">
            <div style="flex:1;">
                <div style="margin-bottom:8px;">
                    <strong>DPR:</strong> ${device.dpr}<br>
                    <strong>PPI:</strong> ${device.ppi}<br>
                    <strong>ScaleFactor:</strong> ${device.scaleFactor}
                </div>
                <div style="margin-top:8px;">
                    <strong>CSS px:</strong> ${cssPx.toFixed(2)}<br>
                    <strong>Android dp:</strong> ${dp.toFixed(2)}<br>
                    <strong>iOS pt:</strong> ${pt.toFixed(2)}
                </div>
            </div>
            <div style="text-align:center;">
                <div class="target-box" style="width:${cssPx}px;height:${cssPx}px;margin:0 auto;"></div>
                <div style="font-size:12px;color:#666;margin-top:8px;">한 변: ${cssPx.toFixed(2)} CSS px</div>
            </div>
        </div>
    `;

    const modal = document.getElementById('valueModal');
    modal.classList.add('show');
}

function hideValueModal() {
    document.getElementById('valueModal').classList.remove('show');
}

// 페이지 로드 시 표 생성
document.addEventListener('DOMContentLoaded', () => {
    generateTable();

    // 모달 닫기 이벤트
    document.getElementById('closeModal').onclick = hideValueModal;
    document.getElementById('valueModal').onclick = function (e) {
        if (e.target === this) hideValueModal();
    };
});
