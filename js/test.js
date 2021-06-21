((d, w) => {
  w.addEventListener('load', () => {
    /**
     * スクロールイベント
     */
    let inView;
    const scrollElement = [].slice.call(d.getElementsByClassName('js-inView'));
    const scrollEffect = () => {
      scrollElement.forEach(element => {
        //inView = viewportの左上から要素までの距離 - viewportの高さ
        inView = element.getBoundingClientRect().top - d.documentElement.clientHeight + pageYOffset;
        if (inView <= pageYOffset) {
          element.classList.add('add-inView');
        }
      });
      //スクロールイベントの対象要素が全て表示されたらイベント解除
      if (scrollElement[scrollElement.length - 1].classList.contains('add-inView')) {
        w.removeEventListener('scroll', scrollEffect);
      }
    }
    w.addEventListener('scroll', scrollEffect);

    /**
     * ローカルナビ
     */
    const localNav = d.querySelector('.js-localNav');
    let flag
    w.addEventListener('scroll', () => {
      flag = localNav.getBoundingClientRect().top;
      if (flag <= 0) {
        localNav.style.paddingTop = `${localNav.offsetHeight}px`;
        localNav.children[0].classList.add('add-fixed');
      } else {
        localNav.removeAttribute('style');
        localNav.children[0].classList.remove('add-fixed');
      }
    });

    /**
     * タブ切り替え
     */
    const tabTitle = [].slice.call(d.getElementsByClassName('js-tabTitle'));
    const tabContent = [].slice.call(d.getElementsByClassName('js-tabContent'));
    tabTitle.forEach((element,index) => {
      element.addEventListener('click', () => {
        for (let i = 0; i < tabTitle.length; i++){
          tabTitle[i].classList.remove('is-active');
          tabContent[i].classList.remove('is-show');
        }
        element.classList.add('is-active');
        tabContent[index].classList.add('is-show');
      });
    });

    /**
     * スムーススクロール
     */
    class ScrollAnimation {
      constructor(obj) {
        this.smoothElement = [].slice.call(d.getElementsByClassName(obj.hookName));
        this.duration = obj.duration;
        this.animationId;
        this.movePosition;
        this.smoothElement.forEach(element => {
          element.addEventListener('click', event => {
            this.targetId = event.currentTarget.getAttribute(obj.dataName);
            if (this.targetId === "#") {
              this.targetPosition = 0;
            } else if (d.querySelector(this.targetId).getBoundingClientRect().top + pageYOffset + d.documentElement.clientHeight > document.body.clientHeight) {
              this.targetPosition = document.body.clientHeight - d.documentElement.clientHeight;
            } else {
              this.targetPosition = d.querySelector(this.targetId).getBoundingClientRect().top + pageYOffset - d.querySelector('.js-localNav').offsetHeight;
            }
            // Date.now()で開始時間をセット
            this.startTime = Date.now();
            // 現在のスクロール位置をセット
            this.startScrollY = window.pageYOffset;
            // アニメーション実行
            this.scrollAnimation();
          });
        });
      }
      /**
       * イージング関数
       * @param x
       * @returns {number}
       */
      easeOutQuint(x){
       //return 1 - Math.pow(1 - x, 5);
       return 1 - Math.pow(1 - x, 4);
      }
      /**
       * アニメーションの各フレームでの処理
       */
      scrollAnimation() {
        // 現在時間の継続時間に対する進捗度を算出
        const progress = Math.min(1, (Date.now() - this.startTime) / this.duration);
        // スクロール位置はスタート位置からの（1 - 進捗度）を掛けたもの。進捗度にイージングをかけることで、移動量をイージングさせる
        //const scrollY = startScrollY * (1 - easeOutQuint(progress));
        this.movePosition = this.startScrollY + (this.targetPosition - this.startScrollY) * this.easeOutQuint(progress);
        window.scrollTo(0, this.movePosition);
        // 進捗度が1未満（=100%ではない）場合、自分自身を呼び出し、繰り返す
        if (progress < 1) {
          this.animationId = requestAnimationFrame(() => {
            this.scrollAnimation();
          });
        }
      }
    }
    const SmoothScroll = new ScrollAnimation({
      hookName: 'js-smooth',
      dataName: 'data-smooth-position',
      duration: 800
    });

    /*-------------------------
      youtoube API
    ---------------------------*/

    // 埋め込むyoutubeのIDと埋め込むエリアを指定
    var ytData = [
      {
        id: '-fxi9fqYx74',
        area: 'sample01'
      },
      {
        id: 'xl2hrLb3ESw',
        area: 'sample02'
      },
      {
        id: 'JDyXSvFHW9Y',
        area: 'sample03'
      },
      {
        id: '5ZHqijYQ_Sg',
        area: 'sample04'
      }
    ];

    // 各プレーヤー格納用配列
    var ytPlayer = [];

    (() => {
      for (var i = 0; i < ytData.length; i++) {
        ytPlayer[i] = new YT.Player(ytData[i]['area'], {
          videoId: ytData[i]['id'],
          playerVars: {
            loop: 1,//0:ループしない 1:ループする 1の場合playlist設定必須
            playlist: ytData[i]['id'],//次に流すYoutubeのID
            controls: 1,//コントローラー無し
            playsinline: 1//iOSの動画再生制御
            //autoplay: 1//オートプレイ
          },
          events: {
            'onReady': onPlayerReady
          }
        });
      }
    })();

    function onPlayerReady(event) {
      //event.target.playVideo();
      event.target.mute(); //デフォルト：mute
      //event.target.playVideo();
    }

    /*-------------------------
      youtube インライン再生
    ---------------------------*/
    const youtubePlay = () => {
      const inlinePlayer = d.querySelector('.js-inlinePlayer');
      if (inlinePlayer.classList.contains('add-inView')) {
        
        ytPlayer[0].playVideo();
        //ytPlayer[0].unMute();
        //ytPlayer[0].unMute();
        //ytPlayer[0].unMute();
        //document.getElementById('sample01').contentWindow.postMessage('{"event":"command","func":"' + 'playVideo' + '","args":""}', '*');
        w.removeEventListener('scroll', youtubePlay);
        //document.getElementsById('sample01').click();
        console.log('aaa');
        setTimeout(() => {
          //ytPlayer[0].unMute();
        }, 2000);
      }
    }
    w.addEventListener('scroll', youtubePlay);
    /*-------------------------
      モーダル
    ---------------------------*/
    const modalContent = d.getElementsByClassName('js-modalContent');
    const modalArea = d.getElementById('js-modalArea');
    [].slice.call(d.getElementsByClassName('js-modalTrigger')).forEach((element, index) => {
      element.addEventListener('click', () => {
        modalArea.classList.add('is-show');
        modalContent[index].classList.add('is-show');
        ytPlayer[index + 1].playVideo();
        ytPlayer[index + 1].unMute();
      });
    });
    [].slice.call(d.getElementsByClassName('js-closeModalTrigger')).forEach(element => {
      element.addEventListener('click', () => {
        modalArea.classList.remove('is-show');
        for (let i = 0; i < modalContent.length; i++) {
          modalContent[i].classList.remove('is-show');
        }
        for (let i = 1; i < ytPlayer.length; i++) {
          ytPlayer[i].stopVideo();
        }
      });
    });

  });
  
})(document, window);