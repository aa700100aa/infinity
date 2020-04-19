$(document).ready(function(){
  /*---------------------------------------------
    動画コンテンツ
  -----------------------------------------------*/
  //スライダー
  $('.js-videoSlider').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      initialSlide: 0,
      speed: 275,
      arrows: true,
      prevArrow: "<div class='prevArrow'><img src='images/arrow_bk.svg' alt=''></div>",
      nextArrow: "<div class='nextArrow'><img src='images/arrow_bk.svg' alt=''></div>",
      infinite: false,
  });
  //ポップアップ
  $('.js-popUp').each(function () {
    $(this).magnificPopup({
      mainClass: 'mod-popupMovie',
      items:{
        src: $(this).find('.js-video'),
        type: 'inline'
      },
      closeBtnInside: false,
      removalDelay: 1000,
      callbacks: {
        // ポップアップ時の処理
        open: function () {
          // PCでマウスホイールでのスクロール操作の制御
          $(window).on('wheel',function(e){
            e.preventDefault();
          });
          // モバイル端末でのタッチスクロール操作の制御
          $(window).on('touchmove.noScroll', function(e) {
            e.preventDefault();
          });
          // ios端末でのタッチスクロール操作の制御
          $("body").css('touch-action', 'none');
          // 全てのスクロール操作の制御（ウィンドウ表示域で固定）
          $("body").css('overflow', 'hidden');
          //フェードイン
          setTimeout(function(){
            $(".js-video").addClass("add-fadeIn");
          }, 100);
        },
        // ポップアップクローズ時の処理
        close: function () {
          var video = document.querySelectorAll('.js-video');
          for (let i = 0; i < video.length; i++) {
            video[i].pause();
          }
          $(".js-video").removeClass("add-fadeIn");
          //スクロール操作禁止解除
          $(window).off('wheel');
          $(document).off('.noScroll');
          $("body").css('overflow', 'auto');
          $("body").css('touch-action', 'auto');
        }
      }
    });
  });
});
/*---------------------------------------------
  ナビのテキスト変更
-----------------------------------------------*/
function navTextChange() {
  if (window.matchMedia('(min-width:750px)').matches) {
    $("nav ul li:nth-child(5) a").html("LIVE/STAGE");
  } else {
    $("nav ul li:nth-child(5) a").html("LIVE");
  }
}
/*---------------------------------------------
  ヘッダーの高さ調整
-----------------------------------------------*/
function headerAjust() {
  $("body").css("margin-top", $("header").height());
}

$(function () {
  /*---------------------------------------------
    オープニング処理
  -----------------------------------------------*/
  setTimeout(function () {
    $(".js-openingAnimation").css("display", "none");
  }, 1200);
  setTimeout(function () {
    $(".js-heroOverlayGrids").css("display", "none");
  }, 2700);
  setTimeout(function () {
    $(".js-heroNav li a").css("transform", "translateY(0)");
  }, 2000);
  setTimeout(function () {
    $(".js-heroNews").css("transform", "translateX(0)");
  }, 2000);
  //headerテキスト切り替え開始タイミング
  if (window.matchMedia('(max-width:749px)').matches) {
    setTimeout(function () {
      $(".js-headerDetail li").addClass("add-headerDetail");
    }, 3500);
  } else {
    setTimeout(function () {
      $(".js-headerDetail li").addClass("add-headerDetail");
    }, 3500);
  }
  if (window.matchMedia('(max-width:749px)').matches) {
    setTimeout(function () {
      $(".hero h1 img").css("transform", "translateX(0)");
      $(".hero h1 img").css("transform", "scale(1)");
    }, 1000);
  } else {
    setTimeout(function () {
      $(".hero h1 img").css("transform", "translateX(0)");
      $(".hero h1 img").css("transform", "scale(1)");
    }, 2000);
  }
  /*---------------------------------------------
    header 文字切り替え
  -----------------------------------------------*/
  setInterval(function() {
    if ($(".js-headerInfomation").hasClass('add-firstText')) {
      $(".js-headerDetail li").html("<p>関ジャニ&infin;アプリで、関ジャニ&infin;を持ち歩こう！</p>");
      $(".js-headerInfomation").addClass("add-secondText");
      $(".js-headerInfomation").removeClass("add-firstText");
      $(".js-headerDetail").parent().find(".js-headerBorder").css("opacity", "1");
    } else if ($(".js-headerInfomation").hasClass('add-secondText')) {
      $(".js-headerDetail li").html("<p>ニューシングル「友よ」発売中！</p>");
      $(".js-headerInfomation").addClass("add-thirdText");
      $(".js-headerInfomation").removeClass("add-secondText");
      $(".js-headerDetail").parent().find(".js-headerBorder").css("opacity", "1");
    } else {
      $(".js-headerDetail li").html("<img src='images/header_logo_200419.svg' alt='関ジャニ&infin; (エイト)'>");
      $(".js-headerInfomation").addClass("add-firstText");
      $(".js-headerInfomation").removeClass("add-thirdText");
      $(".js-headerDetail").parent().find(".js-headerBorder").css("opacity", "0");
    }
  }, 7000);
  navTextChange();
  headerAjust();
});

$(window).resize(function(){
  navTextChange();
  headerAjust();
});

$(window).scroll(function (){
  $(".js-slideIn").each(function(){
     var imgPos = $(this).offset().top;
     var scroll = $(window).scrollTop();
     var windowHeight = $(window).height();
     if (scroll > imgPos - windowHeight){
      $(this).addClass("add-slideIn");
     }
  });
  $(".js-fadeIn").each(function(){
    var imgPos = $(this).offset().top;
    var scroll = $(window).scrollTop();
    var windowHeight = $(window).height();
    if (scroll > imgPos - windowHeight){
     $(this).addClass("add-fadeIn");
    }
  });
  $(".profile").each(function(){
    var imgPos = $(this).offset().top;
    var scroll = $(window).scrollTop();
    var windowHeight = $(window).height();
    if (scroll > imgPos - windowHeight){
     $(this).addClass("add-opacity");
    }
  });
});
/*---------------------------------------------
  読み込み時にページの一番上を指定
-----------------------------------------------*/
$(document).ready(function(){
  $('html,body').animate({ scrollTop: 0 }, '1');
});
$(function() {
  $('html,body').animate({ scrollTop: 0 }, '1');
});