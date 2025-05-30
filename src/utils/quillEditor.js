import Quill from 'quill';

export function initQuillEditor(selector, onChangeCallback) {
    // Quill 에디터 생성 및 설정
    const editor = new Quill(selector, {
        theme: 'snow',
        placeholder: '여기에 내용을 입력하세요...',
        modules: {
            toolbar: [
                [{ header: 1 }, { header: 2 }],                // 헤더 스타일
                ['bold', 'underline', 'strike'],               // 글씨 스타일
                [{ font: [] }],                                // 폰트 선택
                [{ size: ['small', false, 'large', 'huge'] }], // 글씨 크기
                [{ list: 'ordered' }, { list: 'bullet' }],     // 목록 스타일
                [{ align: [] }],                               // 텍스트 정렬
                [{ color: [] }, { background: [] }],           // 텍스트 색상 및 배경색
                ['link'],                                      // 링크 삽입 기능
            ]
        }
    });

    const qlEditor = document.querySelector(`${selector} .ql-editor`);
    if (qlEditor) {
        // 한글을 한 글자만 입력했을 때 placeholder가 사라지지 않는 문제를 해결하기 위해 직접 클래스를 제거
        qlEditor.addEventListener('compositionstart', () => {
            qlEditor.classList.remove('ql-blank');
        });

        // Quill은 placeholder를 ::before 가상 요소로 구현하므로 직접 스타일을 추가하여 수정
        qlEditor.classList.add('custom-placeholder'); // 커스텀 클래스 추가
        const style = document.createElement('style');
        style.textContent = `
            .custom-placeholder.ql-blank::before {
                font-style: normal;  /* 기울이지 않음 */
                color: grey;         /* 텍스트 색상 */
            }
        `;
        document.head.appendChild(style);
    }

    // 에디터 내용이 변경될 때마다 콜백을 통해 HTML 문자열 전달
    editor.on('text-change', () => {
        const html = editor.root.innerHTML;
        if (typeof onChangeCallback === 'function') {
            onChangeCallback(html);
        }
    });

    return editor;
}
