
// gulpプラグインの読み込み
const gulp = require("gulp");
// Sassをコンパイルするプラグインの読み込み
const sass = require("gulp-sass");
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require("browser-sync");

// style.scssをタスクを作成する
gulp.task("css", function () {
  return gulp.src('./css/style.scss')// コンパイル対象のSassファイル
    .pipe(sass())
    .pipe(autoprefixer(
      {
        grid: true
      }
    ))
    .pipe(gulp.dest('./css'))
});

//ブラウザシンク
gulp.task("browserSyncTask", function(done) {
  browserSync({
    server: {
      baseDir: "./" // ルートとなるディレクトリを指定
    }
  });
  gulp.watch("./**", function(done) {
    browserSync.reload(); // ファイルに変更があれば同期しているブラウザをリロード
    done()
  });
  done()
});

gulp.task("default", function () {
  // scssフォルダを監視し、変更があったらコンパイルする
  gulp.watch('./css/style.scss', gulp.series('css',gulp.parallel('browserSyncTask')));
});