
<script>
    import { PATHS } from "../constants/paths";

    export let isOpen  = false;
    
    function onClose() {
        isOpen = false;
    }
</script>
  
{#if isOpen}
    <!-- 넥슨 gnb.css 적용을 위한 엘리먼트 계층 -->
    <div class="gnbScrollHide">
        <div class="gnbContainer gnbWrapper gnbSizeS gnbStateAll">
            <!-- 배경 어둡게 -->
            <div class="gnbDimmedLayer" on:click={ onClose }></div>

            <div class="gnbAllLayer gnbStatePc" id="gnbAllLayer">
                    <a style="cursor: pointer;" obj="P_GNB" >
                <div class="gnbLayerBt" on:click={ onClose }>
                    <a obj="P_GNB" >
                        <span class="gnbIcon"></span>
                        <span class="gnbAcchidden"></span>
                    </a>
                </div>

                <div class="gnbScroll gnbAllScroll">
                    <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
                    <div class="gnbScrollContent" tabindex="0">
                        <!-- 밑줄 전체서비스 -->
                        <div class="gnbGameTab">
                            <ul>
                            <li class="gnbBtPc" obj="P_GNB" opt=''>
                                <a>전체서비스</a>
                            </li>
                            </ul>
                            <a href={ PATHS.SERVICE_CENTER.PRIVATE_CONTACT.LIST } obj="P_GNB" opt=''>고객센터</a>
                        </div>
                
                        <!-- 세부 항목 A~Z -->
                        <div class="gnbList gnbListPc" id="gnbListPc">
                            <h3 class="gnbAcchidden">전체서비스</h3>
                            <div class="gnbCell">
                                <h3>A~Z</h3>
                                <ul>
                                    <li obj="P_GNB" opt=''><a href={ PATHS.ADMIN_TOOL } target="_blank">Admin Tool</a></li>
                                    <li obj="P_GNB" opt=''><a href={ PATHS.HOME }>Weapon Master</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 최하단 버튼 -->
                <div class="gnbListService">
                    <h2 class="gnbAcchidden">서비스</h2>
                    <ul>
                        <li obj="P_GNB">
                            <a target="_self">
                                <!-- TODO 추후 회원정보 수정 페이지 추가 필요 -->
                                <span class="gnbIcon gnbIconService1"></span>준비중
                            </a>
                        </li>
                    </ul>
                    <a class="gnbBtAll" href={ PATHS.GUIDE.OVERVIEW } obj="P_GNB">
                        전체가이드
                    </a>
                </div>
            </div>

        </div>
    </div>
{/if}

  
<style lang="scss">
    .gnbDimmedLayer {
        visibility: visible !important;
        opacity: 0.7;
    }

    .gnbScrollHide {
        width: 0px;
    }

    .gnbAllLayer {
        visibility: visible !important;
    }

    .gnbAllLayer .gnbListService {
        height: 120px;
    }

    .gnbAllLayer .gnbListService ul {
        height: 70px;
    }
</style>
