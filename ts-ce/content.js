// content.js
console.log("타겟 크기 계산기: 스크립트 로드 완료");
(function () {
	let tscIsActive = false;
	let tscOverlay = null;
	let tscHighlighter = null;
	
	function tscActivate() {
		console.log("타겟 크기 계산기: 확장 프로그램 활성화 시도");
		if (tscIsActive) {
			console.log("타겟 크기 계산기: 이미 활성화되어 있음");
			return;
		}
		tscIsActive = true;
		try {
			tscCreateOverlay();
			tscCreateHighlighter();
			document.addEventListener('keydown', tscHandleKeyPress, true);
			console.log("타겟 크기 계산기: 활성화 성공");
		} catch (error) {
			console.error("타겟 크기 계산기: 활성화 중 오류 발생", error);
			tscDeactivate();
		}
	}
	
	function tscDeactivate() {
		console.log("타겟 크기 계산기: 비활성화");
		tscIsActive = false;
		if (tscOverlay) {
			tscOverlay.remove();
			tscOverlay = null;
		}
		if (tscHighlighter) {
			tscHighlighter.remove();
			tscHighlighter = null;
		}
		document.removeEventListener('keydown', tscHandleKeyPress, true);
	}
	
	function tscCreateOverlay() {
		if (tscOverlay) {
			console.log("타겟 크기 계산기: 오버레이가 이미 존재함");
			return;
		}
		tscOverlay = document.createElement('div');
		tscOverlay.id = 'tsc-target-size-overlay';
		tscOverlay.innerHTML = `
      <div id="tsc-overlay-header">
        <h2>타겟 크기 계산기</h2>
        <button id="tsc-close-btn">닫기</button>
      </div>
      <div id="tsc-overlay-content">
        <button id="tsc-select-btn">요소 선택</button>
        <div id="tsc-result"></div>
      </div>
    `;
		document.body.appendChild(tscOverlay);
		document.getElementById('tsc-close-btn').addEventListener('click', tscDeactivate);
		document.getElementById('tsc-select-btn').addEventListener('click', tscStartElementSelection);
	}
	
	function tscCreateHighlighter() {
		if (tscHighlighter) {
			console.log("타겟 크기 계산기: 하이라이터가 이미 존재함");
			return;
		}
		tscHighlighter = document.createElement('div');
		tscHighlighter.id = 'tsc-element-highlighter';
		document.body.appendChild(tscHighlighter);
	}
	
	function tscStartElementSelection() {
		console.log("타겟 크기 계산기: 요소 선택 시작");
		if (!tscOverlay) {
			console.error("타겟 크기 계산기: 오버레이가 존재하지 않음");
			return;
		}
		const selectBtn = document.getElementById('tsc-select-btn');
		if (selectBtn) {
			selectBtn.textContent = '선택 중... (ESC로 취소)';
		}
		document.addEventListener('mousemove', tscHighlightElement, true);
		document.addEventListener('click', tscSelectElement, true);
	}
	
	function tscStopElementSelection() {
		console.log("타겟 크기 계산기: 요소 선택 중지");
		document.removeEventListener('mousemove', tscHighlightElement, true);
		document.removeEventListener('click', tscSelectElement, true);
		if (tscHighlighter) {
			tscHighlighter.style.display = 'none';
		}
		const selectBtn = document.getElementById('tsc-select-btn');
		if (selectBtn) {
			selectBtn.textContent = '요소 선택';
		}
	}
	
	function tscHandleKeyPress(e) {
		if (e.key === 'Escape') {
			tscStopElementSelection();
			if (tscIsActive) {
				tscDeactivate();
			}
		}
	}
	
	function tscHighlightElement(e) {
		if (!tscHighlighter) return;
		const element = document.elementFromPoint(e.clientX, e.clientY);
		if (element && element !== tscOverlay && !tscOverlay.contains(element)) {
			const rect = element.getBoundingClientRect();
			tscHighlighter.style.top = `${rect.top + window.scrollY}px`;
			tscHighlighter.style.left = `${rect.left + window.scrollX}px`;
			tscHighlighter.style.width = `${rect.width}px`;
			tscHighlighter.style.height = `${rect.height}px`;
			tscHighlighter.style.display = 'block';
		} else {
			tscHighlighter.style.display = 'none';
		}
	}
	
	function tscSelectElement(e) {
		console.log("타겟 크기 계산기: 요소 클릭됨");
		if (tscOverlay && (e.target === tscOverlay || tscOverlay.contains(e.target))) {
			console.log("타겟 크기 계산기: 오버레이 내부 클릭, 무시함");
			return;
		}
		e.preventDefault();
		e.stopPropagation();
		const element = document.elementFromPoint(e.clientX, e.clientY);
		if (element) {
			console.log("타겟 크기 계산기: 선택된 요소", element);
			tscCalculateSizes(element);
			tscStopElementSelection();
		} else {
			console.log("타겟 크기 계산기: 클릭 위치에서 요소를 찾을 수 없음");
		}
	}
	
	function tscCalculateSizes(element) {
		const rect = element.getBoundingClientRect();
		const cssPixelWidth = rect.width;
		const cssPixelHeight = rect.height;
		const dpr = window.devicePixelRatio || 1;
		const physicalPixelWidth = cssPixelWidth * dpr;
		const physicalPixelHeight = cssPixelHeight * dpr;
		
		console.log("타겟 크기 계산기: 요소의 크기 계산 중", element);
		console.log("타겟 크기 계산기: CSS 픽셀 크기", cssPixelWidth, cssPixelHeight);
		console.log("타겟 크기 계산기: 물리적 픽셀 크기", physicalPixelWidth, physicalPixelHeight);
		
		const sizes = {
			cssPixelWidth: Math.round(cssPixelWidth),
			cssPixelHeight: Math.round(cssPixelHeight),
			physicalPixelWidth: Math.round(physicalPixelWidth),
			physicalPixelHeight: Math.round(physicalPixelHeight),
			dpr: dpr
		};
		
		for (let device of tscDevicesData.devices) {
			for (let model of device.models) {
				const physicalWidthMm = (physicalPixelWidth / model.ppi) * 25.4;
				const physicalHeightMm = (physicalPixelHeight / model.ppi) * 25.4;
				const physicalDiagonalMm = Math.sqrt(physicalWidthMm ** 2 + physicalHeightMm ** 2);
				sizes[model.name] = {
					width: physicalWidthMm,
					height: physicalHeightMm,
					diagonal: physicalDiagonalMm
				};
			}
		}
		
		tscDisplaySizes(sizes);
	}
	
	function tscDisplaySizes(sizes) {
		const resultDiv = document.getElementById('tsc-result');
		let resultHTML = `
			<div class="tsc-result-section">
				<h3>선택된 요소 크기</h3>
				<div class="tsc-result-item">
					<span class="tsc-label">CSS 픽셀:</span>
					<span class="tsc-value">${sizes.cssPixelWidth} x ${sizes.cssPixelHeight}px</span>
				</div>
				<div class="tsc-result-item">
					<span class="tsc-label">물리적 픽셀:</span>
					<span class="tsc-value">${sizes.physicalPixelWidth} x ${sizes.physicalPixelHeight}px</span>
				</div>
				<div class="tsc-result-item">
					<span class="tsc-label">기기 픽셀 비율 (DPR):</span>
					<span class="tsc-value">${sizes.dpr.toFixed(2)}</span>
				</div>
			</div>
			<div class="tsc-result-section">
				<h3>계산된 물리적 크기</h3>
		`;
	
		for (let device in sizes) {
			if (!['cssPixelWidth', 'cssPixelHeight', 'physicalPixelWidth', 'physicalPixelHeight', 'dpr'].includes(device)) {
				const width = sizes[device].width.toFixed(2);
				const height = sizes[device].height.toFixed(2);
				const diagonal = sizes[device].diagonal.toFixed(2);
				resultHTML += `
					<div class="tsc-result-item tsc-device-result">
						<div class="tsc-device-name">${device}</div>
						<div class="tsc-visual-container">
							<div class="tsc-height-text">${height} mm</div>
							<div class="tsc-diagonal-text">대각선: ${diagonal} mm</div>
							<div class="tsc-visual-button" style="width: ${width}mm; height: ${height}mm;"></div>
							<div class="tsc-width-text">${width} mm</div>
						</div>
					</div>
				`;
			}
		}
	
		resultHTML += '</div>';
		resultDiv.innerHTML = resultHTML;
		console.log("타겟 크기 계산기: 크기 표시됨", sizes);
	}
	
	chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
		console.log("타겟 크기 계산기: 메시지 수신:", request);
		if (request.action === "toggle") {
			console.log("타겟 크기 계산기: 토글 동작 수신");
			tscIsActive ? tscDeactivate() : tscActivate();
			sendResponse({result: "토글 동작 처리됨"});
		}
		return true;
	});
	
	// 페이지 로드 완료 후 초기화
	window.addEventListener('load', () => {
		console.log("타겟 크기 계산기: 페이지 로드 완료, 초기화");
	});
	
	// 수정된 디바이스 데이터 (PPI 값만 사용)
	const tscDevicesData = {
		"devices": [
			{
				"category": "Smartphones",
				"models": [
					{ "name": "iPhone 15 Pro", "ppi": 460 },
					{ "name": "Samsung Galaxy S22 Ultra", "ppi": 500 },
					{ "name": "Google Pixel 6 Pro", "ppi": 512 },
					{ "name": "iPhone SE (3rd gen)", "ppi": 326 }
				]
			},
			{
				"category": "Tablets",
				"models": [
					{ "name": "iPad Pro 12.9-inch (5th gen)", "ppi": 264 },
					{ "name": "Samsung Galaxy Tab S8 Ultra", "ppi": 240 },
					{ "name": "iPad mini (6th gen)", "ppi": 326 }
				]
			},
			{
				"category": "Laptops",
				"models": [
					{ "name": "MacBook Pro 16-inch (2021)", "ppi": 254 },
					{ "name": "Dell XPS 15 (4K)", "ppi": 282 },
					{ "name": "Microsoft Surface Laptop 4 (13.5-inch)", "ppi": 201 }
				]
			}
		]
	};
})();
