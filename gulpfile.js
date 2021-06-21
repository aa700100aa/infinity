
// gulpプラグインの読み込み
const gulp = require("gulp");
// Sassをコンパイルするプラグインの読み込み
const sass = require("gulp-sass");
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require("browser-sync");
// webpackの設定ファイルの読み込み
const webpackStream = require('webpack-stream');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');

// style.scssをタスクを作成する
gulp.task("sass", function () {
  return gulp.src(['./sass/*.scss', '!./sass/common/'])// コンパイル対象のSassファイル
    .pipe(sass())
    .pipe(autoprefixer(
      {
        grid: true
      }
    ))
    .pipe(gulp.dest('dist/css'))
});
gulp.task('css', function (done) {
  gulp.watch("sass/**/*.scss", gulp.series('sass'));
  done();
});

// js
gulp.task('bundle', function () {
  return webpackStream(webpackConfig, webpack)
    .pipe(gulp.dest('dist/js'))
});
gulp.task('js', function (done) {
  gulp.watch("./js/**/*.js", gulp.series('bundle'));
  done();
});

//ブラウザシンク
gulp.task("browserSync", function(done) {
  browserSync.init({
    server: {
      baseDir: "./" // ルートとなるディレクトリを指定
    },
    port: 3000
  });
  gulp.watch(['./dist/**','./index.html'], function(done) {
    browserSync.reload(); // ファイルに変更があれば同期しているブラウザをリロード
    done()
  });
  done()
});

gulp.task('default', gulp.series(gulp.parallel('js', 'css', 'browserSync')));