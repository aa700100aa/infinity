window.$ = require('jquery');
var slick = require('slick-carousel');

((d, w) => {

  //jQuery
  /*---------------------------------------------
    contentsLink スライダー
  -----------------------------------------------*/
  // ブレイクポイント定義
  const tabletWidth = w.matchMedia('(min-width:750px) and (max-width:993px)');
  const mobileWidth = w.matchMedia('screen and (max-width: 749px)');

  checkBreakPoint = () => {
    if (tabletWidth.matches) {
      //タブレット
      $('.js-contentsLinkSlider').slick({
        slidesToScroll: 1,
        initialSlide: 0,
        speed: 150,
        arrows: false,
        infinite: false,
        slidesToShow: d.body.clientWidth / 310
      });
      $('.js-contentsLinkSlider').on('setPosition', () => {
        //インラインスタイル オーバーライド
        $('.slick-slide').first().css('width', '11.3%');
      });
    } else if (mobileWidth.matches) {
      //モバイル
      $('.js-contentsLinkSlider').slick({
        slidesToScroll: 1,
        initialSlide: 0,
        speed: 275,
        arrows: false,
        infinite: false,
        slidesToShow: d.body.clientWidth / 210
      });
      $('.js-contentsLinkSlider').on('setPosition', () => {
        //インラインスタイル オーバーライド
        $('.slick-slide').first().css('width', '50px');
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
    prevArrow: "<div class='prevArrow js-slickArrow'><img src='images/arrow_bk.svg' alt=''></div>",
    nextArrow: "<div class='nextArrow js-slickArrow'><img src='images/arrow_bk.svg' alt=''></div>",
    infinite: false,
    swipe: true
  });

  textSlideIn = () => {
    $('.slick-slide').each((index,element) => {
      if ($(element).hasClass('slick-active')) {
        $(element).find('.js-videoTitle').addClass('add-slideIn');
        $(element).find('.js-vieoTime').addClass('add-slideIn');
      } else {
        setTimeout(() => {
          $(element).find('.js-videoTitle').removeClass('add-slideIn');
          $(element).find('.js-vieoTime').removeClass('add-slideIn');
        }, 150);
      }
    })
  }
  $('.js-videoSlider').on('click swipe', textSlideIn);

  //JavaScript（Vanilla JS）
  /*---------------------------------------------
    右クリック&キーボードショートカット 禁止
  -----------------------------------------------*/
  //右クリック
  d.oncontextmenu = () => { return false; }

  //keyCode = F12(123), keyCode = I(73)の場合はキーボード入力キャンセル
  d.addEventListener('keydown', (e) => {
    if((e.keyCode === 123) || (e.keyCode === 73)){
      e.preventDefault();
    }
  });
　/* document.onkeydown = function(e){
    if (e.key === 'Meta' && e.key === 'Alt' && e.key === 'i') {
      console.log(event.key);
      e.preventDefault();
      return false;
    }
  }; */

  w.addEventListener('load', () => {
    /*---------------------------------------------
      header 文字&ボーダー 表示非表示 切り替え
    -----------------------------------------------*/
    const headerText = d.querySelectorAll('.js-headerText');
    const headerborder = d.querySelectorAll('.js-headerBorder');
    let count = 0;
    //ヘッダーの文字切り替えインターバル(cssで定義した値と同値) 
    const headerActionTime = 7000;
    headerTextChange = () => {
      //文字 切り替え
      headerText[count].classList.remove('add-active');
      count = count === headerText.length - 1 ? 0 : count += 1;//最後の要素を表示したらリセット
      headerText[count].classList.add('add-active');
      //ボーダー 表示非表示 切り替え
      headerborder[0].classList[count ? 'add' : 'remove']('add-display');
      headerborder[1].classList[count ? 'add' : 'remove']('add-display');
    }
    setInterval(headerTextChange, headerActionTime);

    /*---------------------------------------------
      オープニングアニメーション
    -----------------------------------------------*/
    //オープニングアニメーションにかかる時間(cssで定義した値と同値) 
    const opAnimationTime = 2500;
    const opAnimationTrigger = d.querySelectorAll('.js-trigger');
    //アニメーション開始
    for (let i = 0; i < opAnimationTrigger.length; i++) {
      opAnimationTrigger[i].classList.add('add-trigger');
    }
    //アニメーション終了
    setTimeout(() => {
      d.getElementById('js-opAnimation').classList.add('add-displayNone');
      //アニメーション終了時、常にページの一番を指定
      scrollTo(0, 0);
      //ページ再読み込み時にもスクロールエフェクトを発生させるためクラスを外す
      for (let i = 0; i < effectElement.length; i++) {
        effectElement[i].classList.remove('add-inView');
      }
    }, opAnimationTime * 0.48);
    setTimeout(() => {
      d.getElementById('js-heroOverlayPoster').classList.add('add-displayNone');
      d.getElementById('js-heroOverlayGrids').classList.add('add-displayNone');
    }, opAnimationTime);

    /*---------------------------------------------
      スクロールエフェクト
    -----------------------------------------------*/
    const effectElement = d.querySelectorAll('.js-inView');
    let scrollPosition; //現在のスクロール量
    let windowHeight; //ブラウザ内の表示領域の高さ
    let scrollInView; //スクロールエフェクトのキーとなる値
    scrollEffect = () => {
      scrollPosition = pageYOffset;
      windowHeight = d.documentElement.clientHeight;
      for (let i = 0; i < effectElement.length; i++) {
        //ビューポートから各要素のtopまでの値　- ブラウザの表示領域 + スクロール量
        scrollInView = effectElement[i].getBoundingClientRect().top - windowHeight + scrollPosition;
        //各要素が表示領域に入った時クラスを付与
        if (scrollPosition > scrollInView) {
          effectElement[i].classList.add('add-inView');
        }
      }
      if (effectElement[effectElement.length - 1].classList.contains('add-inView')) {
        //イベント解除
        w.removeEventListener('scroll',scrollEffect);
      }
    }
    w.addEventListener('scroll',scrollEffect);
  });

  /*---------------------------------------------
    動画 ポップアップ
  -----------------------------------------------*/
  const popupTrigger = d.querySelectorAll('.js-popupTrigger');
  const videoPopup = d.querySelectorAll('.js-videoPopup');
  const video = d.querySelectorAll('.js-videoPopup video');
  const popupOverlay = d.querySelectorAll('.js-videoPopupOverlay');

  // スクロール 禁止関数
  noScroll = () => {
    event.preventDefault();
　}

  // ポップアップ 終了 関数
  popupClose = () => {
    for (let i = 0; i < popupTrigger.length; i++) {
      popupOverlay[i].classList.remove('add-popup');
      video[i].classList.remove('add-popup');
      setTimeout(() => {
        videoPopup[i].classList.remove('add-popup');
      }, 300);
      video[i].pause();
    }
    //スクロール操作禁止解除
    d.removeEventListener('touchmove', noScroll, { passive: false });
    d.removeEventListener('mousewheel', noScroll, { passive: false });
    d.body.classList.remove('add-ScrollProhibited');
  }

  for (let i = 0; i < popupTrigger.length; i++) {
    // ポップアップ 開始 関数
    popupTrigger[i].addEventListener('click', () => {
      videoPopup[i].classList.add('add-popup');
      setTimeout(() => {
        popupOverlay[i].classList.add('add-popup');
        video[i].classList.add('add-popup');
      }, 10);
      // モバイル端末でのタッチスクロール操作の制御
      d.addEventListener('touchmove', noScroll, { passive: false });
      // PCでマウスホイールでのスクロール操作の制御
      d.addEventListener('mousewheel', noScroll, { passive: false });
      // ios端末でのタッチスクロール操作の制御 & 全てのスクロール操作の制御（ウィンドウ表示域で固定）
      d.body.classList.add('add-ScrollProhibited');
    });
    // ポップアップ 終了
    popupOverlay[i].addEventListener('click', popupClose);
    d.querySelectorAll('.js-videoClose')[i].addEventListener('click', popupClose);
  }

})(document,window);