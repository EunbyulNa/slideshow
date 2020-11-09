$(function() {

  $('#slide_wrap').each(function () {

    var $container = $('#slide_wrap'),
        $slideGroup = $container.find('#slides'),
        $slides = $slideGroup.find('.slide'),
        $nav = $container.find('.arrow'), //화살표들
        $indicator = $container.find('.indicator'), //페이지버튼
        slideCount = $slides.length,
        currentIndex = 0,
        duration = 900,
        interval = 3000,

        indicatorHTML = '',
        timer;

       //각 슬라이드 위치 정해주기//
        $slides.each(function (i) {
          $(this).css ({'left' : 100 * i + '%'});
          indicatorHTML += '<a href="#">' + (i + 1) + '</a>';
        });//slides each 끝

          $indicator.html(indicatorHTML);


        //슬라이드 움직여주기
        function goToSlide(aa) {
          $slideGroup.animate({'left' : -100 * aa + '%'}, duration);
          currentIndex = aa;
          console.log(currentIndex);

          updataeNav(); //양옆 화살표설정
        };



       //슬라이드 타이머 함5
        function startTimer() {
          timer = setInterval(function () {
            goToSlide(currentIndex);

            var nextIndex = (currentIndex + 1) % slideCount;

            goToSlide(nextIndex);

          }, interval);
        };

        //마우스 올려놓으면 정지
        function stopTimer() {
          clearInterval();
        }



        //좌우 화살표 조건
        function updataeNav() {
          //첫번째 슬라이드 상태에서 prev 안보이rp
         if(currentIndex == 0){
           $nav.find('.prev').addClass('disabled');

         }else {
            $nav.find('.prev').removeClass('disabled');
         };

         if(currentIndex == slideCount -1){
           $nav.find('.next').addClass('disabled');

         }else {
            $nav.find('.next').removeClass('disabled');
         };

         //
         $indicator.find('a').removeClass('active').eq(currentIndex).addClass('active');

        }


        //좌우 화살표
        $nav.on('click','a', function(e){
          e.preventDefault();
          if($(this).hasClass('prev')){
            goToSlide(currentIndex-1);
          }else {
               goToSlide(currentIndex+1);
          }

        })

        //인디게이터
        $indicator.on('click', 'a', function (e) {
             e.preventDefault();
             goToSlide($(this).index());
        })

        $container.on({
          mouseenter: stopTimer,
          mouseleave: startTimer
        });


        goToSlide(currentIndex);
        startTimer();

  });//each 끝





});
