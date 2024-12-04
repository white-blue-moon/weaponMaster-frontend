<script>
    import FocusBanner from "./FocusBanner.svelte";

    export let width = "400px"; // 기본값 설정
    export let height = "280px"; // 기본값 설정
  
    let activeTab = "전체";
  
    const tabs = ["전체", "공지사항", "업데이트", "개발자노트"];
    const newsData = {
        전체: [
            "[점검] 12/5(목) 정기점검 안내",
            "[일반] 12월 우리카드 우리WON페이 캐시백 이벤트",
            "[일반] [유저와 함께하는 사회공헌 캠페인] 넥슨 히어로가 되어주세요!",
            "[일반] 넥슨 30주년 기념 ＇파란소녀가 준비한 연말 대축제＇ 진행 안내",
            "[일반] 넥슨플레이 ＇넥슨 30주년 기념, 파란소녀의 보물상자를 찾아줘!＇ 이벤트 진행 안내",
            "[일반] 던전앤파이터 20주년 아트 공모전 사전 안내",
            "[던파ON] (22:15 추가) 11/29(금) 확인된 오류 안내",
        ],
        공지사항: ["[점검] 12/5(목) 정기점검 안내"],
        업데이트: ["[던파ON] 11/28(목) 던파ON 업데이트 안내"],
        개발자노트: ["지정 PC 기능이 여러분을 찾아뵐 예정입니다."],
    };
  
    function setActiveTab(tab) {
        activeTab = tab;
    }
</script>
  
<section
    class="news_bnrs"
    style="--news-width: {width}; --news-height: {height};"
>
    <div class="news_header">
        <h3>새소식</h3>
        <p class="news_tab">
            {#each tabs as tab}
                <a
                    href="#"
                    class="{activeTab === tab ? 'on' : ''}"
                    on:click|preventDefault={() => setActiveTab(tab)}
                >
                    #{tab}
                </a>
            {/each}
        </p>
    </div>
    <div class="divider"></div>
    <ul class="news_con">
        {#each newsData[activeTab] as news}
            <li>
                <a href="/">{news}</a>
            </li>
        {/each}
    </ul>
</section>
  
<style>
    .news_bnrs {
        font-family: Arial, sans-serif;
        width: var(--news-width);
        height: var(--news-height);
        overflow: hidden; /* 전체 배너 영역 넘침 방지 */
    }
  
    .news_header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 10px;
    }

    .news_header h3 {
        font-size: 1.3em;
        font-weight: 390;
        color: #151518;
        margin: 0;
        line-height: 1.5;
    }

    .news_tab {
        display: flex;
        gap: 14px;
        align-items: center;
        margin: 0;
        padding: 0;
    }

    .news_tab a {
        text-decoration: none;
        color: #6a6e76;
        font-size: 0.98em;
        line-height: 1.5;
        transition: color 0.3s;
    }

    .news_tab a:hover {
        color: #007aff;
    }

    .news_tab a.on {
        color: #007aff;
    }

    .divider {
        border-bottom: 1px solid #ddd;
        margin-top: 10px;
    }
  
    .news_con {
        list-style: none;
        padding: 0;
        max-height: calc(var(--news-height) - 50px); /* 뉴스 영역의 최대 높이 */
        /* overflow-y: auto; 스크롤 가능 */
    }
  
    .news_con li {
        margin-bottom: 10px;
        width: 100%; /* 부모 리스트에 너비 추가 */
    }

    .news_con li a {
        text-decoration: none;
        color: #6a6e76;
        font-size: 0.98em;
        
        /* 텍스트 줄임표 처리 */
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: calc(var(--news-width) - 15px); /* 최대 너비 설정 */
        display: inline-block;
    }

    .news_con li a:hover {
        text-decoration: underline;
    }
</style>
