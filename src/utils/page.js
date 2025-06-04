import { CATEGORY_TYPE, ARTICLE_TYPE, ARTICLE_TYPE_TEXT, ARTICLE_DETAIL_TYPE_TEXT, CATEGORY_TYPE_TEXT } from '../constants/articles';
import { BASE, PATHS } from '../constants/paths';
import { DF_UI } from '../constants/resourcePath';

// categoryType 별 페이지 정보 조회 함수
export function getPageInfo(categoryType, articleType) {
    const categoryConfig = {
        [CATEGORY_TYPE.NEWS]: {
            bannerBackground: `${DF_UI}/img/visual/bg_news.jpg`,
            paths: PATHS.NEWS,
        },
        [CATEGORY_TYPE.INTRODUCE]: {
            bannerBackground: `${DF_UI}/img/visual/bg_news.jpg`,
            paths: PATHS.INTRODUCE,
        },
        [CATEGORY_TYPE.GUIDE]: {
            bannerBackground: `${DF_UI}/img/visual/bg_news.jpg`,
            paths: PATHS.GUIDE,
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

// PageWrite 컴포넌트에서 (게시글 작성 시) 추가 세부 분류항목을 선택해야 하는 경우 사용하는 함수
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

export function getArticleFilterText(article) {
    const { categoryType, articleType, articleDetailType } = article;

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

    if (categoryType == CATEGORY_TYPE.GUIDE) {
        switch (articleType) {
            case ARTICLE_TYPE.GUIDE.OVERVIEW:   return PATHS.GUIDE.OVERVIEW;
            case ARTICLE_TYPE.GUIDE.AUCTION:    return PATHS.GUIDE.AUCTION;
            case ARTICLE_TYPE.GUIDE.SLACK:      return PATHS.GUIDE.SLACK;
            default:                            return PATHS.GUIDE.OVERVIEW;
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
    if (url.startsWith(`${BASE}/news`)) {
        return CATEGORY_TYPE.NEWS;
    }

    if (url.startsWith(`${BASE}/community`)) {
        return CATEGORY_TYPE.COMMUNITY;
    }

    if (url.startsWith(`${BASE}/service`)) {
        return CATEGORY_TYPE.SERVICE_CENTER;
    }

    return 0;
}

// Menu2nd 에서의 텍스트, url 정보 할당
export function getMenu2nd(categoryType, articleType) {
    const articleTypes  = Object.keys(ARTICLE_TYPE_TEXT[categoryType]);

    return articleTypes.map((type) => ({
        text:     ARTICLE_TYPE_TEXT[categoryType][type],
        url:      getListPath(categoryType, Number(type)),
        isActive: articleType == type,
    }));
}

export function getPagePath(article) {
    let category;

    switch(article.categoryType) {
        case CATEGORY_TYPE.INTRODUCE:      return PATHS.INTRODUCE.PURPOSE;
        case CATEGORY_TYPE.GUIDE:          return getGuidePath(article.articleType);
        case CATEGORY_TYPE.NEWS:           category = "news";       break;
        case CATEGORY_TYPE.COMMUNITY:      category = "community";  break;
        case CATEGORY_TYPE.SERVICE_CENTER: category = "service";    break;
        default: throw new Error("Unknown categoryType, can't get page path");
    }

    return `${BASE}/${category}/${article.id}`;
}

function getGuidePath(articleType) {
    switch (articleType) {
        case ARTICLE_TYPE.GUIDE.AUCTION: return PATHS.GUIDE.AUCTION;
        case ARTICLE_TYPE.GUIDE.SLACK:   return PATHS.GUIDE.SLACK;
        default:                         return PATHS.GUIDE.OVERVIEW;
    }
}
