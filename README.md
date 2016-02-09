ニコ●コ動画っぽいコメントをブラウザ上で流すためのjs
======================

## Buildの方法
nodeとnpmをインストールして
```sh
npm install gulp bower -g
npm install
bower install
gulp
# dist/nicoment.min.jsが出来上がりのファイル
```

## 使い方
jsを読み込むと`NiComment`が読み込まれる

```javascript
// コメントを流すメソッド
NiComment.attachComment = function(body, opt_style)

// 特定のelmまでスクロールされたら流すコメントを登録しておくメソッド
NiComment.addComment = function(elm, comment, opt_style)
```
