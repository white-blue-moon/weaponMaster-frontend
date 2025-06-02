
export const CATEGORY_TYPE = {
    NEWS:           1,
    COMMUNITY:      2,
    SERVICE_CENTER: 3,
    INTRODUCE:      4,
    GUIDE:          5,
};

export const CATEGORY_TYPE_TEXT = {
    [CATEGORY_TYPE.NEWS]:           "새소식",
    [CATEGORY_TYPE.INTRODUCE]:      "사이트소개",
    [CATEGORY_TYPE.GUIDE]:          "가이드",
    [CATEGORY_TYPE.COMMUNITY]:      "커뮤니티",
    [CATEGORY_TYPE.SERVICE_CENTER]: "서비스센터",
};

export const ARTICLE_TYPE = {
    ALL: 0,

    NEWS: {
        NOTICE:   1,
        UPDATE:   2,
        DEV_NOTE: 3,
    },

    INTRODUCE: {
        HOME_PAGE_PURPOSE: 1,
    },

    GUIDE: {
        HOME_PAGE_GUIDE: 1,
    },

    COMMUNITY: {
        ALL:  0,
        ASK:  1,
        TALK: 2,
    },

    SERVICE_CENTER: {
        PRIVATE_CONTACT: 1,
    },
}

export const ARTICLE_TYPE_TEXT = {
    [CATEGORY_TYPE.NEWS]: {
        [ARTICLE_TYPE.NEWS.NOTICE]:   "공지사항",
        [ARTICLE_TYPE.NEWS.UPDATE]:   "업데이트",
        [ARTICLE_TYPE.NEWS.DEV_NOTE]: "개발자노트",
    },

    [CATEGORY_TYPE.INTRODUCE]: {
        [ARTICLE_TYPE.INTRODUCE.HOME_PAGE_PURPOSE]: "목적 및 소개",
    },

    [CATEGORY_TYPE.GUIDE]: {
        [ARTICLE_TYPE.GUIDE.HOME_PAGE_GUIDE]: "통합 가이드",
    },

    [CATEGORY_TYPE.COMMUNITY]: {
        [ARTICLE_TYPE.COMMUNITY.ALL]:  "전체",
        [ARTICLE_TYPE.COMMUNITY.ASK]:  "질문",
        [ARTICLE_TYPE.COMMUNITY.TALK]: "수다",
    },

    [CATEGORY_TYPE.SERVICE_CENTER]: {
        [ARTICLE_TYPE.SERVICE_CENTER.PRIVATE_CONTACT]: "1:1문의",
    },
}

export const ARTICLE_DETAIL_TYPE = {
    NEWS: {
        NOTICE: {
            NORMAL:     1,
            MAINTENANCE: 2,
        },

        UPDATE: {
            NORMAL:     1,
            ADMIN_TOOL: 2,
        }
    },

    SERVICE_CENTER: {
        PRIVATE_CONTACT: {
            WAITING:  0,
            ANSWERED: 1,
        },
    },
}

export const ARTICLE_DETAIL_TYPE_TEXT = {
   [CATEGORY_TYPE.NEWS]: {
        [ARTICLE_TYPE.NEWS.NOTICE]: {
            [ARTICLE_DETAIL_TYPE.NEWS.NOTICE.NORMAL]:     "일반",
            [ARTICLE_DETAIL_TYPE.NEWS.NOTICE.MAINTENANCE]: "점검",
        },

        [ARTICLE_TYPE.NEWS.UPDATE]: {
            [ARTICLE_DETAIL_TYPE.NEWS.UPDATE.NORMAL]:     "일반",
            [ARTICLE_DETAIL_TYPE.NEWS.UPDATE.ADMIN_TOOL]: "어드민툴",
        },
    },

    [CATEGORY_TYPE.SERVICE_CENTER]: {
        [ARTICLE_TYPE.SERVICE_CENTER.PRIVATE_CONTACT]: {
            [ARTICLE_DETAIL_TYPE.SERVICE_CENTER.PRIVATE_CONTACT.WAITING]:  "미답변",
            [ARTICLE_DETAIL_TYPE.SERVICE_CENTER.PRIVATE_CONTACT.ANSWERED]: "답변완료",
        },
    },
}
