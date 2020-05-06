/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/index.js":
/*!*********************!*\
  !*** ./js/index.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/*---------------------------------------------\n  jQuery\n-----------------------------------------------*/\n$(function () {\n  /*---------------------------------------------\n    contentsLink スライダー\n  -----------------------------------------------*/\n  // ブレイクポイント定義\n  var tabletWidth = window.matchMedia('(min-width:750px) and (max-width:993px)');\n  var mobileWidth = window.matchMedia('screen and (max-width: 749px)');\n\n  function checkBreakPoint() {\n    if (tabletWidth.matches) {\n      //タブレット\n      $('.js-contentsLinkSlider').slick({\n        slidesToScroll: 1,\n        initialSlide: 0,\n        speed: 150,\n        arrows: false,\n        infinite: false,\n        slidesToShow: document.body.clientWidth / 310\n      });\n      $('.js-contentsLinkSlider').on('setPosition', function () {\n        //インラインスタイル オーバーライド\n        $('.js-contentsLinkEmpty').css('width', '11.3%');\n      });\n    } else if (mobileWidth.matches) {\n      //モバイル\n      $('.js-contentsLinkSlider').slick({\n        slidesToScroll: 1,\n        initialSlide: 0,\n        speed: 275,\n        arrows: false,\n        infinite: false,\n        slidesToShow: document.body.clientWidth / 210\n      });\n      $('.js-contentsLinkSlider').on('setPosition', function () {\n        //インラインスタイル オーバーライド\n        $('.js-contentsLinkEmpty').css('width', '50px');\n      });\n    } else {\n      //デスクトップ\n      $('.js-contentsLinkSlider.slick-initialized').slick('unslick');\n    }\n  } // ブレイクポイントの瞬間に発火\n\n\n  tabletWidth.addListener(checkBreakPoint);\n  mobileWidth.addListener(checkBreakPoint); // 初回チェック\n\n  checkBreakPoint();\n  /*---------------------------------------------\n    動画 スライダー\n  -----------------------------------------------*/\n\n  $('.js-videoSlider').slick({\n    slidesToShow: 1,\n    slidesToScroll: 1,\n    initialSlide: 0,\n    speed: 150,\n    arrows: true,\n    prevArrow: \"<div class='prevArrow'><img src='images/arrow_bk.svg' alt=''></div>\",\n    nextArrow: \"<div class='nextArrow'><img src='images/arrow_bk.svg' alt=''></div>\",\n    infinite: false\n  });\n});\n/*---------------------------------------------\n  JavaScript（Vanilla JS）\n-----------------------------------------------*/\n\ndocument.addEventListener('DOMContentLoaded', function () {\n  /*---------------------------------------------\n    キーボードショートカット　コピー禁止\n  -----------------------------------------------*/\n  document.body.oncopy = function () {\n    return false;\n  };\n  /*---------------------------------------------\n    header 文字&ボーダー 表示非表示 切り替え\n  -----------------------------------------------*/\n\n\n  var headerText = document.querySelectorAll('.js-headerText');\n  var headerborder = document.querySelectorAll('.js-headerBorder');\n  var count = 0; //ヘッダーの文字切り替えインターバル(cssで定義した値と同値) \n\n  var headerActionTime = 7000;\n  setInterval(function () {\n    //文字 切り替え\n    headerText[count].classList.remove('add-active');\n    count = count === headerText.length - 1 ? 0 : count += 1; //最後の要素を表示したらリセット\n\n    headerText[count].classList.add('add-active'); //ボーダー 表示非表示 切り替え\n\n    if (count === 0) {\n      headerborder[0].classList.remove('add-display');\n      headerborder[1].classList.remove('add-display');\n    } else {\n      headerborder[0].classList.add('add-display');\n      headerborder[1].classList.add('add-display');\n    }\n  }, headerActionTime);\n  /*---------------------------------------------\n    オープニングアニメーション\n  -----------------------------------------------*/\n  //オープニングアニメーションにかかる時間(cssで定義した値と同値) \n\n  var opAnimationTime = 2500;\n  var opAnimationTrigger = document.querySelectorAll('.js-trigger');\n  window.addEventListener('load', function () {\n    //アニメーション開始\n    for (var i = 0; i < opAnimationTrigger.length; i++) {\n      opAnimationTrigger[i].classList.add('add-trigger');\n    } //アニメーション終了\n\n\n    setTimeout(function () {\n      document.querySelector('.js-opAnimation').classList.add('add-displayNone'); //アニメーション終了時、常にページの一番を指定\n\n      scrollTo(0, 0); //ページ再読み込み時にもスクロールエフェクトを発生させるためクラスを外す\n\n      for (var j = 0; j < effectElement.length; j++) {\n        effectElement[j].classList.remove('add-inView');\n      }\n    }, opAnimationTime * 0.48);\n    setTimeout(function () {\n      document.querySelector('.js-heroOverlayPoster').classList.add('add-displayNone');\n      document.querySelector('.js-heroOverlayGrids').classList.add('add-displayNone');\n    }, opAnimationTime);\n  });\n  /*---------------------------------------------\n    動画 ポップアップ\n  -----------------------------------------------*/\n\n  var popupTrigger = document.querySelectorAll('.js-popupTrigger');\n  var videoPopup = document.querySelectorAll('.js-videoPopup');\n  var video = document.querySelectorAll('.js-videoPopup video');\n  var popupOverlay = document.querySelectorAll('.js-videoPopupOverlay');\n\n  var _loop = function _loop(k) {\n    // ポップアップ 開始\n    popupTrigger[k].addEventListener('click', function () {\n      videoPopup[k].classList.add('add-popup');\n      setTimeout(function () {\n        popupOverlay[k].classList.add('add-popup');\n        video[k].classList.add('add-popup');\n      }, 10); // モバイル端末でのタッチスクロール操作の制御\n\n      document.addEventListener('touchmove', noScroll, {\n        passive: false\n      }); // PCでマウスホイールでのスクロール操作の制御\n\n      document.addEventListener('mousewheel', noScroll, {\n        passive: false\n      }); // ios端末でのタッチスクロール操作の制御 & 全てのスクロール操作の制御（ウィンドウ表示域で固定）\n\n      document.querySelector('body').classList.add('add-ScrollProhibited');\n    }); // ポップアップ 終了\n\n    popupOverlay[k].addEventListener('click', function () {\n      popupClose();\n    });\n    document.querySelectorAll('.js-videoClose')[k].addEventListener('click', function () {\n      popupClose();\n    });\n  };\n\n  for (var k = 0; k < popupTrigger.length; k++) {\n    _loop(k);\n  } // ポップアップ 終了 関数\n\n\n  popupClose = function popupClose() {\n    var _loop2 = function _loop2(l) {\n      popupOverlay[l].classList.remove('add-popup');\n      video[l].classList.remove('add-popup');\n      setTimeout(function () {\n        videoPopup[l].classList.remove('add-popup');\n      }, 300);\n      video[l].pause();\n    };\n\n    for (var l = 0; l < popupTrigger.length; l++) {\n      _loop2(l);\n    } //スクロール操作禁止解除\n\n\n    document.removeEventListener('touchmove', noScroll, {\n      passive: false\n    });\n    document.removeEventListener('mousewheel', noScroll, {\n      passive: false\n    });\n    document.querySelector('body').classList.remove('add-ScrollProhibited');\n  }; // スクロール 禁止関数\n\n\n  noScroll = function noScroll() {\n    event.preventDefault();\n  };\n  /*---------------------------------------------\n    スクロールエフェクト\n  -----------------------------------------------*/\n\n\n  var effectElement = document.querySelectorAll('.js-inView');\n  var scrollPosition; //現在のスクロール量\n\n  var windowHeight; //ブラウザ内の表示領域の高さ\n\n  var scrollInView; //スクロールエフェクトのキーとなる値\n\n  window.addEventListener('scroll', function () {\n    scrollPosition = window.pageYOffset;\n    windowHeight = document.documentElement.clientHeight;\n\n    for (var m = 0; m < effectElement.length; m++) {\n      //ビューポートから各要素のtopまでの値　- ブラウザの表示領域 + スクロール量\n      scrollInView = effectElement[m].getBoundingClientRect().top - windowHeight + scrollPosition; //各要素が表示領域に入った時クラスを付与\n\n      if (scrollPosition > scrollInView) {\n        effectElement[m].classList.add('add-inView');\n      }\n    }\n  });\n});\n\n//# sourceURL=webpack:///./js/index.js?");

/***/ })

/******/ });