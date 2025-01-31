const ROOT = 'http://localhost:7070'; // TODO .env 파일을 통한 경로 관리 추후 고려 ex) const ROOT = import.meta.env.API_ROOT
export const API = {
    HOME: ROOT,
    ACCOUNT: {
        JOIN:         `${ROOT}/account/join`,
        LOGIN_NORMAL: `${ROOT}/account/login/normal`,
        EXIST_USER:   (userId) => `${ROOT}/account/exist/${userId}`,
    },
    ARTICLES: {
        CREATE: `${ROOT}/articles`,
        LIST:   (categoryType, articleType) => 
                `${ROOT}/articles?categoryType=${categoryType}&articleType=${articleType}`,
        READ:   (id) => `${ROOT}/articles/${id}`,
        UPDATE: (id) => `${ROOT}/articles/${id}`,
        DELETE: (id) => `${ROOT}/articles/${id}`,
    },
    COMMENTS: {
        CREATE: `${ROOT}/comments`,
        LIST:   (id) => `${ROOT}/comments/${id}`,
        DELETE: (id) => `${ROOT}/comments/${id}`,
    },
};

// 어드민 툴 백엔드 서버 API
const ADMIN_ROOT = 'http://localhost:7770';
export const ADMIN_API = {
    INSPECTIOIN: {
        GET_ACTIVE: `${ADMIN_ROOT}/insepction/active`,
    }
};
