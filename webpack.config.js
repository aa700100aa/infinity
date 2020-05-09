// For instructions about this file refer to
// webpack and webpack-hot-middleware documentation
var webpack = require('webpack');
var path = require('path');
var glob = require("glob");

// filenameを取得するメソッドを追記
// 後から使う
String.prototype.filename = function(){
  return this.match(".+/(.+?)([\?#;].*)?$")[1];
}

// jsBasePath配下の.es6のpathも含めたファイルを取得する
// _から始まるファイルはmoduleなので書き出す必要はないのでいらない
var targets = glob.sync(`./js/**/index.js`);

// entryに入れるhash
var entries = {};

// pathも含めたfilenameからpathとfilenameでhashを作る
targets.forEach(value => {
  var re = new RegExp(`./js/`);
  var key = value.replace(re, '');

  // 確認用に取得したファイル名を出す
  console.log('--------------------------')
  console.log(key) 
  console.log(value.filename()) 
  entries[key] = value;
});

module.exports = {
  // モード値を production に設定すると最適化された状態で、
  // development に設定するとソースマップ有効でJSファイルが出力される
  mode: "development",
  // メインとなるJavaScriptファイル（エントリーポイント）
  entry: entries, //作成したhashをset
  // 出力ファイル
  output: {
    filename: "[name]"
  },

  module: {
    rules: [
      {
        // 拡張子 .js の場合
        test: /\.js$/,
        use: [
          {
            // Babel を利用する
            loader: 'babel-loader',
            // Babel のオプションを指定する
            options: {
              presets: [
                // プリセットを指定することで、ES2020 を ES5 に変換
                '@babel/preset-env',
              ]
            }
          }
        ]
      }
    ]
  }
};
