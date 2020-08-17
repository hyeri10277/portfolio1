/// 메인 페이지 JS //////////////
// 전역변수
//배너순번
var bseq = 0;

$(function () { /// jQB ///////////////////

    ////////////////////////////////
    /// 메인 슬라이드 이동 함수 ///////
    ///////////////////////////////
    var mbanFn = function (bseq) {

        // 전달된 전역순번찍기
        console.log("전역배너순번:" + bseq);

        // 현재 순번 변경하기
        $("#slide li").eq(bseq).addClass("on")
            .siblings().removeClass("on");

        // 블릿변경하기
        $(".system_bullet li").eq(bseq).addClass("on")
            .siblings().removeClass("on");

    }; //////// mbanFn함수 ////////////////////

    // 오른쪽 이동버튼 ///////////
    $(".ab2").click(function (e) {
        e.preventDefault();
        //alert(333);
        bseq++;
        if (bseq === 4) bseq = 0; //한계수

        //변경함수 호출!
        mbanFn(bseq);

    }); ///////// click ////////////

    /// 왼쪽 이동버튼 ////////////
    $(".ab1").click(function (e) {
        e.preventDefault();
        //alert(333);
        bseq--;
        if (bseq === -1) bseq = 3; //한계수

        //변경함수 호출!
        mbanFn(bseq);

    }); ///////// click ////////////



    // 인터발용 변수
    var autoI; //할당안한 변수는 데이터형이 undefined임
    // 이것을 if문에 넣으면 false가 나옴

    autoI = setInterval(function () {
        $(".ab2").trigger("click");
    }, 6000);





    /////////// GNB 메뉴에 마우스 오버시 GNB 배경박스 나타나기 //////
    // 필요없는 코드가 있는것 같음  gnbbg에 마우스 있을때도 머물게하기
    // 스크롤 내리면 top불투명흰색배경
    $(".gnb>ul>li").hover(
        function () { // over
            $(".gnbbg").addClass("on");
         /*   $(".bgb").addClass("on");*/

            $(".top").addClass("on"); // 스크롤 내리면 top불투명흰색배경
        },
        function () { // out
            $(".gnbbg").removeClass("on");
         /*   $(".bgb").removeClass("on");*/

            $(".top").removeClass("on");
        }); ///// hover ///////



    $(".gnb>ul").hover(
        // 바탕화면을 어둡게 만든다(옵션) -자기혼자움직임
        function () { // over
            $(".bgb").stop().fadeIn(500);
        },

        // 어두웠던 바탕화면을 해제한다(옵션)
        function () { // out
            $(".bgb").stop().fadeOut(500);
        }); ///// hover ///////

    // gnbbg에 마우스 있을때도 머물게하기 -> 안됨
/*
    $(".gnbbg").mouseover(function(){
        $(".submenu").css("display","block");
    }); 
    $(".gnbbg").mouseleave(function(){
        $(".submenu").css("display","none");
    });*/
}); /////////// jQB //////////////////////////
