class IRDetector {
  // IR 기법 패턴 정의
  static patterns = {
    // Phark Method: negative text-indent
    phark: element => {
      const style = window.getComputedStyle(element);
      const textIndent = parseInt(style.textIndent);
      return textIndent <= -999;
    },

    // WA IR: 가로/세로 0, overflow hidden
    wa: element => {
      const style = window.getComputedStyle(element);
      return (
        (style.width === '0px' || style.height === '0px') &&
        style.overflow === 'hidden'
      );
    },

    // NIR 메소드: position absolute, left -9999px
    nir: element => {
      const style = window.getComputedStyle(element);
      return (
        style.position === 'absolute' &&
        parseInt(style.left) <= -9999
      );
    },

    // CSS Clip 메소드
    clip: element => {
      const style = window.getComputedStyle(element);
      return (
        style.position === 'absolute' &&
        style.clip !== 'auto' &&
        style.clip !== 'none'
      );
    },

    // clip-path 사용
    clipPath: element => {
      const style = window.getComputedStyle(element);
      return (
        style.clipPath !== 'none' &&
        style.clipPath.includes('inset(50%)') // 가장 일반적인 패턴
      );
    },

    // .sr-only나 .visually-hidden 같은 유틸리티 클래스
    utilityClass: element => {
      const commonClasses = [
        'sr-only',
        'visually-hidden',
        'blind',
        'readable-hidden',
        'screen-out',
        'skip',
        'a11y'
      ];
      return element.classList &&
             commonClasses.some(className =>
               element.classList.contains(className)
             );
    }
  };

  // 요소가 IR 기법을 사용하는지 검사
  static detect(element) {
    const results = {
      hasIR: false,
      method: null,
      hiddenText: null
    };

    // 텍스트 콘텐츠 저장
    const textContent = element.textContent?.trim();

    // 각 IR 패턴 검사
    for (const [method, test] of Object.entries(IRDetector.patterns)) {
      if (test(element)) {
        results.hasIR = true;
        results.method = method;
        results.hiddenText = textContent;
        break;
      }
    }

    // 자식 요소들도 검사
    if (!results.hasIR && element.children.length > 0) {
      for (const child of element.children) {
        const childResults = IRDetector.detect(child);
        if (childResults.hasIR) {
          results.hasIR = true;
          results.method = childResults.method;
          results.hiddenText = childResults.hiddenText;
          break;
        }
      }
    }

    return results;
  }
}

class AccessibilityChecker {
  constructor(element) {
    this.element = element;
    this.elementType = element.tagName.toLowerCase();
    this.context = this.analyzeContext();
    this.irInfo = IRDetector.detect(element);
  }

  // 요소의 컨텍스트 분석
  analyzeContext() {
    return {
      isInButton: !!this.element.closest('button, [role="button"]'),
      isInLink: !!this.element.closest('a'),
      isInFigure: !!this.element.closest('figure'),
      figcaption: this.element.closest('figure')?.querySelector('figcaption')?.textContent,
      parentRole: this.element.parentElement?.getAttribute('role')
    };
  }

  // 대체 텍스트 관련 속성들 가져오기
  getTextAlternatives() {
    const alternatives = {
      alt: this.element.getAttribute('alt'),
      ariaLabel: this.element.getAttribute('aria-label'),
      ariaLabelledBy: this.element.getAttribute('aria-labelledby'),
      title: this.element.getAttribute('title'),
      role: this.element.getAttribute('role'),
      ariaHidden: this.element.getAttribute('aria-hidden'),
    };

    if (this.elementType === 'svg') {
      alternatives.svgTitle = this.element.querySelector('title')?.textContent;
      alternatives.svgDesc = this.element.querySelector('desc')?.textContent;
    }

    // aria-labelledby가 있는 경우 참조된 요소의 텍스트 가져오기
    if (alternatives.ariaLabelledBy) {
      const labelledByElement = document.getElementById(alternatives.ariaLabelledBy);
      alternatives.labelledByText = labelledByElement?.textContent;
    }

    return alternatives;
  }

