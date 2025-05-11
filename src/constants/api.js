// 환경에 따른 API 경로 설정 (개발/배포 환경)
const isDevelopment = window.location.hostname === 'localhost';

export const BACKEND_ROOT = 'https://weapon-master-portfolio.duckdns.org/weapon-back'; // 실제 배포 주소 -> slack 연동 시 참조
const  ROOT               = isDevelopment ? 'http://localhost:7070' : 'https://weapon-master-portfolio.duckdns.org/weapon-back';
export const API = {
    LOGO: {
        PUBLISHER:   `${ROOT}/logo/publisher`,
    },
    PAGE: {
        VERIFY_ACCESS_GATE: `${ROOT}/page/access-gate/verify`,
        HOME:               `${ROOT}/page/home`,
        MAINTENANCE: (bannerType) => `${ROOT}/page/maintenance?bannerType=${bannerType}`,
    },
    ACCOUNT: {
        JOIN:  `${ROOT}/accounts`,
        LOGIN: `${ROOT}/accounts/login`,
        CHECK_USER_ID_EXISTS: (userId) => `${ROOT}/accounts/${userId}/exists`,
    },
    ARTICLES: {
        CREATE:     `${ROOT}/articles`,
        LIST:       (categoryType, articleType) => `${ROOT}/articles?categoryType=${categoryType}&articleType=${articleType}`,
        READ:       (id) => `${ROOT}/articles/${id}`,
        UPDATE:     (id) => `${ROOT}/articles/${id}`,
        DELETE:     (id) => `${ROOT}/articles/${id}`,
        TOGGLE_PIN: (id) => `${ROOT}/articles/${id}/pin`,
    },
    COMMENTS: {
        CREATE: `${ROOT}/comments`,
        LIST:   (id) => `${ROOT}/comments/${id}`,
        DELETE: (id) => `${ROOT}/comments/${id}`,
    },
};

// 네오플 API
export const NEOPLE_API = {
    AUCTION: {
        LIST: (itemName) => `${ROOT}/neople/auction/${itemName}`,
    },
    AUCTION_NOITCE: {
        CREATE: `${ROOT}/neople/auction/notice`,
        DELETE: `${ROOT}/neople/auction/notice`,
        READ:   (userId) => `${ROOT}/neople/auction/notice?userId=${userId}`,
    },
}

// 슬랙 API
export const SLACK_API = {
    CHANNEL: {
        READ:   (userId, noticeType) => `${ROOT}/slack/${userId}/integration?noticeType=${noticeType}`,
        DELETE: (userId, noticeType) => `${ROOT}/slack/${userId}/integration?noticeType=${noticeType}`,
        TEST:   (userId, noticeType) => `${ROOT}/slack/${userId}/integration/test?noticeType=${noticeType}`,
    },
}

export const WEB_SOCKET_API = {
    FACTORY:       `${ROOT}/ws`,
    AUCTION_STATE: `/topic/auction-state`,
}

// 어드민 툴 백엔드 서버 API
const ADMIN_ROOT = isDevelopment ? 'http://localhost:7770' : 'https://weapon-master-portfolio.duckdns.org/admin-back';
export const ADMIN_API = {
    MAINTENANCE: {
        GET_ACTIVE: `${ADMIN_ROOT}/maintenance/active`,
    }
};
