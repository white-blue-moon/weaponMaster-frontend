import { get } from 'svelte/store';
import { userInfo, isAdmin } from './auth';
import { ARTICLE_TYPE, CATEGORY_TYPE } from "../constants/articles";


export function isAuthorOrAdmin(author) {
    const userId      = get(userInfo);
    const isAdminMode = get(isAdmin);

    if (userId === author) {
        return true;
    }

    if (isAdminMode) {
        return true;
    }

    return false;
}

export function isPrivacyMode(categoryType, articleType, author) {
    if (isPrivacyArticle(categoryType, articleType)) {
        if (!isAuthorOrAdmin(author)) {
            return true;
        } 
    }

    return false;
}

export function isPrivacyArticle(categoryType, articleType) {
    if (categoryType == CATEGORY_TYPE.SERVICE_CENTER)
        if (articleType == ARTICLE_TYPE.SERVICE_CENTER.PRIVATE_CONTACT) {
            return true;
        }
    
    return false;
}
