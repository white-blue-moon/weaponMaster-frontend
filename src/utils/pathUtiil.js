import { PATHS } from "../constants/paths";

export function setRedirectUrl() {
    const urlParams        = new URLSearchParams(window.location.search);
    const existingRedirect = urlParams.get('redirect');

    if (existingRedirect) {
        return existingRedirect;
    }

    const redirect = encodeURIComponent(window.location.pathname + window.location.search);
    return redirect;
}


export function getRedirectUrl() {
    const params   = new URLSearchParams(window.location.search);
    const redirect = params.get("redirect");
    
    // redirect 가 없거나 빈 문자열이면 기본 홈 경로 반환
    if (!redirect) {
        return PATHS.HOME;
    }
    
    return redirect;
}

export function getArticleIdFromUrl() {
    const url       = window.location.pathname;
    let   articleId = 0;

    // url의 끝부분이 숫자로 끝나는지 확인
    if (/\d+$/.test(url)) {
        articleId = url.split('/').pop();
    }

    return articleId;
}
