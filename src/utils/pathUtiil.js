import { PATHS } from "../constants/paths";

export function setRedirectUrl() {
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
