import { CATEGORY_TYPE, ARTICLE_TYPE, ARTICLE_TYPE_TEXT, ARTICLE_DETAIL_TYPE, ARTICLE_DETAIL_TYPE_TEXT } from '../constants/articles';
import { PATHS } from '../constants/paths';
import { DF_UI } from '../constants/resourcePath';

// categoryType 별 페이지 정보 조회 함수
export function getPage(categoryType, articleType) {
    let page = {};

    switch(categoryType) {
        case CATEGORY_TYPE.NEWS:
            page = {
                bannerText: "새소식",
                bannerBackground:   `${DF_UI}/img/visual/bg_news.jpg`,
                listPath:           getListPath(categoryType, articleType),
                readPath:   PATHS.NEWS.READ,
                writePath:  PATHS.NEWS.WRITE,
                editPath:   PATHS.NEWS.EDIT,
            };
            return page;

        case CATEGORY_TYPE.COMMUNITY:
            page = {
                bannerText: "커뮤니티",
                bannerBackground:   `${DF_UI}/img/visual/bg_community.jpg`,
                listPath:           getListPath(categoryType, articleType),
                readPath:   PATHS.COMMUNITY.READ,
                writePath:  PATHS.COMMUNITY.WRITE,
                editPath:   PATHS.COMMUNITY.EDIT,
            };
            return page;

        default:
            page = { bannerText: "존재하지 않는 카테고리 타입" };
            return page;
    }
}

export function isDetailTypeExist(categoryType, articleType) {
    if (categoryType == CATEGORY_TYPE.NEWS) {
        if (articleType == ARTICLE_TYPE.NEWS.NOTICE) {
            return true;
        }

        if (articleType == ARTICLE_TYPE.NEWS.UPDATE) {
            return true;
        }
    }

    return false;
}

export function getArticleFilter(categoryType, articleType) {
    let result = [];
    
    // 새소식 
    if (categoryType == CATEGORY_TYPE.NEWS) {
        if (ARTICLE_DETAIL_TYPE_TEXT[categoryType]?.[articleType]) {
            for (const [filterType, filterText] of Object.entries(ARTICLE_DETAIL_TYPE_TEXT[categoryType][articleType])) { // Object.entries()는 객체를 키-값 쌍의 배열로 변환
                result.push({
                    hasDetailType: true,
                    filterType: filterType,
                    filterText: filterText,
                });
            }
        }
    }

    // 커뮤니티
    if (categoryType == CATEGORY_TYPE.COMMUNITY && articleType == ARTICLE_TYPE.COMMUNITY.ALL) {
        for (const [filterType, filterText] of Object.entries(ARTICLE_TYPE_TEXT[categoryType])) {
            if (filterType != ARTICLE_TYPE.COMMUNITY.ALL) {
                result.push({
                    hasDetailType: false,
                    filterType: filterType,
                    filterText: filterText,
                });
            }       
        }
    }

    return result;
}

export function getArticleFilterText(categoryType, articleType, articleDetailType) {
    if (categoryType == CATEGORY_TYPE.NEWS) {
        if (ARTICLE_DETAIL_TYPE_TEXT[categoryType]?.[articleType]) {
            return ARTICLE_DETAIL_TYPE_TEXT[categoryType][articleType][articleDetailType];
        }
    }

    if (categoryType == CATEGORY_TYPE.COMMUNITY) {
        return ARTICLE_TYPE_TEXT[categoryType][articleType];
    }

    return "공통";
}

export function getListPath(categoryType, articleType) {
    if (categoryType == CATEGORY_TYPE.NEWS) {
        switch (articleType) {
            case ARTICLE_TYPE.NEWS.NOTICE:      return PATHS.NEWS.NOTICE.LIST;
            case ARTICLE_TYPE.NEWS.UPDATE:      return PATHS.NEWS.UPDATE.LIST;
            case ARTICLE_TYPE.NEWS.DEV_NOTE:    return PATHS.NEWS.DEV_NOTE.LIST;
            default:                            return PATHS.NEWS.NOTICE.LIST;
        }
    }

    if (categoryType == CATEGORY_TYPE.COMMUNITY) {
        switch (articleType) {
            case ARTICLE_TYPE.COMMUNITY.ALL:    return PATHS.COMMUNITY.ALL.LIST;
            case ARTICLE_TYPE.COMMUNITY.ASK:    return PATHS.COMMUNITY.ASK.LIST;
            case ARTICLE_TYPE.COMMUNITY.TALK:   return PATHS.COMMUNITY.TALK.LIST;
            default:                            return PATHS.COMMUNITY.ALL.LIST;
        }
    }

    return "";
}


export function getCategoryTypeByURL(url) {
    if (url.startsWith('/news')) {
        return CATEGORY_TYPE.NEWS;
    }

    if (url.startsWith('/community')) {
        return CATEGORY_TYPE.COMMUNITY;
    }

    if (url.startsWith('/service')) {
        return CATEGORY_TYPE.SERVICE_CENTER;
    }

    return 0;
}

// Menu2nd 에서의 텍스트, url 정보 할당
export function getMenu2nd(categoryType, articleType) {
    let menu2nd = [];

    switch (categoryType) {
        case CATEGORY_TYPE.NEWS: 
            menu2nd = Object.values(ARTICLE_TYPE.NEWS).map((artice_type) => ({
                text: ARTICLE_TYPE_TEXT[categoryType][artice_type],
                url: getListPath(categoryType, artice_type),
                isActive: articleType == artice_type,
            }))
            return menu2nd;

        case CATEGORY_TYPE.COMMUNITY: 
            menu2nd = Object.values(ARTICLE_TYPE.COMMUNITY).map((artice_type) => ({
                text: ARTICLE_TYPE_TEXT[categoryType][artice_type],
                url: getListPath(categoryType, artice_type),
                isActive: articleType == artice_type,
            }))
            return menu2nd; 
            
        default:
            menu2nd = [{ text: "존재하지 않는 카테고리 타입", url: PATHS.HOME }];
            return menu2nd;
    }
}
