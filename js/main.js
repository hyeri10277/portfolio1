/// 메인 페이지 JS //////////////
// 전역변수
//배너순번
var bseq = 0;
var banSts = 1; //현재배너상태(1-동작중,0-멈춤)// 인터발용 변수
var autoI2, autoT2;

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

    /// 자동호출함수 ////
    var autoCall2 = function () {

        autoI2 = setInterval(function () {
            bseq++;
            if (bseq === 4) bseq = 0; //한계수

            //변경함수 호출!
            mbanFn(bseq);
        }, 3000);

    }; //////////// autoCall ////////////////


    /// 멈춤함수 //////
    var clearAuto2 = function () {
        clearInterval(autoI2);
        clearTimeout(autoT2);

        autoT2 = setTimeout(function () {
            autoCall2();
            //버튼변경(플레이로)
            $(".psbtn").attr("src", "images/btn-stop-pc.png");
        }, 2000);
    }; //////// clearAuto함수 ///////////

    // 자동호출
    autoCall2();


    // 오른쪽 이동버튼 ///////////
    $(".ab2").click(function (e) {
        e.preventDefault();
        //alert(333);
        bseq++;
        if (bseq === 4) bseq = 0; //한계수

        //자동멈춤
        clearAuto2();

        //변경함수 호출!
        mbanFn(bseq);

    }); ///////// click ////////////

    /// 왼쪽 이동버튼 ////////////
    $(".ab1").click(function (e) {
        e.preventDefault();
        //alert(333);
        bseq--;
        if (bseq === -1) bseq = 3; //한계수

        //자동멈춤
        clearAuto2();

        //변경함수 호출!
        mbanFn(bseq);

    }); ///////// click ////////////








    /// 블릿클릭시 이동하기 ///
    $(".system_bullet a").click(function (e) {
        e.preventDefault();
        var idx = $(this).parent().index(); //부모li순번
        console.log("블릿순번:" + idx);

        if (idx === 4) { // 플레이/스탑버튼
            if (banSts) { //플레이상태
                //버튼변경(플레이로)
                $(".psbtn").attr("src", "images/btn-play-pc.png");
                //자동멈춤
                clearInterval(autoI2);
                clearTimeout(autoT2);
                banSts = 0; //상태변경
            } //// if /////
            else {
                //버튼변경(플레이로)
                $(".psbtn").attr("src", "images/btn-stop-pc.png");
                //자동다시재개
                autoCall2();
                banSts = 1; //상태변경
            }
        } //// if ////////
        else { /// 블릿클릭인경우

            bseq = idx; //전역변수에 넣기
            //자동멈춤
            clearAuto2();

            //변경함수 호출!
            mbanFn(bseq);
        } ///// else ///////////

    }); //////////// click ///////////////



    /////////// GNB 메뉴에 마우스 오버시 GNB 배경박스 나타나기 //////
    // 필요없는 코드가 있는것 같음  gnbbg에 마우스 있을때도 머물게하기
    // 스크롤 내리면 top불투명흰색배경->안함
    $(".gnb>ul>li").hover(
        function () { // over
            $(".gnbbg").addClass("on");
            /*   $(".bgb").addClass("on");*/

            /* $("#top").addClass("on"); */ // 스크롤 내리면 top불투명흰색배경
        },
        function () { // out
            $(".gnbbg").removeClass("on");
            /*   $(".bgb").removeClass("on");*/

            /* $(".top").removeClass("on");*/
        }); ///// hover ///////  



    // 마지막 li 호버삭제됨
    $(".gnb>ul>li:last").hover(
        function () { // over
            $(".gnbbg").removeClass("on");
        }); ///// hover ///////  









    // gnb li 마지막꺼 검정배경 없애기됨
    $(".gnb>ul>li:lt(4)").hover(
        // 바탕화면을 어둡게 만든다(옵션) -자기혼자움직임
        function () { // over
            $(".bgb").stop().fadeIn(500);
        },

        // 어두웠던 바탕화면을 해제한다(옵션)
        function () { // out
            $(".bgb").stop().fadeOut(500);
        }); ///// hover ///////





    // gnb li호버시 submenu 서서히 나타남
    $(".gnb>ul>li").hover(
        // 바탕화면을 어둡게 만든다(옵션) -자기혼자움직임
        function () { // over
            $(".submenu").stop().fadeIn(400);
        },

        // 어두웠던 바탕화면을 해제한다(옵션)
        function () { // out
            $(".submenu").stop().fadeOut(400);
        }); ///// hover ///////





    // 스크롤시 top 불투명
    $(window).scroll(function () {
        var scroll = $(window).scrollTop();
        //console.log(scroll);
        if (scroll >= 50) {
            //console.log('a');
            $("#top").addClass("on");
        } else {
            //console.log('a');
            $("#top").removeClass("on");
        }
    });





    // 상품영역 이미지 이동 대상: 갤러리박스(.jslide)
    var tg = $(".main_gallery_1");



    // 익명함수..함수에 ;안씀  if,switch
    //▷광클금지,자동으로이동하기,클릭후에도 자동으로이동하기

    /*////////////////////////////////////////
        함수명:goslide
        기능:슬라이드 방향별 이동
    */ /////////////////////////////////////////
    // 광클금지 변수
    var sprot = 0; // 0-허용,1-금지
    //////////////////////////////////
    var goSlide = function (dir) {


        console.log("광클금지상태:" + sprot);

        ///// 광클금지 설정 ////////////
        if (sprot === 1) return false; //=>불끄고나가 돌아가
        sprot = 1; //잠금
        setTimeout(function () {
            sprot = 0; // 0.4초후 해제!
        }, 400); /// 타임아웃 =>방향클릭하면 돌아가는 시간 ////
        //////////////////////////////
        // 처음에 0이 들어오고



        // dir- 방향(0-왼쪽,1-오른쪽)
        console.log("이동방향" + dir);


        // ▷붙이기 오른쪽 전달값이 1이므로 true
        if (dir) {

            // 맨앞이미지 선택
            var first = tg.find("li").first();
            //=>first라는 변수에다가 이미지중 첫번째 선택했다는 식
            // 맨앞이미지 맨뒤로 이동
            tg.append(first);

        } /// if /////////////////

        // ▷붙이기 왼쪽 전달값이 0이므로 false (else로 처리!)
        else {

            // 맨뒤이미지 선택
            var last = tg.find("li").last();
            // 맨뒤이미지 맨앞으로 이동
            tg.prepend(last);

        } //////// else //////////


    }; ///////////// goSlide함수 //////////////
    ///////////////////////////////////////////스내핏에저장


    // 할당형 익명함수...
    /*////////////////////////////////////////
        함수명: autoCall
        기능: 자동호출기능
    */ /////////////////////////////////////////
    var autoI; //인터발용변수
    var autoCall = function () {

        console.log("자동넘김!");

        // 4초 간격으로 슬라이드 함수 호출
        autoI = setInterval(function () {
            goSlide(1);
        }, 4000); /// 인터발함수 ///

    }; ///////////// autoCall 함수 //////////////
    ///////////////////////////////////////////





    /*////////////////////////////////////////
        함수명:clearAuto
        기능:자동넘김 지우기
    */ /////////////////////////////////////////
    var autoT; //타임아웃변수
    var clearAuto = function (dir) {
        console.log("자동지워!");

        //인터발지우기
        clearInterval(autoI);
        //타임아웃지우기(실행쓰나미방지!!!)
        clearTimeout(autoT);

        //재실행호출 셋팅(3초후 한번실행 셋팅!)
        autoT = setTimeout(autoCall, 3000);
        /* =같은식 autoT = setTimeout("autoCall()", 3000);*/


    }; ///////////// clearAuto 함수 //////////////
    ///////////////////////////////////////////




    // =>함수만들었으니 함수호출!!!!
    //// 자동넘김함수 호출!
    autoCall();



    /// 오른쪽버튼 클릭시 갤러리박스 맨앞이미지 맨뒤로 이동
    $(".right2").click(function () {
        console.log("오른쪽!");

        // 자동지우기함수 호출!
        clearAuto();

        // 슬라이드 이동함수 호출!
        goSlide(1); // 오른쪽 전달값은 1


    }); ////////// click //////////////////






    /// 왼쪽버튼 클릭시 갤러리박스 맨뒤이미지 맨앞으로 이동    
    $(".left2").click(function () {
        console.log("왼쪽!");


        // 자동지우기함수 호출!
        clearAuto();

        // 슬라이드 이동함수 호출!
        goSlide(0); // 왼쪽 전달값은 0


    }); ////////// click //////////////////




    // 동영상 영역
    $(function () {
        $(".video_box a").click(function () {
            $("#modal").fadeIn()
        });
        $("#modal span").click(function () {
            $("#modal").fadeOut();
            $("#mainVid").attr("src", "")
        })
    })





    //top메뉴 스크롤시 부드럽게 올라가기
    $(function () {
        $(window).scroll(function () {
            if ($(this).scrollTop() > 500) {
                $('.quick_top').fadeIn();
            } else {
                $('.quick_top').fadeOut();
            }
        });

        $(".quick_top").click(function () {
            $('html, body').animate({
                scrollTop: 0
            }, 400);
            return false;
        });
    });





    // 인스타그램 불러오기
    //if(!$('.instagram').length) { return; }

    var token = "IGQVJVNEdXMDY2ejVqRmtIOU5aMXRrWURvU054bDRLMFVtM1ZAGb0thQnc3cmJfMHVFRUJOaWl1clpmdnBOcnRQTEJvSkczVWV5VE9LMU9sRi03TXZACRzRnT3pqRXVUd3dRaTFubVJpekxJNEtEbklfeQZDZD";
    $.ajax({
        type: "GET",
        dataType: "jsonp",
        cache: false,
        url: "https://graph.instagram.com/me/media?access_token=" + token + "&fields=id,caption,media_type,media_url,thumbnail_url,permalink",
        success: function (response) {
            console.log(response);
            if (response.data != undefined && response.data.length > 0) {
                for (i = 0; i < 8; i++) {
                    if (response.data[i]) {
                        var item = response.data[i];
                        var image_url = "";
                        var post = "";

                        if (item.media_type === "VIDEO") {
                            image_url = item.thumbnail_url;
                        } else {
                            image_url = item.media_url;
                        }

                        post += '<div class="instagram_item instagram_item' + i + '">';
                        post += '<a href="' + item.permalink + '" target="_blank" rel="noopener noreferrer" style="background-image: url(' + image_url + ');">';
                        post += '<p>' + item.caption + '</p>';
                        post += '</a>';
                        post += '</div>';

                        $('#instagram').append(post);
                    } else {
                        // if no curent item
                        show_fallback('#insta-item-' + i)
                    }
                }
            } else {
                // if api error
                show_fallback('.instagram-item')
            }
        },
        error: function () {
            // if http error
            show_fallback('.instagram-item')
        }

    });

    function show_fallback(el) {
        $(el).addClass('loaded fallback');
    }


    /// SNS 버튼 클릭시
    $(".sns_next").click(function (e) {
        e.preventDefault();//기본기능막기!
        console.log("하하");
        $("#instagram").animate({
            left: "-100%"
        }, 600);
        
    }); //////// click ///////////////

    /// SNS 버튼 클릭시
    $(".sns_prev").click(function (e) {
        e.preventDefault();//기본기능막기!
        console.log("호호");
        $("#instagram").animate({
            left: "0"
        }, 600);
        
    }); //////// click ///////////////




}); /////////// jQB //////////////////////////
