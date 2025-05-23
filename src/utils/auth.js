import { writable } from "svelte/store";
import { PATHS } from "../constants/paths";
import { DURATION } from "../constants/duration";

export const canAccessPage = cookieWritable("canAccessPage", false); // 홈페이지 자체 접근 가능 여부
export const adminToken    = cookieWritable("adminToken", null);     // 관리자 전용 토큰 값

export const isLoggedIn    = localStorageWritable("isLoggedIn", false); // 로그인 여부
export const isAdmin       = localStorageWritable("isAdmin", false);    // 관리자 모드 여부
export const userInfo      = localStorageWritable("userInfo", null);    // 사용자 정보 (아이디 등)

export function authLogin(userId, token = "", isAdminMode = false) {
    const expireMs = Date.now() + (DURATION.HOUR_MS * 4) // 4시간 후 만료

    userInfo.set(userId, expireMs);
    isLoggedIn.set(true, expireMs);

    if (isAdminMode) {
        isAdmin.set(true, expireMs);
        adminToken.set(token, expireMs);
    }
    
    return;
}

export function authLogout() {
    // 스토어 상태 초기화
    adminToken.set(null);
    userInfo.set(null);
    isLoggedIn.set(false);
    isAdmin.set(false);
    
    // 쿠키 / 로컬 스토리지 제거
    deleteCookie("adminToken");
    localStorage.removeItem("userInfo");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("isAdmin");

    return;
}

export function isSessionExpired() {
    const isExpired = !getStoredValue("userInfo") || 
                      !getStoredValue("isLoggedIn") ||
                      (isAdminMode() && !getCookieValue("adminToken"));
    
    if (isExpired) {
        authLogout();
        return true;
    }

    return false;
}

export function onLogout() {
    authLogout();
    alert("로그아웃 되었습니다.");
    window.location.href = PATHS.HOME;
    return;
}

// Caps Lock 감지
export function handleCapsLock(event, setCapsLockWarning) {
  const capsLockOn = event.getModifierState("CapsLock");
  setCapsLockWarning(capsLockOn);
}

export function safeJsonParse(str) {
    if (!str) {
      return null;
    }

    try {
        return JSON.parse(str);
    } catch {
        return null;
    }
}

function isAdminMode() {
    return getStoredValue("isAdmin") === true;
}

function cookieWritable(key, defaultValue = "") {
    const raw           = getCookieValue(key);
    const initial       = initParse(raw, defaultValue);
    const store         = writable(initial);
    const defaultExpire = Date.now() + DURATION.DAY_MS;

    return {
        subscribe: store.subscribe,
        update:    store.update,
        set: (value, expireMs = defaultExpire) => {
            setCookie(key, value, expireMs);
            store.set(value);
        },
    }
}

function getCookieValue(name) {
    // 정규식: "쿠키이름=값;" > "쿠키이름, =, 값, ;" > 값
    const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
    if (match) {
        const cookieValue = decodeURIComponent(match[2]);
        if (cookieValue === "null") {
            return null;
        }
        
        return cookieValue;
    }

    return null;
}

function setCookie(name, value, expireMs) {
    const expires  = new Date();
    expires.setTime(expireMs);

    document.cookie = `${name}=${encodeURIComponent(value)}; path=/; expires=${expires.toUTCString()};`;
}

function deleteCookie(name) {
    document.cookie = `${encodeURIComponent(name)}=; path=/; Max-Age=0;`;
}

// 초기값 파싱 유틸
function initParse(value, defaultValue) {
    if (value === null || value === undefined) {
      return defaultValue;
    }
  
    if (typeof defaultValue === "boolean") {
      return value === "true";
    }
  
    const parsed = safeJsonParse(value);
    if (parsed !== null && parsed !== undefined) {
      return parsed;
    }
  
    return value;
}

function isValidStoredData(obj) {
    if (!obj)                    return false;
    if (typeof obj !== "object") return false;
    if (!("value" in obj))       return false;
    if (!("expireMs" in obj))    return false;
  
    return true;
}
  
function isExpired(expireMs) {
    if (typeof expireMs !== "number") return true;
    if (expireMs <= Date.now())       return true;
  
    return false;
}
  
function getStoredValue(key, defaultValue) {
    const raw = localStorage.getItem(key);
    if (!raw) {
      return defaultValue;
    }

    const parsed = safeJsonParse(raw);
    if (!isValidStoredData(parsed)) {
      return defaultValue;
    }
  
    if (isExpired(parsed.expireMs)) {
      return defaultValue;
    }
  
    return parsed.value;
}

function saveToLocalStorage(key, value, expireMs) {
    const toStore  = { value, expireMs };
    localStorage.setItem(key, JSON.stringify(toStore));
}
  
function localStorageWritable(key, defaultValue = "") {
    const stored        = getStoredValue(key, defaultValue);
    const store         = writable(stored);
    const defaultExpire = Date.now() + DURATION.DAY_MS;

    return {
        subscribe: store.subscribe,
        update:    store.update,
        set: (value, expireMs = defaultExpire) => { 
            saveToLocalStorage(key, value, expireMs);
            store.set(value);
        },
    }
}
