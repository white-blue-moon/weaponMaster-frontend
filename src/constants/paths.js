import { SERVICE_DOMAIN } from "./api";
import { setRedirectUrl } from "../utils/pathUtiil";

export const BASE = '/weapon-front';

export const PATHS = {
    ACCESS_GATE: `${BASE}/access-gate`,
    HOME:        `${BASE}/`,

    MAINTENANCE:         `${BASE}/`,
    MAINTENANCE_PREVIEW: `${BASE}/maintenance-preview`,

    ACCOUNT: {
        JOIN:        `${BASE}/account/join`,
        LOGIN:       () => `${BASE}/account/login?redirect=${setRedirectUrl()}`,
        LOGIN_ADMIN: () => `${BASE}/account/login/admin?redirect=${setRedirectUrl()}`,

        LOGIN_TEMPLATE:       `${BASE}/account/login`,
        LOGIN_ADMIN_TEMPLATE: `${BASE}/account/login/admin`,
    },

    INTRODUCE: {    
        PURPOSE: `${BASE}/introduce/purpose`,
    },

    GUIDE: {
        OVERVIEW: `${BASE}/guide/overview`,
        AUCTION:  `${BASE}/guide/auction`,
        SLACK:    `${BASE}/guide/slack`,
    },
    
    NEWS: {    
        READ:   (id) => `${BASE}/news/${id}`,
        EDIT:   (id) => `${BASE}/news/edit/${id}`,
        WRITE:  `${BASE}/news/write`,

        READ_TEPLATE:   `${BASE}/news/:id`,
        EDIT_TEMPLATE:  `${BASE}/news/edit/:id`,

        NOTICE:     { LIST: `${BASE}/news/notice/list` },
        UPDATE:     { LIST: `${BASE}/news/update/list` },
        DEV_NOTE:   { LIST: `${BASE}/news/devnote/list` },
    },


    COMMUNITY: {
        READ:   (id) => `${BASE}/community/${id}`,
        EDIT:   (id) => `${BASE}/community/edit/${id}`,
        WRITE:  `${BASE}/community/write`,

        READ_TEPLATE:   `${BASE}/community/:id`,
        EDIT_TEMPLATE:  `${BASE}/community/edit/:id`,

        ALL:     { LIST: `${BASE}/community/all/list` },
        ASK:     { LIST: `${BASE}/community/ask/list` },
        TALK:    { LIST: `${BASE}/community/talk/list` },
    },

    SERVICE_CENTER: {
        READ:   (id) => `${BASE}/service/${id}`,
        EDIT:   (id) => `${BASE}/service/edit/${id}`,
        WRITE:  `${BASE}/service/write`,

        READ_TEPLATE:   `${BASE}/service/:id`,
        EDIT_TEMPLATE:  `${BASE}/service/edit/:id`,

        PRIVATE_CONTACT: { LIST: `${BASE}/service/private_contact/list` },
    },

    ADMIN_TOOL: `${SERVICE_DOMAIN}/admin-front/`,

    DNF: `https://df.nexon.com`
};
