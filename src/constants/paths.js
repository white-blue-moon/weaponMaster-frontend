export const PATHS = {
    HOME: '/',
    INSPECTION: '/inspection',
    ACCOUNT: {
        JOIN:   '/account/join',
        LOGIN:  '/account/login',
    },
    NEWS: {    
        READ:   (id) => `/news/${id}`,
        WRITE:  '/news/write',
        EDIT:   (id) => `/news/edit/${id}`,

        READ_TEPLATE:   '/news/:id',
        EDIT_TEMPLATE:  '/news/edit/:id',

        NOTICE:     { LIST: '/news/notice/list' },
        UPDATE:     { LIST: '/news/update/list' },
        DEV_NOTE:   { LIST: '/news/devnote/list' },
    },
    COMMUNITY: {
        READ:   (id) => `/community/${id}`,
        WRITE:  '/community/write',
        EDIT:   (id) => `/community/edit/${id}`,

        READ_TEPLATE:   '/community/:id',
        EDIT_TEMPLATE:  '/community/edit/:id',

        ALL:     { LIST: '/community/all/list' },
        ASK:     { LIST: '/community/ask/list' },
        TALK:   { LIST: '/community/talk/list' },
    },
};
