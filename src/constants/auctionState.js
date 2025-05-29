
export const AUCTION_STATE = {
    MONITOR_ERROR:  -100, // 경매 추적 중 에러 발생
    SERVER_INSPECT:  -53, // 경매 추적 중 던전앤파이터 시스템(서버) 점검
    NONE:             -1, // 아무런 상태도 할당되지 않음을 의미

    SELLING:  0,
    SOLD_OUT: 1,
    EXPIRED:  2,
}
