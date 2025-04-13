import { writable } from "svelte/store";

// 사용자 정보 저장소
export const userInfo = writable(
    JSON.parse(localStorage.getItem("userInfo")) || null
);

// 로그인 상태 저장소
export const isLoggedIn = writable(
    JSON.parse(localStorage.getItem("isLoggedIn")) || false
);

// 관리자 여부
export const isAdmin =  writable(
    JSON.parse(localStorage.getItem("isAdmin")) || false
);

// 구독을 통해 변경될 때 브라우저 저장소에 저장
userInfo.subscribe((value) => {
    localStorage.setItem("userInfo", JSON.stringify(value));
});

isLoggedIn.subscribe((value) => {
    localStorage.setItem("isLoggedIn", JSON.stringify(value));
});

isAdmin.subscribe((value) => {
    localStorage.setItem("isAdmin", JSON.stringify(value));
});

export function handleLogout() {
    userInfo.set(null);
    isLoggedIn.set(false);
    isAdmin.set(false);

    alert("로그아웃 되었습니다.");
    window.location.href = "/";
}
