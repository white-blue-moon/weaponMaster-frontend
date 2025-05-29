import { AUCTION_STATE } from "../../constants/auctionState";

export function isAuctionCompleted(state) {
    switch (state) {
        case AUCTION_STATE.SOLD_OUT:       return true;
        case AUCTION_STATE.EXPIRED:        return true;
        case AUCTION_STATE.SERVER_INSPECT: return true;
        case AUCTION_STATE.MONITOR_ERROR:  return true;
    }

    return false;
}

export function getStatusLabelAndClass(state) {
    switch (state) {
        case AUCTION_STATE.SOLD_OUT:       return { label: "판매 완료", class: "completed" };
        case AUCTION_STATE.EXPIRED:        return { label: "기간 만료", class: "expired" };
        case AUCTION_STATE.SERVER_INSPECT: return { label: "추적 불가", class: "untrackable" };
        case AUCTION_STATE.MONITOR_ERROR:  return { label: "에러 발생", class: "error-state" };
    }

    return { label: "확인 불가", class: "error-state" };
}