  // 요소의 접근성 상태 분석
  analyze() {
    const alternatives = this.getTextAlternatives();
    const state = {
      elementType: this.elementType,
      role: alternatives.role,
      isDecorative: this.isDecorative(alternatives),
      isExplicitlyEmpty: this.isExplicitlyEmpty(alternatives),
      isMissing: this.isMissing(alternatives),
      effectiveText: this.getEffectiveText(alternatives),
      context: this.context,
      alternatives,
      // IR 정보 추가
      hasIR: this.irInfo.hasIR,
      irMethod: this.irInfo.method,
      hiddenText: this.irInfo.hiddenText,
      // IR 텍스트를 대체 텍스트로 간주
      effectiveText: this.getEffectiveText(alternatives, this.irInfo)
    };

    state.status = this.evaluateStatus(state);
    state.message = this.createStatusMessage(state);

    return state;
  }

  // IR 텍스트도 고려하여 유효한 대체 텍스트 가져오기
  getEffectiveText(alternatives, irInfo) {
    // 기존 대체 텍스트가 있으면 우선 사용
    const altText = super.getEffectiveText(alternatives);
    if (altText) return altText;

    // IR 텍스트가 있으면 사용
    return irInfo.hasIR ? irInfo.hiddenText : null;
  }

  // 장식용 요소인지 확인
  isDecorative(alternatives) {
    return (
      alternatives.role === 'presentation' ||
      alternatives.role === 'none' ||
      alternatives.ariaHidden === 'true'
    );
  }

  // 명시적으로 비어있는지 확인
  isExplicitlyEmpty(alternatives) {
    if (this.elementType === 'img') {
      return alternatives.alt === '';
    }
    return false;
  }

  // 대체 텍스트가 누락되었는지 확인
  isMissing(alternatives) {
    switch (this.elementType) {
      case 'img':
        return !alternatives.hasOwnProperty('alt');
      case 'svg':
        return !alternatives.svgTitle &&
               !alternatives.svgDesc &&
               !alternatives.ariaLabel &&
               !alternatives.ariaLabelledBy;
      case 'canvas':
      default:
        return !alternatives.ariaLabel &&
               !alternatives.ariaLabelledBy &&
               !alternatives.title;
    }
  }

  // 유효한 대체 텍스트 가져오기
  getEffectiveText(alternatives) {
    if (this.elementType === 'img' && alternatives.hasOwnProperty('alt')) {
      return alternatives.alt;
    }

    if (this.elementType === 'svg') {
      return alternatives.svgTitle ||
             alternatives.svgDesc ||
             alternatives.ariaLabel ||
             alternatives.labelledByText ||
             alternatives.title;
    }

    return alternatives.ariaLabel ||
           alternatives.labelledByText ||
           alternatives.title;
  }

  // 상태 평가
  evaluateStatus(state) {
    if (state.isDecorative) return 'decorative';
    if (state.isExplicitlyEmpty) return 'empty';
    if (state.isMissing) return 'missing';

    const text = state.effectiveText;
    if (!text) return 'missing';

    const genericTexts = ['image', 'img', 'photo', 'picture', 'icon', '이미지', '사진', '아이콘'];
    if (genericTexts.includes(text.toLowerCase().trim())) {
      return 'generic';
    }

    return 'valid';
  }

  // 상태 메시지 생성
  createStatusMessage(state) {
    const elementName = state.elementType === 'img' ? '이미지' :
                       state.elementType === 'svg' ? 'SVG' :
                       state.elementType.toUpperCase();

    switch (state.status) {
      case 'decorative':
        return `🎨 장식용 ${elementName}`;
      case 'empty':
        return `🎨 장식용 ${elementName} (alt="")`;
      case 'missing':
        return `⚠️ ${elementName}: 대체 텍스트 없음`;
      case 'generic':
        return `⚠️ 의미 없음: "${state.effectiveText}"`;
      case 'valid':
        return `✅ "${state.effectiveText}"`;
      default:
        return '❓ 상태 확인 필요';
    }
    // let message = super.createStatusMessage(state);
    // if (state.hasIR) {
    //   const methodNames = {
    //     phark: 'Phark Method',
    //     wa: 'WA IR',
    //     nir: 'NIR Method',
    //     clip: 'CSS Clip',
    //     clipPath: 'Clip Path',
    //     utilityClass: 'Utility Class'
    //   };

    //   message += `\n🔍 IR 기법 사용: ${methodNames[state.irMethod]}`;
    //   if (state.hiddenText) {
    //     message += `\n📝 숨겨진 텍스트: "${state.hiddenText}"`;
    //   }
    // }
    // return message;
  }
}

// 오버레이 관리 클래스
class AccessibilityOverlay {
  constructor() {
    this.overlays = [];
    this.isEnabled = false;
    this.setupEventListeners();
  }

