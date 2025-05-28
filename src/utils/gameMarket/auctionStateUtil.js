import { AUCTION_STATE } from "../../constants/auctionState";

export function isAuctionCompleted(state) {
    if (state === AUCTION_STATE.SOLD_OUT) {
        return true;
    }

    if (state === AUCTION_STATE.EXPIRED) {
        return true;
    }

    return false;
}
