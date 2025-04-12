import { CATEGORY_TYPE, ARTICLE_TYPE, ARTICLE_TYPE_TEXT, ARTICLE_DETAIL_TYPE_TEXT, CATEGORY_TYPE_TEXT } from '../constants/articles';
import { PATHS } from '../constants/paths';
import { DF_UI } from '../constants/resourcePath';

// categoryType 별 페이지 정보 조회 함수
export function getPage(categoryType, articleType) {
    const categoryConfig = {
        [CATEGORY_TYPE.NEWS]: {
            bannerBackground: `${DF_UI}/img/visual/bg_news.jpg`,
            paths: PATHS.NEWS,
        },
        [CATEGORY_TYPE.COMMUNITY]: {
            bannerBackground: `${DF_UI}/img/visual/bg_community.jpg`,
            paths: PATHS.COMMUNITY,
        },
        [CATEGORY_TYPE.SERVICE_CENTER]: {
            bannerBackground: `${DF_UI}/img/visual/bg_customer.jpg`,
            paths: PATHS.SERVICE_CENTER,
        },
    };

    const config = categoryConfig[categoryType];
    if (!config) {
        alert('존재하지 않는 카테고리 타입');
        return;
    }

    return {
        bannerBackground: config.bannerBackground,
        listPath:   getListPath(categoryType, articleType),
        readPath:   config.paths.READ,
        writePath:  config.paths.WRITE,
        editPath:   config.paths.EDIT,
    };
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

    if(categoryType == CATEGORY_TYPE.SERVICE_CENTER) {
        if (articleType == ARTICLE_TYPE.SERVICE_CENTER.PRIVATE_CONTACT) {
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

    // 서비스센터 
    if (categoryType == CATEGORY_TYPE.SERVICE_CENTER) {
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

    if (categoryType == CATEGORY_TYPE.SERVICE_CENTER) {
        return ARTICLE_DETAIL_TYPE_TEXT[categoryType][articleType][articleDetailType];
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

    if (categoryType == CATEGORY_TYPE.SERVICE_CENTER) {
        switch (articleType) {
            case ARTICLE_TYPE.SERVICE_CENTER:   return PATHS.SERVICE_CENTER.PRIVATE_CONTACT.LIST;
            default:                            return PATHS.SERVICE_CENTER.PRIVATE_CONTACT.LIST;
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
    return Object.keys(ARTICLE_TYPE_TEXT[categoryType]).map((article_type) => ({
        text: ARTICLE_TYPE_TEXT[categoryType][article_type],
        url: getListPath(categoryType, Number(article_type)),
        isActive: articleType == article_type,
    }));
}
