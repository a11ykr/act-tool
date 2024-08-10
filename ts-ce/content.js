// content.js
console.log("타겟 크기 계산기: 스크립트 로드 완료");

(function () {
	let tscIsActive = false;
	let tscOverlay = null;
	let tscHighlighter = null;

	chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
		console.log("Target Size Calculator: Message received in content script:", request);
		if (request.action === "toggle") {
			console.log("Target Size Calculator: Toggle action received");
			tscIsActive ? tscDeactivate() : tscActivate();
			sendResponse({ result: "Toggle action received and processed" });
		}
		return true;
	});

	function tscActivate() {
		console.log("타겟 크기 계산기: 확장 프로그램 활성화");
		tscIsActive = true;
		tscCreateOverlay();
		tscCreateHighlighter();
		document.addEventListener('mousemove', tscHighlightElement, true);
		document.addEventListener('click', tscSelectElement, true);
		document.addEventListener('keydown', tscHandleKeyPress, true);
	}

	function tscDeactivate() {
		console.log("타겟 크기 계산기: 확장 프로그램 비활성화");
		tscIsActive = false;
		if (tscOverlay) tscOverlay.remove();
		if (tscHighlighter) tscHighlighter.remove();
		document.removeEventListener('mousemove', tscHighlightElement, true);
		document.removeEventListener('click', tscSelectElement, true);
		document.removeEventListener('keydown', tscHandleKeyPress, true);
	}

	function tscCreateOverlay() {
		tscOverlay = document.createElement('div');
		tscOverlay.id = 'tsc-target-size-overlay';
		tscOverlay.innerHTML = `
      <div id="tsc-overlay-header">
        <h2>타겟 크기 계산기</h2>
        <button id="tsc-close-btn">닫기</button>
      </div>
      <div id="tsc-overlay-content">
        <div id="tsc-result"></div>
      </div>
    `;
		document.body.appendChild(tscOverlay);
		document.getElementById('tsc-close-btn').addEventListener('click', tscDeactivate);
	}

	function tscHandleKeyPress(e) {
		if (e.key === 'Escape') {
			tscDeactivate();
		}
	}

	function tscCreateHighlighter() {
		tscHighlighter = document.createElement('div');
		tscHighlighter.id = 'tsc-element-highlighter';
		document.body.appendChild(tscHighlighter);
	}

	function tscHighlightElement(e) {
		if (!tscIsActive) return;
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
		if (!tscIsActive) return;
		console.log("타겟 크기 계산기: 요소 클릭됨");

		if (e.target === tscOverlay || tscOverlay.contains(e.target)) {
			console.log("타겟 크기 계산기: 오버레이 내부 클릭, 무시함");
			return;
		}

		e.preventDefault();
		e.stopPropagation();
		const element = document.elementFromPoint(e.clientX, e.clientY);
		if (element) {
			console.log("Target Size Calculator: Selected element", element);
			tscCalculateSizes(element);
		} else {
			console.log("Target Size Calculator: No element found at click position");
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
		let resultHTML = '<h3>선택된 요소 크기:</h3>';
		resultHTML += `<p>CSS 픽셀: ${sizes.cssPixelWidth} x ${sizes.cssPixelHeight}px</p>`;
		resultHTML += `<p>물리적 픽셀: ${sizes.physicalPixelWidth} x ${sizes.physicalPixelHeight}px</p>`;
		resultHTML += `<p>기기 픽셀 비율 (DPR): ${sizes.dpr}</p>`;
		resultHTML += '<h3>계산된 물리적 크기:</h3>';

		for (let device in sizes) {
			if (!['cssPixelWidth', 'cssPixelHeight', 'physicalPixelWidth', 'physicalPixelHeight', 'dpr'].includes(device)) {
				const width = sizes[device].width.toFixed(2);
				const height = sizes[device].height.toFixed(2);
				const diagonal = sizes[device].diagonal.toFixed(2);
				resultHTML += `<p>${device}: ${width} mm(너비) x ${height} mm(높이) > 대각선 ${diagonal} mm</p>`;
			}
		}

		resultDiv.innerHTML = resultHTML;
		console.log("타겟 크기 계산기: 크기 표시됨", sizes);
	}



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
