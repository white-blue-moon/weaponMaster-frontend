
export const CATEGORY_TYPE = {
    NEWS: 1,
    COMMUNITY: 2,
    SERVICE_CENTER: 3,
};

export const ARTICLE_TYPE = {
    NEWS: {
        NOTICE: 1,
        UPDATE: 2,
        DEV_NOTE: 3,
    },

    COMMUNITY: {
        ALL: 0,
        ASK: 1,
        TALK: 2,
    },

    SERVICE_CENTER: {

    },
}

export const ARTICLE_TYPE_TEXT = {
    [CATEGORY_TYPE.NEWS]: {
        [ARTICLE_TYPE.NEWS.NOTICE]:   "공지사항",
        [ARTICLE_TYPE.NEWS.UPDATE]:   "업데이트",
        [ARTICLE_TYPE.NEWS.DEV_NOTE]: "개발자노트",
    },

    [CATEGORY_TYPE.COMMUNITY]: {
        [ARTICLE_TYPE.COMMUNITY.ALL]:  "전체",
        [ARTICLE_TYPE.COMMUNITY.ASK]:  "질문",
        [ARTICLE_TYPE.COMMUNITY.TALK]: "수다",
    },
}

export const ARTICLE_DETAIL_TYPE = {
    NEWS: {
        NOTICE: {
            NORMAL: 1,
            INSPECTION: 2,
        },

        UPDATE: {
            NORMAL: 1,
            ADMIN_TOOL: 2,
        }
    }
}

export const ARTICLE_DETAIL_TYPE_TEXT = {
   [CATEGORY_TYPE.NEWS]: {
        [ARTICLE_TYPE.NEWS.NOTICE]: {
            [ARTICLE_DETAIL_TYPE.NEWS.NOTICE.NORMAL]:     "일반",
            [ARTICLE_DETAIL_TYPE.NEWS.NOTICE.INSPECTION]: "점검",
        },

        [ARTICLE_TYPE.NEWS.UPDATE]: {
            [ARTICLE_DETAIL_TYPE.NEWS.UPDATE.NORMAL]:     "일반",
            [ARTICLE_DETAIL_TYPE.NEWS.UPDATE.ADMIN_TOOL]: "어드민툴",
        },
    }
}
