export function formatItemName(name) {
    const words       = name.trim().split(/\s+/); // 공백 문자 (띄어쓰기, 탭, 줄바꿈 포함) 기준으로 단어 나누기
    const totalWords  = words.length;
    const totalLength = name.replace(/\s+/g, '').length; // 띄어쓰기 제외 글자 수

    // 단어 5개 이상 또는 글자수 14자 이상이면 3줄, 아니면 2줄
    const targetLineCount = (totalWords >= 5 || totalLength >= 14) ? 3 : 2;

    const lines = Array.from({ length: targetLineCount }, () => []);

    words.forEach((word, index) => {
        const lineIndex = Math.floor(index * targetLineCount / totalWords);
        lines[lineIndex].push(word);
    });

    return lines.map(lineWords => lineWords.join(' ')).join('<br>');
}
