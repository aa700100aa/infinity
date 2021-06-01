((d,w) => {
  w.addEventListener('load', () => {
    /**
     * スクロールイベント
     */
    let inView;
    const scrollElement = [].slice.call(d.getElementsByClassName('js-inView'));
    const scrollEffect = () => {
      scrollElement.forEach(element => {
        //inView = viewportの左上から要素までの距離 - viewportの高さ
        inView = element.getBoundingClientRect().top - d.documentElement.clientHeight;
        if (inView <= 0) {
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
            console.log(this.targetId);
            if (this.targetId === "#") {
              this.targetPosition = 0;
            } else {
              this.targetPosition = d.querySelector(this.targetId).getBoundingClientRect().top;
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
      scrollAnimation(){
        // 現在時間の継続時間に対する進捗度を算出
        const progress = Math.min(1, (Date.now() - this.startTime) / this.duration);
        // スクロール位置はスタート位置からの（1 - 進捗度）を掛けたもの。進捗度にイージングをかけることで、移動量をイージングさせる
        //const scrollY = startScrollY * (1 - easeOutQuint(progress));
        this.movePosition = this.startScrollY + (this.targetPosition - this.startScrollY) * this.easeOutQuint(progress);
        // 指定した位置へスクロール
        window.scrollTo(0, this.movePosition);
        // 進捗度が1未満（=100%ではない）場合、自分自身を呼び出し、繰り返す
        if (progress < 1) {
          console.log(progress);
          this.animationId = requestAnimationFrame(() => {
            this.scrollAnimation();
          });
        } else {
          window.cancelAnimationFrame(this.animationId);
        }
      }
    }
    const SmoothScroll = new ScrollAnimation({
      hookName: 'js-smooth',
      dataName: 'data-smooth-position',
      duration: 3000
    });
  });
  
})(document, window);