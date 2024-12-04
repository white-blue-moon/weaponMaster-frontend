<script>
    import FocusBanner from "./FocusBanner.svelte";
  
    let activeTab = "전체";
  
    const tabs = ["전체", "공지사항", "업데이트", "개발자노트"];
    const newsData = {
      전체: [
        "[점검] 12/5(목) 정기점검 안내",
        "[일반] 12월 우리카드 우리WON페이 캐시백 이벤트",
        "[일반] [유저와 함께하는 사회공헌 캠페인] 넥슨 히어로가 되...",
        "[일반] 넥슨 30주년 기념 '파란소녀가 준비한 연말 대축제'...",
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
  
  <section class="news_bnrs">
    <div class="container">
      <!-- 뉴스 영역 -->
      <div class="news">
        <div class="news_header">
          <h3>새소식</h3>
          <p class="news_tab">
            {#each tabs as tab}
            <a
              href="#"
              class="{activeTab === tab ? 'on' : ''}"
              on:click|preventDefault={() => setActiveTab(tab)}
              >#{tab}</a
            >
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
      </div>
  
      <!-- 배너 영역 -->
      <div class="focus-banners">
        <div class="left-focus-banner"><FocusBanner /></div>
        <div class="right-focus-banner"><FocusBanner /></div>
      </div>
    </div>
  </section>
  
  <style>
    /* 전체 컨테이너 */
    .news_bnrs {
      font-family: Arial, sans-serif;
      margin: 60px;
    }
  
    /* 컨테이너: 뉴스 + 배너 */
    .container {
      display: flex;
      justify-content: space-between;
      gap: 20px;
    }
  
    /* 뉴스 영역 */
    .news {
      flex: 2;
    }
  
    /* 뉴스 헤더: 새소식 + 탭 영역 */
    .news_header {
      display: flex;
      align-items: center; /* 제목과 탭을 수직으로 정렬 */
      justify-content: space-between; /* 제목과 탭 간 간격 유지 */
      margin-bottom: 10px;
    }

    /* "새소식" 제목 */
    .news_header h3 {
      font-size: 1.3em;
      font-weight: 390;
      color: #151518;
      margin: 0;
      line-height: 1.5; /* 라인 높이를 조정하여 탭과 기준선 맞추기 */
    }

    /* 탭 컨테이너 */
    .news_tab {
      display: flex;
      gap: 14px; /* 탭 간 간격 */
      align-items: center; /* 탭 텍스트를 수직 중앙 정렬 */
      margin: 0;
      padding: 0;
    }

    /* 탭 기본 스타일 */
    .news_tab a {
      text-decoration: none;
      color: #6a6e76;
      font-size: 0.98em;
      padding: 0; /* 내부 여백 제거 */
      line-height: 1.5; /* 라인 높이를 제목과 동일하게 맞춤 */
      transition: color 0.3s;
    }

    /* 탭 호버 시 스타일 */
    .news_tab a:hover {
      color: #007aff; /* 파란색으로 변경 */
    }

    /* 선택된 탭 (활성화된 탭) 스타일 */
    .news_tab a.on {
      color: #007aff; /* 글씨만 파란색 */
    }

    /* 구분선 스타일 */
    .divider {
      border-bottom: 1px solid #ddd;
      margin-top: 10px; /* 탭과 구분선 간 거리 */
    }
  
    .news_con {
      list-style: none;
      padding: 0;
    }
  
    .news_con li {
      margin-bottom: 10px;
    }
  
    .news_con li a {
      text-decoration: none;
      color: #6a6e76;
      font-size: 0.98em;
    }
  
    .news_con li a:hover {
      text-decoration: underline;
    }
  
    /* 포커스 배너 영역 */
    .focus-banners {
      flex: 1;
      display: flex;
      gap: 10px;
    }

    .left-focus-banner, .right-focus-banner {
        width: 400px;
    }

  </style>
  