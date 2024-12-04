<script>
    let activeTab = "전체"; // 현재 활성화된 탭을 저장
  
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
  
    // 탭을 클릭했을 때 활성화 상태 변경
    function setActiveTab(tab) {
      activeTab = tab;
    }
  </script>
  
  <section class="news_bnrs">
    <article class="container">
      <div class="news">
        <h3>
          새소식
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
        </h3>
        <ul class="news_con">
          {#each newsData[activeTab] as news}
          <li>
            <a href="/">{news}</a>
          </li>
          {/each}
        </ul>
      </div>
    </article>
  </section>
  
  <style>
    .news_bnrs {
      font-family: Arial, sans-serif;
      padding: 20px;
    }
  
    .news_tab a {
      text-decoration: none;
      color: black;
      padding: 5px 10px;
      margin-right: 5px;
      border: 1px solid transparent;
      border-radius: 5px;
      cursor: pointer;
    }
  
    .news_tab a.on {
      color: white;
      background-color: blue;
      border-color: blue;
    }
  
    .news_con {
      list-style: none;
      padding: 0;
      margin-top: 20px;
    }
  
    .news_con li {
      margin-bottom: 10px;
    }
  
    .news_con li a {
      text-decoration: none;
      color: #333;
    }
  
    .news_con li a:hover {
      text-decoration: underline;
    }
  </style>
  