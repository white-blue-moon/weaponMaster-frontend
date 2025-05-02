export const BACKEND_ROOT = 'https://d1cb-2001-e60-1060-d022-849e-82fb-68b6-7e4e.ngrok-free.app'; // ngrok 을 이용한 임시 배포 주소
const  ROOT               = 'http://localhost:7070'; // TODO .env 파일을 통한 경로 관리 추후 고려 ex) const ROOT = import.meta.env.API_ROOT
export const API = {
    LOGO: {
        PUBLISHER:   `${ROOT}/logo/publisher`,
    },
    PAGE: {
        HOME:        `${ROOT}/page/home`,
        MAINTENANCE: (bannerType) => `${ROOT}/page/maintenance/${bannerType}`,
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
const ADMIN_ROOT = 'http://localhost:7770';
export const ADMIN_API = {
    MAINTENANCE: {
        GET_ACTIVE: `${ADMIN_ROOT}/maintenance/active`,
    }
};
