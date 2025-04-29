export const PATHS = {
    HOME: '/',
    INSPECTION: '/',
    ACCOUNT: {
        JOIN:        '/account/join',
        LOGIN:       '/account/login',
        LOGIN_ADMIN: '/account/login/admin',
    },

    INTRODUCE: {    
        PURPOSE: '/introduce/purpose',
    },

    GUIDE: {    
        HOW_TO_USE: '/guide/how-to-use',
    },

    NEWS: {    
        READ:   (id) => `/news/${id}`,
        EDIT:   (id) => `/news/edit/${id}`,
        WRITE:  '/news/write',

        READ_TEPLATE:   '/news/:id',
        EDIT_TEMPLATE:  '/news/edit/:id',

        NOTICE:     { LIST: '/news/notice/list' },
        UPDATE:     { LIST: '/news/update/list' },
        DEV_NOTE:   { LIST: '/news/devnote/list' },
    },


    COMMUNITY: {
        READ:   (id) => `/community/${id}`,
        EDIT:   (id) => `/community/edit/${id}`,
        WRITE:  '/community/write',

        READ_TEPLATE:   '/community/:id',
        EDIT_TEMPLATE:  '/community/edit/:id',

        ALL:     { LIST: '/community/all/list' },
        ASK:     { LIST: '/community/ask/list' },
        TALK:    { LIST: '/community/talk/list' },
    },

    SERVICE_CENTER: {
        READ:   (id) => `/service/${id}`,
        EDIT:   (id) => `/service/edit/${id}`,
        WRITE:  '/service/write',

        READ_TEPLATE:   '/service/:id',
        EDIT_TEMPLATE:  '/service/edit/:id',

        PRIVATE_CONTACT: { LIST: '/service/private_contact/list' },
    },

    ADMIN_TOOL: 'http://localhost:8880/'
};
