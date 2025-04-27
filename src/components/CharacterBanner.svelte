<script>
    import { onMount } from 'svelte';


    let banners = [];
    let activeBanner;
    let activeCharacterType; 

    let isLoading = true;
    
    onMount(async () => {
        await fetchBanners();
        isLoading = false;
    });

    function movePrev() {
        const idx     = banners.findIndex(b => b.characterType === activeCharacterType);
        const prevIdx = (idx - 1 + banners.length) % banners.length;

        activeCharacterType = banners[prevIdx].characterType;
        activeBanner        = banners.find(banner => banner.characterType === activeCharacterType);
        selectedDetailType  = 1;
    }

    function moveNext() {
        const idx     = banners.findIndex(b => b.characterType === activeCharacterType);
        const nextIdx = (idx + 1) % banners.length;

        activeCharacterType = banners[nextIdx].characterType;
        activeBanner        = banners.find(banner => banner.characterType === activeCharacterType);
        selectedDetailType  = 1;
    }

    // 예시: API로 받아온 데이터
    async function fetchBanners() {
        // 실제로는 API 호출로 바꿔야 함 -> export 해서 home 에서 받아오게 하기
        banners = [
            {
            characterType: 4, // 격투가(여)
            nameImgUrl: "https://bbscdn.df.nexon.com/pg/characters/img/main/mc_txt04.png",
            thumbImgUrl: "https://bbscdn.df.nexon.com/pg/characters/img/thum/thum_char_04.png",
            bannerDetails: [
                {
                characterName: "넨마스터(여)",
                characterIntro: "넨의 힘을 활용하기 위한 수련을 한 격투가",
                imgUrl: "https://bbscdn.df.nexon.com/pg/characters/img/bg/bg14_3.jpg",
                homepageLinkUrl: "/pg/characters/cim14",
                characterDetailType: 1,
                },
                {
                characterName: "스트라이커(여)",
                characterIntro: "육체를 극한까지 단련한 정통파 격투가",
                imgUrl: "https://bbscdn.df.nexon.com/pg/characters/img/bg/bg15_3.jpg",
                homepageLinkUrl: "/pg/characters/cim15",
                characterDetailType: 2,
                },
                {
                characterName: "스트리트파이터(여)",
                characterIntro: "이기는 싸움을 추구하는 실전 격투가",
                imgUrl: "https://bbscdn.df.nexon.com/pg/characters/img/bg/bg16_3.jpg",
                homepageLinkUrl: "/pg/characters/cim16",
                characterDetailType: 3,
                },
                {
                characterName: "그래플러(여)",
                characterIntro: "잡기 기술을 극한까지 연마한 격투가",
                imgUrl: "https://bbscdn.df.nexon.com/pg/characters/img/bg/bg17_3.jpg",
                homepageLinkUrl: "/pg/characters/cim17",
                characterDetailType: 4,
                },
            ],
            },
            {
            characterType: 1, // 귀검사(남)
            nameImgUrl: "https://bbscdn.df.nexon.com/pg/characters/img/main/mc_txt01.png",
            thumbImgUrl: "https://bbscdn.df.nexon.com/pg/characters/img/thum/thum_char_01.png",
            bannerDetails: [
                {
                characterName: "웨펀마스터",
                characterIntro: "귀수에 깃든 귀신을 억누르며 검술 연마에 매진하는 귀검사",
                imgUrl: "https://bbscdn.df.nexon.com/pg/characters/img/bg/bg01_3.jpg",
                homepageLinkUrl: "/pg/characters/cim01",
                characterDetailType: 1,
                },
                {
                characterName: "소울브링어",
                characterIntro: "귀신과 소통함으로써 그 힘을 활용할 수 있게 된 귀검사",
                imgUrl: "https://bbscdn.df.nexon.com/pg/characters/img/bg/bg02_3.jpg",
                homepageLinkUrl: "/pg/characters/cim02",
                characterDetailType: 2,
                },
                {
                characterName: "버서커",
                characterIntro: "강력한 힘을 위해 부작용을 감수하며 카잔증후군을 받아들인 귀검사",
                imgUrl: "https://bbscdn.df.nexon.com/pg/characters/img/bg/bg03_3.jpg",
                homepageLinkUrl: "/pg/characters/cim03",
                characterDetailType: 3,
                },
                {
                characterName: "아수라",
                characterIntro: "파동의 힘을 느끼기 위해 스스로 시력을 포기한 귀검사",
                imgUrl: "https://bbscdn.df.nexon.com/pg/characters/img/bg/bg04_3.jpg",
                homepageLinkUrl: "/pg/characters/cim04",
                characterDetailType: 4,
                },
                {
                characterName: "검귀",
                characterIntro: "원귀의 혼과 융합하여 귀신과 인간의 경계에 선 귀검사",
                imgUrl: "https://bbscdn.df.nexon.com/pg/characters/img/bg/bg05_3.jpg",
                homepageLinkUrl: "/pg/characters/cim05",
                characterDetailType: 5,
                },
            ],
            },
        ];

        activeCharacterType = banners[0].characterType; // 기본 활성화 타입 세팅
        activeBanner        = banners.find(banner => banner.characterType === activeCharacterType);
    }

    let selectedDetailType = 1;
    function clickDetailType(detailType) {
        selectedDetailType = detailType;
    }
