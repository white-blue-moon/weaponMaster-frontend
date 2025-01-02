const ROOT = 'http://localhost:7070'; // TODO .env 파일을 통한 경로 관리 추후 고려 ex) const ROOT = import.meta.env.API_ROOT

export const API = {
    HOME: ROOT,
    ACCOUNT: {
        JOIN: `${ROOT}/account/join`,
        LOGIN_NORMAL: `${ROOT}/account/login/normal`,
        EXIST_USER_ID: (userId) => `${ROOT}/account/exist/${userId}`,
    },
    ARTICLES: {
        BASE: `${ROOT}/articles`,
        LIST: (categoryType, articleType) => `${ROOT}/articles/list/${categoryType}/${articleType}`,
    }
};
