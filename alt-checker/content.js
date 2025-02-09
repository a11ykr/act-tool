function getBackgroundImageUrl(element) {
  const style = window.getComputedStyle(element);
  const bgImage = style.backgroundImage;
  if (bgImage !== 'none') {
    // url("...") 형식에서 실제 URL만 추출
    const matches = bgImage.match(/url\(['"]?(.*?)['"]?\)/);
    return matches ? matches[1] : null;
  }
  return null;
}

function isEmpty(element) {
	const altAttr = element.getAttribute('alt');
	 return (
    (altAttr === '') // 명시적으로 빈 alt
	 )
}

function isDecorative(element) {
  // 장식용 이미지 판단 기준
  const role = element.getAttribute('role');
  const ariaHidden = element.getAttribute('aria-hidden');

  return (
    role === 'presentation' || // 표현용 role
    role === 'none' || // 무시할 role
    ariaHidden === 'true' // 스크린리더에서 숨김
  );
}

function analyzeImageContext(element) {
  // 이미지의 맥락 분석
  const parentRole = element.parentElement?.getAttribute('role');
  const isInButton = element.closest('button, [role="button"]');
  const isInLink = element.closest('a');
  const isInFigure = element.closest('figure');
  const figcaption = isInFigure?.querySelector('figcaption');

  return {
    isInInteractive: isInButton || isInLink,
    hasCaption: !!figcaption,
    captionText: figcaption?.textContent,
    parentRole: parentRole
  };
}

let isEnabled = false;
let overlays = [];

function createOverlay(element, type = 'img') {
  const rect = element.getBoundingClientRect();
  if (rect.width === 0 || rect.height === 0) return null;

  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

  const highlight = document.createElement('div');
  highlight.className = 'alt-text-highlight';

  const overlay = document.createElement('div');
  overlay.className = 'alt-text-overlay';

  let status, message;
  const context = analyzeImageContext(element);

  if (type === 'img') {
    const altText = element.getAttribute('alt');
    const genericAltTexts = ['image', '사진', 'picture', '이미지', 'img', 'photo'];

    if (isDecorative(element)) {
      status = 'decorative';
      message = '🎨 장식';
		} else if (isEmpty(element)) {
			status = 'empty';
      message = '⚠️ alt=""';
    } else if (altText === null) {
      status = 'missing';
      message = '⚠️ 대체 텍스트 없음';
    } else if (genericAltTexts.includes(altText.toLowerCase().trim())) {
      status = 'generic';
      message = `⚠️ 의미 없는 대체 텍스트: "${altText}"`;
    } else {
      status = 'valid';
      message = `✅ "${altText}"`;
    }
  } else if (type === 'background') {
    const ariaLabel = element.getAttribute('aria-label');
    const role = element.getAttribute('role');

    if (isDecorative(element)) {
      status = 'decorative';
      message = '🎨 배경(장식)';
    } else if (ariaLabel || role) {
      status = 'valid';
      message = '✅ 배경(설명 있음)';
    } else if (context.isInInteractive) {
      status = 'missing';
      message = '⚠️ 배경(설명 필요)';
    } else {
      status = 'decorative';
      message = '🎨 배경';
    }
  }

  highlight.classList.add(status);

  // 위치 및 크기 설정
  Object.assign(highlight.style, {
    top: `${rect.top + scrollTop}px`,
    left: `${rect.left + scrollLeft}px`,
    width: `${rect.width}px`,
    height: `${rect.height}px`
  });

  Object.assign(overlay.style, {
    top: `${rect.top + scrollTop - 24}px`,
    left: `${rect.left + scrollLeft}px`
  });


  // 추가 정보 표시
  const ariaLabel = element.getAttribute('aria-label');
  const role = element.getAttribute('role');
  const contextInfo = [];

  // if (context.isInInteractive) {
  //   contextInfo.push('🔘 UI 내부');
  // }
  if (context.hasCaption) {
    contextInfo.push(`📝 캡션: "${context.captionText}"`);
  }
  if (ariaLabel) {
    contextInfo.push(`🏷️ aria-label: "${ariaLabel}"`);
  }
  if (role) {
    contextInfo.push(`🎭 role: "${role}"`);
  }

  overlay.innerHTML = `
    ${message}
    ${contextInfo.length > 0 ? '<br>' + contextInfo.join('<br>') : ''}
  `;

  document.body.appendChild(highlight);
  document.body.appendChild(overlay);

  return [highlight, overlay];
}

function findBackgroundImages() {
  const elements = document.querySelectorAll('*');
  const backgroundElements = [];

  elements.forEach(element => {
    if (getBackgroundImageUrl(element)) {
      backgroundElements.push(element);
    }
  });

  return backgroundElements;
}

function toggleOverlays() {
  if (isEnabled) {
    // 기존 오버레이 제거
    overlays.forEach(([highlight, overlay]) => {
      highlight.remove();
      overlay.remove();
    });
    overlays = [];
    isEnabled = false;
  } else {
    // 새 오버레이 생성
    const images = document.getElementsByTagName('img');
    Array.from(images).forEach(img => {
      overlays.push(createOverlay(img));
    });
    isEnabled = true;
  }
}

// 팝업으로부터 메시지 수신
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'toggleOverlay') {
    toggleOverlays();
    sendResponse({ success: true });
  }
});

// 스크롤 시 오버레이 위치 업데이트
let scrollTimeout;
window.addEventListener('scroll', () => {
  if (!isEnabled) return;

  // 스크롤 중에는 오버레이 숨기기
  overlays.forEach(([highlight, overlay]) => {
    highlight.style.opacity = '0';
    overlay.style.opacity = '0';
  });

  // 스크롤이 멈추면 위치 업데이트
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    overlays.forEach(([highlight, overlay]) => {
      highlight.remove();
      overlay.remove();
    });
    overlays = [];

    const images = document.getElementsByTagName('img');
    Array.from(images).forEach(img => {
      overlays.push(createOverlay(img));
    });
  }, 100);
});
