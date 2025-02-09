function getBackgroundImageUrl(element) {
  const style = window.getComputedStyle(element);
  const bgImage = style.backgroundImage;
  if (bgImage !== 'none') {
    const matches = bgImage.match(/url\(['"]?(.*?)['"]?\)/);
    return matches ? matches[1] : null;
  }
  return null;
}

function isEmpty(element) {
  const altAttr = element.getAttribute('alt');
  const ariaLabel = element.getAttribute('aria-label');
  const ariaLabelledBy = element.getAttribute('aria-labelledby');
  const title = element.getAttribute('title');
  
  return (
    (altAttr === '') || // 명시적으로 빈 alt
    (!altAttr && !ariaLabel && !ariaLabelledBy && !title) // 모든 대체 텍스트 속성이 없음
  );
}

function isDecorative(element) {
  const role = element.getAttribute('role');
  const ariaHidden = element.getAttribute('aria-hidden');

  return (
    role === 'presentation' ||
    role === 'none' ||
    ariaHidden === 'true'
  );
}

function analyzeImageContext(element) {
  const parentRole = element.parentElement?.getAttribute('role');
  const isInButton = element.closest('button, [role="button"]');
  const isInLink = element.closest('a');
  const isInFigure = element.closest('figure');
  const figcaption = isInFigure?.querySelector('figcaption');
  const desc = element.tagName.toLowerCase() === 'svg' ? element.querySelector('desc') : null;

  return {
    isInInteractive: isInButton || isInLink,
    hasCaption: !!figcaption || !!desc,
    captionText: figcaption?.textContent || desc?.textContent,
    parentRole: parentRole
  };
}

function getElementText(element) {
  // 여러 대체 텍스트 속성을 확인
  const altAttr = element.getAttribute('alt');
  const ariaLabel = element.getAttribute('aria-label');
  const title = element.getAttribute('title');
  const ariaLabelledBy = element.getAttribute('aria-labelledby');
  
  let text = altAttr || ariaLabel || title;
  
  // aria-labelledby가 있는 경우 참조된 요소의 텍스트 가져오기
  if (!text && ariaLabelledBy) {
    const labelledByElement = document.getElementById(ariaLabelledBy);
    if (labelledByElement) {
      text = labelledByElement.textContent;
    }
  }
  
  // SVG의 경우 <title>과 <desc> 태그 확인
  if (element.tagName.toLowerCase() === 'svg') {
    const titleElement = element.querySelector('title');
    const descElement = element.querySelector('desc');
    if (!text) {
      text = titleElement?.textContent || descElement?.textContent;
    }
  }
  
  return text;
}

let isEnabled = false;
let overlays = [];

function createOverlay(element, type = 'visual') {
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
  const elementText = getElementText(element);
  const genericAltTexts = ['image', '사진', 'picture', '이미지', 'img', 'photo', 'icon', '아이콘'];

  if (isDecorative(element)) {
    status = 'decorative';
    message = '🎨 장식';
  } else if (isEmpty(element)) {
    status = 'empty';
    message = '⚠️ 대체 텍스트 없음';
  } else if (elementText && genericAltTexts.includes(elementText.toLowerCase().trim())) {
    status = 'generic';
    message = `⚠️ 의미 없는 대체 텍스트: "${elementText}"`;
  } else if (elementText) {
    status = 'valid';
    message = `✅ "${elementText}"`;
  } else {
    status = 'missing';
    message = '⚠️ 대체 텍스트 필요';
  }

  highlight.classList.add(status);

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

  const contextInfo = [];
  
  if (context.hasCaption) {
    contextInfo.push(`📝 캡션: "${context.captionText}"`);
  }
  
  const ariaLabel = element.getAttribute('aria-label');
  const ariaLabelledBy = element.getAttribute('aria-labelledby');
  const title = element.getAttribute('title');
  const role = element.getAttribute('role');

  if (ariaLabel) {
    contextInfo.push(`🏷️ aria-label: "${ariaLabel}"`);
  }
  if (ariaLabelledBy) {
    const labelledByElement = document.getElementById(ariaLabelledBy);
    if (labelledByElement) {
      contextInfo.push(`🏷️ aria-labelledby: "${labelledByElement.textContent}"`);
    }
  }
  if (title) {
    contextInfo.push(`📌 title: "${title}"`);
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

function findVisualElements() {
  // 이미지, SVG, 캔버스 등 시각적 요소 찾기
  const elements = [];
  
  // img 태그
  elements.push(...document.getElementsByTagName('img'));
  
  // svg 태그
  elements.push(...document.getElementsByTagName('svg'));
  
  // canvas 태그
  elements.push(...document.getElementsByTagName('canvas'));
  
  // role="img"를 가진 요소
  elements.push(...document.querySelectorAll('[role="img"]'));
  
  // 배경 이미지가 있는 요소
  const allElements = document.querySelectorAll('*');
  allElements.forEach(element => {
    if (getBackgroundImageUrl(element)) {
      elements.push(element);
    }
  });
  
  return elements;
}

function resetOverlays() {
  // 모든 오버레이 제거
  overlays.forEach(([highlight, overlay]) => {
    highlight?.remove();
    overlay?.remove();
  });
  overlays = [];
  isEnabled = false;
}

function toggleOverlays() {
  if (isEnabled) {
    resetOverlays();
  } else {
    const visualElements = findVisualElements();
    visualElements.forEach(element => {
      const overlay = createOverlay(element);
      if (overlay) {
        overlays.push(overlay);
      }
    });
    isEnabled = true;
  }
}

// 페이지 변경 감지
window.addEventListener('beforeunload', resetOverlays);

// History API를 통한 페이지 변경 감지
window.addEventListener('popstate', resetOverlays);

// SPA 동적 페이지 변경 감지
const observer = new MutationObserver((mutations) => {
  if (isEnabled) {
    // URL 변경 감지
    if (observer.previousUrl !== window.location.href) {
      observer.previousUrl = window.location.href;
      resetOverlays();
    }
  }
});

observer.previousUrl = window.location.href;
observer.observe(document.body, {
  childList: true,
  subtree: true
});

// 메시지 리스너
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'toggleOverlay') {
    toggleOverlays();
    sendResponse({ success: true });
  }
});

// 스크롤 핸들러
let scrollTimeout;
window.addEventListener('scroll', () => {
  if (!isEnabled) return;

  overlays.forEach(([highlight, overlay]) => {
    highlight.style.opacity = '0';
    overlay.style.opacity = '0';
  });

  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    overlays.forEach(([highlight, overlay]) => {
      highlight?.remove();
      overlay?.remove();
    });
    overlays = [];

    const visualElements = findVisualElements();
    visualElements.forEach(element => {
      const overlay = createOverlay(element);
      if (overlay) {
        overlays.push(overlay);
      }
    });
  }, 100);
});