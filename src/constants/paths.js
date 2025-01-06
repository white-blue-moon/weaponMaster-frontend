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
    }
};
