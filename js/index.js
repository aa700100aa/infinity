/*---------------------------------------------
  jQuery
-----------------------------------------------*/
$(function () {

  /*---------------------------------------------
    contentsLink スライダー
  -----------------------------------------------*/
  // ブレイクポイント定義
  var tabletWidth = window.matchMedia( '(min-width:750px) and (max-width:993px)' );
  var mobileWidth = window.matchMedia('screen and (max-width: 749px)');

  function checkBreakPoint() {
    if (tabletWidth.matches) {
      //タブレット
      $('.js-contentsLinkSlider').slick({
        slidesToScroll: 1,
        initialSlide: 0,
        speed: 150,
        arrows: false,
        infinite: false,
        slidesToShow: document.body.clientWidth / 310
      });
      $('.js-contentsLinkSlider').on('setPosition', function () {
        //インラインスタイル オーバーライド
        $('.js-contentsLinkEmpty').css('width', '11.3%');
      });
    } else if (mobileWidth.matches) {
      //モバイル
      $('.js-contentsLinkSlider').slick({
        slidesToScroll: 1,
        initialSlide: 0,
        speed: 275,
        arrows: false,
        infinite: false,
        slidesToShow: document.body.clientWidth / 210
      });
      $('.js-contentsLinkSlider').on('setPosition', function () {
        //インラインスタイル オーバーライド
        $('.js-contentsLinkEmpty').css('width', '50px');
      });
    } else {
      //デスクトップ
      $('.js-contentsLinkSlider.slick-initialized').slick('unslick');
    }
  }

  // ブレイクポイントの瞬間に発火
  tabletWidth.addListener(checkBreakPoint);
  mobileWidth.addListener(checkBreakPoint);

  // 初回チェック
  checkBreakPoint();

  /*---------------------------------------------
    動画 スライダー
  -----------------------------------------------*/
  $('.js-videoSlider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    speed: 150,
    arrows: true,
    prevArrow: "<div class='prevArrow'><img src='images/arrow_bk.svg' alt=''></div>",
    nextArrow: "<div class='nextArrow'><img src='images/arrow_bk.svg' alt=''></div>",
    infinite: false
  });

});

/*---------------------------------------------
  JavaScript（Vanilla JS）
-----------------------------------------------*/
document.addEventListener('DOMContentLoaded', () => {

  /*---------------------------------------------
    キーボードショートカット　コピー禁止
  -----------------------------------------------*/
  document.body.oncopy = () => { return false;}

  /*---------------------------------------------
    header 文字&ボーダー 表示非表示 切り替え
  -----------------------------------------------*/
  const headerText = document.querySelectorAll('.js-headerText');
  const headerborder = document.querySelectorAll('.js-headerBorder');
  let count = 0;
  //ヘッダーの文字切り替えインターバル(cssで定義した値と同値) 
  const headerActionTime = 7000;
  setInterval(() => {
    //文字 切り替え
    headerText[count].classList.remove('add-active');
    count = count === headerText.length - 1 ? 0 : count += 1;//最後の要素を表示したらリセット
    headerText[count].classList.add('add-active');
    //ボーダー 表示非表示 切り替え
    if (count === 0) {
      headerborder[0].classList.remove('add-display');
      headerborder[1].classList.remove('add-display');
    } else {
      headerborder[0].classList.add('add-display');
      headerborder[1].classList.add('add-display');
    }
  }, headerActionTime);
  
  /*---------------------------------------------
    オープニングアニメーション
  -----------------------------------------------*/
  //オープニングアニメーションにかかる時間(cssで定義した値と同値) 
  const opAnimationTime = 2500;
  const opAnimationTrigger = document.querySelectorAll('.js-trigger');
  window.addEventListener('load', () => {
    //アニメーション開始
    for (let i = 0; i < opAnimationTrigger.length; i++) {
      opAnimationTrigger[i].classList.add('add-trigger');
    }

    //アニメーション終了
    setTimeout(() => {
      document.querySelector('.js-opAnimation').classList.add('add-displayNone');
      //アニメーション終了時、常にページの一番を指定
      scrollTo(0, 0);
      //ページ再読み込み時にもスクロールエフェクトを発生させるためクラスを外す
      for (let j = 0; j < effectElement.length; j++) {
        effectElement[j].classList.remove('add-inView');
      }
    }, opAnimationTime * 0.48);
    setTimeout(() => {
      document.querySelector('.js-heroOverlayPoster').classList.add('add-displayNone');
      document.querySelector('.js-heroOverlayGrids').classList.add('add-displayNone');
    }, opAnimationTime);
  });

  /*---------------------------------------------
    動画 ポップアップ
  -----------------------------------------------*/
  const popupTrigger = document.querySelectorAll('.js-popupTrigger');
  const videoPopup = document.querySelectorAll('.js-videoPopup');
  const video = document.querySelectorAll('.js-videoPopup video');
  const popupOverlay = document.querySelectorAll('.js-videoPopupOverlay');
  for (let k = 0; k < popupTrigger.length; k++) {
    // ポップアップ 開始
    popupTrigger[k].addEventListener('click', () => {
      videoPopup[k].classList.add('add-popup');
      setTimeout(function(){
        popupOverlay[k].classList.add('add-popup');
        video[k].classList.add('add-popup');
      }, 10);
      // モバイル端末でのタッチスクロール操作の制御
      document.addEventListener('touchmove', noScroll, { passive: false });
      // PCでマウスホイールでのスクロール操作の制御
      document.addEventListener('mousewheel', noScroll, { passive: false });
      // ios端末でのタッチスクロール操作の制御 & 全てのスクロール操作の制御（ウィンドウ表示域で固定）
      document.querySelector('body').classList.add('add-ScrollProhibited');
    });

    // ポップアップ 終了
    popupOverlay[k].addEventListener('click', () => {
      popupClose();
    });
    document.querySelectorAll('.js-videoClose')[k].addEventListener('click', () => {
      popupClose();
    });

  }
  // ポップアップ 終了 関数
  popupClose = () => {
    for (let l = 0; l < popupTrigger.length; l++) {
      popupOverlay[l].classList.remove('add-popup');
      video[l].classList.remove('add-popup');
      setTimeout(function () {
        videoPopup[l].classList.remove('add-popup');
      }, 300);
      video[l].pause();
    }
    //スクロール操作禁止解除
    document.removeEventListener('touchmove', noScroll, { passive: false });
    document.removeEventListener('mousewheel', noScroll, { passive: false });
    document.querySelector('body').classList.remove('add-ScrollProhibited');
  }

  // スクロール 禁止関数
  noScroll = () => {
    event.preventDefault();
　}

  /*---------------------------------------------
    スクロールエフェクト
  -----------------------------------------------*/
  const effectElement = document.querySelectorAll('.js-inView');
  let scrollPosition; //現在のスクロール量
  let windowHeight; //ブラウザ内の表示領域の高さ
  let scrollInView; //スクロールエフェクトのキーとなる値
  window.addEventListener('scroll', () => {
    scrollPosition = window.pageYOffset;
    windowHeight = document.documentElement.clientHeight;
    for (let m = 0; m < effectElement.length; m++) {
      //ビューポートから各要素のtopまでの値　- ブラウザの表示領域 + スクロール量
      scrollInView = effectElement[m].getBoundingClientRect().top - windowHeight + scrollPosition;
      //各要素が表示領域に入った時クラスを付与
      if (scrollPosition > scrollInView) {
        effectElement[m].classList.add('add-inView');
      }
    }
  });

});