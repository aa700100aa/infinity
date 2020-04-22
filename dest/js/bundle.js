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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("$(document).ready(function () {\n  /*---------------------------------------------\n    動画コンテンツ\n  -----------------------------------------------*/\n  //スライダー\n  $('.js-videoSlider').slick({\n    slidesToShow: 1,\n    slidesToScroll: 1,\n    initialSlide: 0,\n    speed: 275,\n    arrows: true,\n    prevArrow: \"<div class='prevArrow'><img src='images/arrow_bk.svg' alt=''></div>\",\n    nextArrow: \"<div class='nextArrow'><img src='images/arrow_bk.svg' alt=''></div>\",\n    infinite: false\n  }); //ポップアップ\n\n  $('.js-popUp').each(function () {\n    $(this).magnificPopup({\n      mainClass: 'mod-popupMovie',\n      items: {\n        src: $(this).find('.js-video'),\n        type: 'inline'\n      },\n      closeBtnInside: false,\n      removalDelay: 1000,\n      callbacks: {\n        // ポップアップ時の処理\n        open: function open() {\n          // PCでマウスホイールでのスクロール操作の制御\n          $(window).on('wheel', function (e) {\n            e.preventDefault();\n          }); // モバイル端末でのタッチスクロール操作の制御\n\n          $(window).on('touchmove.noScroll', function (e) {\n            e.preventDefault();\n          }); // ios端末でのタッチスクロール操作の制御\n\n          $(\"body\").css('touch-action', 'none'); // 全てのスクロール操作の制御（ウィンドウ表示域で固定）\n\n          $(\"body\").css('overflow', 'hidden'); //フェードイン\n\n          setTimeout(function () {\n            $(\".js-video\").addClass(\"add-fadeIn\");\n          }, 100);\n        },\n        // ポップアップクローズ時の処理\n        close: function close() {\n          var video = document.querySelectorAll('.js-video');\n\n          for (var i = 0; i < video.length; i++) {\n            video[i].pause();\n          }\n\n          $(\".js-video\").removeClass(\"add-fadeIn\"); //スクロール操作禁止解除\n\n          $(window).off('wheel');\n          $(document).off('.noScroll');\n          $(\"body\").css('overflow', 'auto');\n          $(\"body\").css('touch-action', 'auto');\n        }\n      }\n    });\n  });\n});\n/*---------------------------------------------\n  ナビのテキスト変更\n-----------------------------------------------*/\n\nfunction navTextChange() {\n  if (window.matchMedia('(min-width:750px)').matches) {\n    $(\"nav ul li:nth-child(5) a\").html(\"LIVE/STAGE\");\n  } else {\n    $(\"nav ul li:nth-child(5) a\").html(\"LIVE\");\n  }\n}\n/*---------------------------------------------\n  ヘッダーの高さ調整\n-----------------------------------------------*/\n\n\nfunction headerAjust() {\n  $(\"body\").css(\"margin-top\", $(\"header\").height());\n}\n\n$(function () {\n  /*---------------------------------------------\n    オープニング処理\n  -----------------------------------------------*/\n  setTimeout(function () {\n    $(\".js-openingAnimation\").css(\"display\", \"none\");\n  }, 1200);\n  setTimeout(function () {\n    $(\".js-heroOverlayGrids\").css(\"display\", \"none\");\n  }, 2700);\n  setTimeout(function () {\n    $(\".js-heroNav li a\").css(\"transform\", \"translateY(0)\");\n  }, 2000);\n  setTimeout(function () {\n    $(\".js-heroNews\").css(\"transform\", \"translateX(0)\");\n  }, 2000); //headerテキスト切り替え開始タイミング\n\n  if (window.matchMedia('(max-width:749px)').matches) {\n    setTimeout(function () {\n      $(\".js-headerDetail li\").addClass(\"add-headerDetail\");\n    }, 3550);\n  } else {\n    setTimeout(function () {\n      $(\".js-headerDetail li\").addClass(\"add-headerDetail\");\n    }, 3500);\n  }\n\n  if (window.matchMedia('(max-width:749px)').matches) {\n    setTimeout(function () {\n      $(\".hero h1 img\").css(\"transform\", \"translateX(0)\");\n      $(\".hero h1 img\").css(\"transform\", \"scale(1)\");\n    }, 1000);\n  } else {\n    setTimeout(function () {\n      $(\".hero h1 img\").css(\"transform\", \"translateX(0)\");\n      $(\".hero h1 img\").css(\"transform\", \"scale(1)\");\n    }, 2000);\n  }\n  /*---------------------------------------------\n    header 文字切り替え\n  -----------------------------------------------*/\n\n\n  if (window.matchMedia('(max-width:749px)').matches) {\n    setTimeout(function () {\n      $(\".hero h1 img\").css(\"transform\", \"translateX(0)\");\n      $(\".hero h1 img\").css(\"transform\", \"scale(1)\");\n    }, 1000);\n  } else {\n    setTimeout(function () {\n      $(\".hero h1 img\").css(\"transform\", \"translateX(0)\");\n      $(\".hero h1 img\").css(\"transform\", \"scale(1)\");\n    }, 2000);\n  }\n\n  setInterval(function () {\n    if ($(\".js-headerInfomation\").hasClass('add-firstText')) {\n      $(\".js-headerDetail li\").html(\"<p>関ジャニ&infin;アプリで、関ジャニ&infin;を持ち歩こう！</p>\");\n      $(\".js-headerInfomation\").addClass(\"add-secondText\");\n      $(\".js-headerInfomation\").removeClass(\"add-firstText\");\n      $(\".js-headerDetail\").parent().find(\".js-headerBorder\").css(\"opacity\", \"1\");\n    } else if ($(\".js-headerInfomation\").hasClass('add-secondText')) {\n      $(\".js-headerDetail li\").html(\"<p>ニューシングル「友よ」発売中！</p>\");\n      $(\".js-headerInfomation\").addClass(\"add-thirdText\");\n      $(\".js-headerInfomation\").removeClass(\"add-secondText\");\n      $(\".js-headerDetail\").parent().find(\".js-headerBorder\").css(\"opacity\", \"1\");\n    } else {\n      $(\".js-headerDetail li\").html(\"<img src='images/header_logo_200419.svg' alt='関ジャニ&infin; (エイト)'>\");\n      $(\".js-headerInfomation\").addClass(\"add-firstText\");\n      $(\".js-headerInfomation\").removeClass(\"add-thirdText\");\n      $(\".js-headerDetail\").parent().find(\".js-headerBorder\").css(\"opacity\", \"0\");\n    }\n  }, 7000);\n  navTextChange();\n  headerAjust();\n});\n$(window).resize(function () {\n  navTextChange();\n  headerAjust();\n});\nwindow.addEventListener(\"scroll\", function () {\n  //現在のスクロール位置を取得\n  var scrollTop = document.documentElement.scrollTop || document.body.scrollTop; //windowの高さ取得\n\n  var windowHeight = document.documentElement.clientHeight;\n  var ele = document.querySelectorAll(\".js-slideIn\");\n  var ele2 = document.querySelectorAll(\".js-fadeIn\");\n  var ele3 = document.querySelectorAll(\".profile\");\n  console.log('myTop' + myTop);\n  console.log('scrollTop' + scrollTop);\n  console.log('windowHeight' + windowHeight);\n\n  for (var i = 0; i < ele.length; i++) {\n    //各要素ののtop値を取得\n    var rect = ele[i].getBoundingClientRect();\n    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;\n    var myTop = rect.top + scrollTop;\n\n    if (scrollTop > myTop - windowHeight) {\n      ele[i].classList.add(\"add-slideIn\");\n    }\n  }\n\n  for (var _i = 0; _i < ele2.length; _i++) {\n    //各要素ののtop値を取得\n    var rect = ele2[_i].getBoundingClientRect();\n\n    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;\n    var myTop = rect.top + scrollTop;\n\n    if (scrollTop > myTop - windowHeight) {\n      ele2[_i].classList.add(\"add-fadeIn\");\n    }\n  }\n\n  for (var _i2 = 0; _i2 < ele3.length; _i2++) {\n    //各要素ののtop値を取得\n    var rect = ele3[_i2].getBoundingClientRect();\n\n    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;\n    var myTop = rect.top + scrollTop;\n\n    if (scrollTop > myTop - windowHeight) {\n      ele3[_i2].classList.add(\"add-opacity\");\n    }\n  }\n});\n/*---------------------------------------------\n  読み込み時にページの一番上を指定\n-----------------------------------------------*/\n\n$(document).ready(function () {\n  $('html,body').animate({\n    scrollTop: 0\n  }, '1');\n});\n$(function () {\n  $('html,body').animate({\n    scrollTop: 0\n  }, '1');\n});\n\n//# sourceURL=webpack:///./src/main.js?");

/***/ })

/******/ });