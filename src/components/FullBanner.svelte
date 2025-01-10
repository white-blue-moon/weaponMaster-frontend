<div class="gnbFullBanner gnbFullBannerOpen" id="GNB_FullBanner">
    <div class="gnbFullBannerDimmed" obj="P_BANNER"></div>
    <div class="gnbFullBannerSec">
        <div class="gnbFullBannerCnts">
            <a href="https://df.nexon.com/pg/thenewwave?bn=nexon&amp;st=common&amp;ev=250109" target="_blank" obj="P_BANNER">
                <!-- svelte-ignore a11y-missing-attribute -->
                <img 
                    id="gnbFullBannerImage" 
                    src="https://rs.nxfs.nexon.com/bannerusr/24/12/kBm726145939513.jpg" 
                    width="990" 
                    height="557" 
                    data-gtm-vis-recent-on-screen11184324_302="95835" 
                    data-gtm-vis-first-on-screen11184324_302="95835" 
                    data-gtm-vis-total-visible-time11184324_302="100" 
                    data-gtm-vis-has-fired11184324_302="1"
                >
            </a>
        </div>
        <div class="gnbFullBannerBt">
            <a href="#today" class="gnbFullBannerBtToday" id="GNB_BannerBtToday" obj="P_BANNER">
                <span>오늘 하루 보지 않기</span>
            </a>
            <a href="#close" class="gnbFullBannerBtClose" id="GNB_BannerBtClose" obj="P_BANNER">
                <span>레이어 닫기</span>
            </a>
        </div>
    </div>
</div>



<style>
    .gnbFullBannerOpen {
        display: block;
    }
    
    .gnbFullBanner {
        /* display: none; */
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        min-height: 722px;
        overflow: hidden;
        z-index: 9999999;
    }
    
    .gnbFullBannerDimmed {
        width: 100%;
        height: 100%;
        background-color: #000;
        opacity: .8;
    }
    
    .gnbFullBannerSec {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 992px;
        height: 663px;
        margin: -330px 0 0 -496px;
    }
    
    .gnbFullBannerCnts {
        width: 992px;
        height: 559px;
        margin-top: 29px;
        border: 1px solid hsla(0,0%,100%,.2);
    }
    
    a {
        transition: all .15s linear;
        color: #737881;
        text-decoration: none;
    }
    
    .gnbFullBannerBtClose, .gnbFullBannerBtToday {
        position: absolute;
        background: transparent url(https://rs.nxfs.nexon.com/gnb/images/set_fullbanner.png) no-repeat 0 0;
    }
    
    .gnbFullBannerBtToday {
        top: 0;
        right: 71px;
        width: 136px;
        height: 15px;
        background-position: 0 -50px;
    }
    
    .gnbFullBannerBtClose {
        top: 0;
        right: 0;
        width: 43px;
        height: 15px;
    }
    
    .gnbFullBannerBtClose span, .gnbFullBannerBtToday span {
        visibility: hidden;
        width: 0;
        height: 0;
        overflow: hidden;
        font-size: 0;
        line-height: 0;
        padding: 0;
    }
</style>