  setupEventListeners() {
    // 스크롤 핸들러
    let scrollTimeout;
    window.addEventListener('scroll', () => {
      if (!this.isEnabled) return;

      this.overlays.forEach(([highlight, overlay]) => {
        highlight.style.opacity = '0';
        overlay.style.opacity = '0';
      });

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => this.refresh(), 100);
    });

    // 페이지 변경 감지
    window.addEventListener('beforeunload', () => this.reset());
    window.addEventListener('popstate', () => this.reset());

    // SPA 동적 페이지 변경 감지
    const observer = new MutationObserver((mutations) => {
      if (this.isEnabled && observer.previousUrl !== window.location.href) {
        observer.previousUrl = window.location.href;
        this.reset();
      }
    });

    observer.previousUrl = window.location.href;
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  // 시각적 요소 찾기
  findVisualElements() {
    const elements = [
      ...document.getElementsByTagName('img'),
      ...document.getElementsByTagName('svg'),
      ...document.getElementsByTagName('canvas'),
      ...document.querySelectorAll('[role="img"]')
    ];

    // 배경 이미지가 있는 요소 찾기
    document.querySelectorAll('*').forEach(element => {
      const style = window.getComputedStyle(element);
      const bgImage = style.backgroundImage;
      if (bgImage !== 'none') {
        const matches = bgImage.match(/url\(['"]?(.*?)['"]?\)/);
        if (matches) {
          elements.push(element);
        }
      }
    });

    return elements;
  }

  // 오버레이 생성
  createOverlay(element) {
    const rect = element.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return null;

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

    const checker = new AccessibilityChecker(element);
    const state = checker.analyze();

    // 하이라이트 요소 생성
    const highlight = document.createElement('div');
    highlight.className = `alt-text-highlight ${state.status}`;
    Object.assign(highlight.style, {
      position: 'absolute',
      top: `${rect.top + scrollTop}px`,
      left: `${rect.left + scrollLeft}px`,
      width: `${rect.width}px`,
      height: `${rect.height}px`,
      pointerEvents: 'none',
      zIndex: 10000,
      transition: 'opacity 0.2s'
    });

    // 오버레이 요소 생성
    const overlay = document.createElement('div');
    overlay.className = 'alt-text-overlay';
    Object.assign(overlay.style, {
      position: 'absolute',
      top: `${rect.top + scrollTop - 24}px`,
      left: `${rect.left + scrollLeft}px`,
      padding: '4px 8px',
      borderRadius: '4px',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      color: 'white',
      fontSize: '12px',
      zIndex: 10001,
      pointerEvents: 'none',
      transition: 'opacity 0.2s'
    });

    // 메시지 구성
    const messages = [state.message];

    if (state.context.figcaption) {
      messages.push(`📝 캡션: "${state.context.figcaption}"`);
    }

    const { alternatives } = state;
    if (alternatives.ariaLabel) {
      messages.push(`🏷️ aria-label: "${alternatives.ariaLabel}"`);
    }
    if (alternatives.labelledByText) {
      messages.push(`🏷️ aria-labelledby: "${alternatives.labelledByText}"`);
    }
    if (alternatives.title) {
      messages.push(`📌 title: "${alternatives.title}"`);
    }
    if (alternatives.role) {
      messages.push(`🎭 role: "${alternatives.role}"`);
    }

    overlay.innerHTML = messages.join('<br>');

    document.body.appendChild(highlight);
    document.body.appendChild(overlay);

    return [highlight, overlay];
  }

  // 오버레이 토글
  toggle() {
    if (this.isEnabled) {
      this.reset();
    } else {
      this.show();
    }
  }

  // 오버레이 표시
  show() {
    const visualElements = this.findVisualElements();
    visualElements.forEach(element => {
      const overlay = this.createOverlay(element);
      if (overlay) {
        this.overlays.push(overlay);
      }
    });
    this.isEnabled = true;
  }

  // 오버레이 초기화
  reset() {
    this.overlays.forEach(([highlight, overlay]) => {
      highlight?.remove();
      overlay?.remove();
    });
    this.overlays = [];
    this.isEnabled = false;
  }

  // 오버레이 새로고침
  refresh() {
    this.reset();
    this.show();
  }
}

// 크롬 확장프로그램 메시지 리스너 설정
const overlay = new AccessibilityOverlay();
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'toggleOverlay') {
    overlay.toggle();
    sendResponse({ success: true });
  }
});