$(function() {
  $('.js-videoSlider').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      initialSlide: 0,
      speed: 275,
      arrows: true,
      prevArrow: "<div class='prevArrow'><img src='images/arrow_bk.svg' alt='image01'></div>",
      nextArrow: "<div class='nextArrow'><img src='images/arrow_bk.svg' alt='image01'></div>",
      infinite: false,
  });
  //magnificPopup
  $('.js-popUp').each(function () {
    $(this).magnificPopup({
      mainClass: 'mod-popupMovie',
      items:{
        src: $(this).find('.js-video'),
        type: 'inline'
      },
      closeBtnInside: false,
      removalDelay: 250,
      callbacks: {
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
          setTimeout(add, 10);
        },
        close: function () {
          var video = document.querySelectorAll('.js-video');
          for (let i = 0; i < video.length; i++) {
            video[i].pause();
          }
          //スクロール操作禁止解除
          $(window).off('wheel');
          $(document).off('.noScroll');
          $("body").css('overflow', 'auto');
          $("body").css('touch-action', 'auto');
          setTimeout(remove, 10);
        }
      }
    });
  });
});
var add = function(){
  $(".js-video").addClass("add-fadeIn");
};
var remove = function(){
  $(".js-video").removeClass("add-fadeIn");
};

$('.js-popUp').click(function() {
  // PCでマウスホイールでのスクロール操作の制御
  $(window).on('wheel',function(e){
    e.preventDefault();
  });
// モバイル端末でのタッチスクロール操作の制御
  $(window).on('touchmove.noScroll',function(e){
    e.preventDefault();
  });
// 全てのスクロール操作の制御（ウィンドウ表示域で固定）
  $("body").css('overflow','hidden');
})

var mediaQuery_width1125 = window.matchMedia("screen and (max-width: 1125px)");
var mediaQuery_width750 = window.matchMedia("screen and (min-width: 750px)");
var mediaQuery_height630 = window.matchMedia("screen and (min-height: 630px)");

function responsive() {
  if (mediaQuery_width1125.matches && mediaQuery_height630.matches) {
    $(".nav").css("right", "701px");
    $(".nav").css("left", "auto");
  } else {
    $(".nav").css("left", "11.3%");
    $(".nav").css("right", "auto");
  }
  if (mediaQuery_width750.matches) {
    $("nav ul li:nth-child(5) a").html("LIVE/STAGE");
  } else {
    $("nav ul li:nth-child(5) a").html("LIVE");
  }
}

$(function(){
  setTimeout(function(){
    $(".js-openingAnimation").css("display", "none");
  }, 1400);//約4秒後に
  setTimeout(function(){
    $(".p-index__overlay-grids").css("display", "none");
  }, 2700);//約4秒後に
  setTimeout(function(){
    $(".nav li a").css("transform", "translateY(0)");
  }, 2000);//約4秒後に
  responsive();
  var countup = function(){
    if ($(".infomation").hasClass('text1')) {
      $(".infomation .info li").html("<p>関ジャニ&infin;アプリで、関ジャニ&infin;を持ち歩こう！</p>");
      $(".infomation").addClass("text2");
      $(".infomation").removeClass("text1");
      $(".infomation .info").parent().find(".border").css("opacity", "1");
    } else if($(".infomation").hasClass('text2')){
      $(".infomation .info li").html("<p>ニューシングル「友よ」発売中！</p>");
      $(".infomation").addClass("text3");
      $(".infomation").removeClass("text2");
      $(".infomation .info").parent().find(".border").css("opacity", "1");
    } else {
      $(".infomation .info li").html("<img src='images/logo_typo.svg' alt='image01'>");
      $(".infomation").addClass("text1");
      $(".infomation").removeClass("text3");
      $(".infomation .info").parent().find(".border").css("opacity", "0");
    }
  } 
  setInterval(countup, 7000);
});

$(".contentsLink_list").scroll(function() {
  console.log($(this).scrollLeft());
});

$(window).resize(function(){
  responsive();
  return false;
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
});

$(document).ready(function(){
  $('html,body').animate({ scrollTop: 0 }, '1');
});
$(function() {
  $('html,body').animate({ scrollTop: 0 }, '1');
});
    