</script>
  

{#if !isLoading}
    <section class="char_info " id="characSection">
        <article class="char_control">
            <a class="arrow_l" on:click={() => movePrev()}>prev</a>
            <a class="arrow_r" on:click={() => moveNext()}>next</a>
            <span class="mc_txt" style="background: url('{activeBanner.nameImgUrl}');"></span>
        </article>

        {#each banners as banner}
            <article class="c_box  {banner.characterType === activeCharacterType ? 'on' : 'off'}">
                <ul class="char_bnr">
                    {#each banner.bannerDetails as detail}
                        <li style="background: url('{detail.imgUrl}') no-repeat" class="{detail.characterDetailType === selectedDetailType ? 'on' : ''}">
                            <a href="{detail.homepageLinkUrl}" target="_blank"   class="{detail.characterDetailType === selectedDetailType ? 'on' : ''}" data-gtm-type="character-section"></a>
                            <p class="name">{detail.characterName}</p>
                            <p class="info">{detail.characterIntro}</p>
                        </li>
                    {/each}
                </ul>
                <p class="char_thum">
                    {#each banner.bannerDetails as detail, idx}
                        <a 
                            class="c_pos{idx + 1} {idx + 1 === selectedDetailType ? 'on' : ''}" 
                            on:click={() => clickDetailType(idx+1)}
                            style="--thumb-img-url: url('{banner.thumbImgUrl}');"
                        >
                            <i>{detail.characterName}</i>
                        </a>
                    {/each}
                </p>
            </article>
        {/each}
    </section>
{/if}


<style lang="scss">
    * {
        margin: 0;
        padding: 0;
        font: inherit;
        box-sizing: border-box;
    }

    a {
        text-decoration: none;
    }
    
    .char_info {
        position: relative;
        height: 790px;
        margin-top: 10px;
        margin-bottom: 25px;
    }

    .char_info .c_box {
        z-index: 0;
        opacity: 0;
        transition: 0.4s;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
    }

    .char_info .c_box.on {
        z-index: 1;
        opacity: 1;
    }

    .char_info .char_bnr {
        position: relative;
        background: #000;
        overflow: hidden;
        max-width: 2560px;
        height: 700px;
        margin: 0 auto;
    }

    .char_info .char_bnr li::after {
        z-index: 1;
        content: '';
        display: block;
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 200px;
        background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8));
    }

    .char_info li {
        z-index: 2;
        opacity: 0;
        transition: 0.6s;
        transform: translate(30px, 0);
        filter: blur(3px);
        position: absolute;
        left: 50%;
        top: 0;
        margin-left: -1280px;
        width: 100%;
        min-width: 2560px;
        height: 700px;
        background-position: center -100px !important;
    }

    .char_info .c_box.on li.on {
        z-index: 3;
        opacity: 1;
        transform: translate(0, 0)scale(1);
        filter: blur(0);
    }

    .char_info li p {
        position: absolute;
        right: 50%;
        text-align: right;
        margin-right: -611px;
    }

    .char_info li p.name {
        top: 240px;
        color: #fff;
        font-size: 70px;
        font-family: SUIT;
        font-weight: 500;
        line-height: 87px;
    }

    .char_info li p.info {
        top: 335px;
        margin-right: -604px;
        color: #a2a5ac;
        font-size: 16px;
        line-height: 24px;
        font-weight: 400;
    }

    .char_info li p.info::after {
        content: '';
        display: block;
        position: absolute;
        right: -6px;
        bottom: -70px;
        width: 81px;
        height: 71px;
        background: url('#{$DF_UI}/img/main/char_arrow.png') no-repeat
    }

    .char_info li a {
        z-index: 4;
        display: none;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
    }

    .char_info li a.on {
        display: block;
        z-index: 5;
    }

    .char_info li .name, .char_info li .info {
        transform: translate(-35px, 0);
        filter: blur(5px);
        opacity: 0;
        transition: 0.3s;
        transition-delay: 0.2s;
    }

    .char_info li .info {
        transition-delay: 0.3s;
    }

    .char_info .c_box.on li.on .name, .char_info .c_box.on li.on .info {
        opacity: 1;
        transform: translate(0, 0);
        filter: blur(0)
    }

    .char_info .char_thum {
        z-index: 5;
        position: absolute;
        left: 50%;
        bottom: 0;
        width: 1300px;
        height: 180px;
        margin-left: -650px;
        padding-left: 496px;
        background: #31343d;
        box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.2);
    }

    .char_info .char_thum a {
        transition: 0.3s;
        position: relative;
        display: block;
        float: left;
        width: 161px;
        height: 180px;
        border-right: 1px solid #24272d;
        padding-top: 127px;
        cursor: pointer;
        text-align: center;
        color: #bec5cc;
        font-size: 16px;
        line-height: 24px;
        font-weight: 400;
        background-color: #31343d;
    }

    .char_info .char_thum a.c_pos5 {
        width: 160px;
        border-right: 0;
    }

    .char_info .char_thum a.on {
        cursor: auto;
    }

    .char_info .char_thum a.on i {
        display: none;
    }

    .char_info .char_thum a::before {
        z-index: 1;
        filter: grayscale(100%)opacity(0.3);
        content: '';
        display: block;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-position-y: -20px !important
    }

    .char_info .char_thum a::after {
        z-index: 2;
        content: '';
        display: block;
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 100px;
        background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.6));
    }

    .char_info .char_thum a.on::before {
        filter: grayscale(0%)opacity(1);
    }

    .char_info .char_thum a i {
        z-index: 3;
        display: block;
        position: relative;
    }

    .char_info .char_thum .c_pos1::before {
        background-position-x: -0;
    }

    .char_info .char_thum .c_pos2::before {
        background-position-x: -200px;
    }

    .char_info .char_thum .c_pos3::before {
        background-position-x: -400px;
    }

    .char_info .char_thum .c_pos4::before {
        background-position-x: -600px;
    }

    .char_info .char_thum .c_pos5::before {
        background-position-x: -800px;
    }

    .char_info .char_control {
        z-index: 6;
        position: absolute;
        left: 50%;
        bottom: 0;
        margin-left: -650px;
        width: 496px;
        height: 180px;
        background: #24272d;
    }

    .char_info .char_control a {
        z-index: 1;
        position: absolute;
        top: 0;
        text-indent: -9999px;
        width: 80px;
        height: 180px;
        cursor: pointer;
    }

    .char_info .char_control .arrow_l {
        left: 20px;
        background: url('#{$DF_UI}/img/main/char_arrow_l.png') no-repeat center center;
    }

    .char_info .char_control .arrow_r {
        right: 20px;
        background: url('#{$DF_UI}/img/main/char_arrow_r.png') no-repeat center center;
    }

    .char_info .char_control .mc_txt {
        transition: 0.3s;
        display: block;
        position: absolute;
        left: 98px;
        top: 40px;
        width: 300px;
        height: 100px;
    }

    .char_thum a::before {
        content: "";
        background: var(--thumb-img-url) no-repeat;
    }
</style>