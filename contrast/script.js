function checkContrastAndWCAG(foreground, background, fontSize = 'normal') {
    function getLuminance(color) {
        const rgb = parseInt(color.slice(1), 16);
        const r = (rgb >> 16) & 0xff;
        const g = (rgb >>  8) & 0xff;
        const b = (rgb >>  0) & 0xff;
        
        const rsRGB = r / 255;
        const gsRGB = g / 255;
        const bsRGB = b / 255;

        const R = rsRGB <= 0.03928 ? rsRGB / 12.92 : Math.pow((rsRGB + 0.055) / 1.055, 2.4);
        const G = gsRGB <= 0.03928 ? gsRGB / 12.92 : Math.pow((gsRGB + 0.055) / 1.055, 2.4);
        const B = bsRGB <= 0.03928 ? bsRGB / 12.92 : Math.pow((bsRGB + 0.055) / 1.055, 2.4);

        return 0.2126 * R + 0.7152 * G + 0.0722 * B;
    }

    const L1 = getLuminance(foreground);
    const L2 = getLuminance(background);

    const contrastRatio = (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);

    let result = {
        contrastRatio: contrastRatio.toFixed(2),
        AA: { normal: false, large: false },
        AAA: { normal: false, large: false }
    };

    if (fontSize === 'large') {
        result.AA.large = contrastRatio >= 3;
        result.AAA.large = contrastRatio >= 4.5;
    } else {
        result.AA.normal = contrastRatio >= 4.5;
        result.AA.large = contrastRatio >= 3;
        result.AAA.normal = contrastRatio >= 7;
        result.AAA.large = contrastRatio >= 4.5;
    }

    return result;
}

function checkContrast() {
    const foreground = document.getElementById('foregroundText').value;
    const background = document.getElementById('backgroundText').value;
    const fontSize = document.getElementById('fontSize').value;
    const result = checkContrastAndWCAG(foreground, background, fontSize);

    let html = `<h2>결과</h2>
                <p>대비율: ${result.contrastRatio}</p>`;

    if (fontSize === 'large') {
        html += `<p>AA 기준 (큰 텍스트): <span class="${result.AA.large ? 'pass' : 'fail'}">${result.AA.large ? '통과' : '실패'}</span></p>
                 <p>AAA 기준 (큰 텍스트): <span class="${result.AAA.large ? 'pass' : 'fail'}">${result.AAA.large ? '통과' : '실패'}</span></p>`;
    } else {
        html += `<p>AA 기준 (일반 텍스트): <span class="${result.AA.normal ? 'pass' : 'fail'}">${result.AA.normal ? '통과' : '실패'}</span></p>
                 <p>AA 기준 (큰 텍스트): <span class="${result.AA.large ? 'pass' : 'fail'}">${result.AA.large ? '통과' : '실패'}</span></p>
                 <p>AAA 기준 (일반 텍스트): <span class="${result.AAA.normal ? 'pass' : 'fail'}">${result.AAA.normal ? '통과' : '실패'}</span></p>
                 <p>AAA 기준 (큰 텍스트): <span class="${result.AAA.large ? 'pass' : 'fail'}">${result.AAA.large ? '통과' : '실패'}</span></p>`;
    }

    document.getElementById('result').innerHTML = html;
}

// 색상 입력 동기화
document.getElementById('foreground').addEventListener('input', function() {
    document.getElementById('foregroundText').value = this.value.toUpperCase();
});
document.getElementById('foregroundText').addEventListener('input', function() {
    document.getElementById('foreground').value = this.value;
});
document.getElementById('background').addEventListener('input', function() {
    document.getElementById('backgroundText').value = this.value.toUpperCase();
});
document.getElementById('backgroundText').addEventListener('input', function() {
    document.getElementById('background').value = this.value;
});

// 페이지 로드 시 초기값 설정
window.addEventListener('load', function() {
    document.getElementById('foregroundText').value = document.getElementById('foreground').value.toUpperCase();
    document.getElementById('backgroundText').value = document.getElementById('background').value.toUpperCase();
});