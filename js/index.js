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
  $(".click01").click(function(){
    $('body').magnificPopup({
      delegate: '.click01',
      type: 'inline',
      src: '#popup01',
      closeBtnInside: true,
    });
    $(document).on('click', '.popup-closebtn', function (e) { 
       e.preventDefault();	
       $.magnificPopup.close();
    });
  });
});