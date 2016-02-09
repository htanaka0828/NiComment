goog.provide('NicoNicoComment');



/**
 * @constructor
 */
var NicoNicoComment = function() {
  this.lastestTime = + new Date();
  this.interval = 500;
  this.commentArr = [];
  this._d = document;
  this._w = window;
  this.init.call(this);
};

/**
 * 初期設定
 * @protected
 */
NicoNicoComment.prototype.init = function() {
  // styleの書き出し
  this._addStyleTag();

  // イベントメソッドの取得
  var checkTimer = this._checkTimer.bind(this);

  // イベントの設定
  this._w.addEventListener('scroll', checkTimer, false);
  this._w.addEventListener('resize', checkTimer, false);
  if ('ontouchmove' in this._w) {
    // タッチデバイス向け
    this._w.addEventListener('touchmove', checkTimer, false);
  }
};


/**
 * アニメーションで使うcssを書き出す
 * @protected
 */
NicoNicoComment.prototype._addStyleTag = function() {
  var styleTag = this._d.createElement('style');

  // cssの設定
  styleTag.innerHTML = this._concatStr(
    '@charset "UTF-8";',
    '.nico-tv-comment-animate {',
    '  position: fixed;',
    '  color: #000;',
    '  font-size: 25px;',
    '  white-space: nowrap;',
    '  font-weight: 700;',
    '  text-overflow: hidden;',
    '  animation: nicotvcommentanimate 5s linear 1 normal;',
    '}',
    '@-webkit-keyframes nicotvcommentanimate{',
    '  0% {right: -100%;}',
    '  100% {right: 200%;}',
    '}',
    '@keyframes nicotvcommentanimate{',
    '  0% {right: -100%;}',
    '  100% {right: 200%;}',
    '}'
  );

  // 書き出し
  this._d.body.appendChild(styleTag);
};


/**
 * イベントの間引きを行うscript
 * @protected
 * @param {Event} ev .
 */
NicoNicoComment.prototype._checkTimer = function(ev) {
  if (this.lastestTime + this.interval < + new Date()) {
    this.lastestTime = + new Date();
    this._viewComment();
  }
};


/**
 * スクロール位置を判定してコメントをくっつける
 * @protected
 */
NicoNicoComment.prototype._viewComment = function() {
  for (var i = 0, l = this.commentArr.length; i < l; i++) {
    if (
      this.commentArr[i].elm.getBoundingClientRect().top <= 0 &&
      this.commentArr[i].elm.getBoundingClientRect().bottom >= 0 &&
      this.commentArr[i].elm.getBoundingClientRect().left <= 0 &&
      this.commentArr[i].elm.getBoundingClientRect().right >= 0) {
      this.attachComment(this.commentArr[i].body, this.commentArr[i].style);
    }
  }
};


/**
 * 乱数のpxを返却
 * @protected
 * @return {string}
 */
NicoNicoComment.prototype._getRandPx = function() {
  var result = '';
  return '' + Math.floor(Math.random() * this._w.innerHeight) + 'px';
};

/**
 * アニメーション実行後のイベント
 * @protected
 * @param {Event} ev イベントオブジェクト
 */
NicoNicoComment.prototype._endAnimate = function(ev) {
  var target = ev.target;
  // イベント破棄
  target.removeEventListener('webkitAnimationEnd', this._endAnimate, false);
  // DOM削除
  target.parentNode.removeChild(target);
};


/**
 * 文字連結
 * @protected
 * @param {...string} arg
 * @return {string}
 */
NicoNicoComment.prototype._concatStr = function(arg) {
  var result = '';
  for (var i = 0, l = arguments.length; i < l; i++) {
    result += arguments[i];
  }
  return result;
};


/**
 * コメントを書き出す
 * @export
 * @param {String} body
 * @param {Object?} opt_style
 */
NicoNicoComment.prototype.attachComment = function(body, opt_style) {
  var p = this._d.createElement('span');
  p.innerText = body;

  // デフォの設定
  p.style.top = this._getRandPx();

  if (goog.isDefAndNotNull(opt_style)) {
    var obj = opt_style;
    // styleを適用していく
    Object.keys(obj).forEach(function(key) {
      p.style[key] = obj[key];
    });
  }

  // アニメーション設定
  p.classList.add('nico-tv-comment-animate');
  p.addEventListener('webkitAnimationEnd', this._endAnimate.bind(this), false);

  // 書き出し
  this._d.body.appendChild(p);
};


/**
 * コメントを登録する
 * @export
 * @param {Element} elm
 * @param {String} comment
 * @param {Object?} opt_style
 */
NicoNicoComment.prototype.addComment = function(elm, comment, opt_style) {
  if (elm && comment) {
    this.commentArr.push({
      elm: elm,
      body: comment,
      style: opt_style || {}
    });
  }
};

goog.exportSymbol('NiComment', NicoNicoComment);
goog.exportSymbol('NiComment.prototype.addComment', NicoNicoComment.prototype.addComment);
goog.exportSymbol('NiComment.prototype.attachComment', NicoNicoComment.prototype.attachComment);

window['NiComment'] = new NicoNicoComment;
