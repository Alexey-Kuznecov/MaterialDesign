var gulp = require('gulp'),
sass = require('gulp-sass'), //
browserSync = require('browser-sync'), // Создает подключение, после чего производит автообновление страницы во всех браузерах на всех устройствах
concat = require('gulp-concat'), // Конкатенация файлов.
uglify = require('gulp-uglifyjs'), // JavaScript компрессор.
cssnano = require('gulp-cssnano'), // Оптимизация css файлов
rename = require('gulp-rename'), // Переименование файлов
del = require('del'), // Улание файлов и папок
imagemin = require('gulp-imagemin'), // Сжатие изображений
pngquant = require('imagemin-pngquant')
cache = require('gulp-cache'),
autoprefixer = require('gulp-autoprefixer'); // Один из самых полезных плагинов, который автоматически расставляет префиксы к CSS свойствам, исходя из статистики caniuse.

// Отслеживание файлов (SASS, HTML, JS)
gulp.task('watch', ['bsync', 'css-libs', 'scripts'], function() {
   gulp.watch('app/sass/**/*.sass', ['sass'])
   gulp.watch('app/*.html', browserSync.reload);
   gulp.watch('app/js/**/*.js', browserSync.reload);
});

// Преобразования sass файлов в css
gulp.task('sass', function() {
   return gulp.src('app/sass/**/*.sass')
   .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
   .pipe(autoprefixer({
      browsers: ['last 15 versions','> 1%','ie 7','ie 8'],
      cascade: false })) // Создание префиксов для корректной работы проекта в различных браузерах
   .pipe(gulp.dest('app/css'))
   .pipe(browserSync.reload({ stream: true })) // Отслеживание SASS файлов
});

// Оптимизация и слияния JavaScript библиотек
gulp.task('scripts', function() {
   return gulp.src([
      'app/bower/jquery/dist/jquery.min.js',
      'app/bower/materialize/dist/js/materialize.min.js',
      ])
   .pipe(concat('libs.min.js'))
   .pipe(uglify())
   .pipe(gulp.dest('app/js'));
});

// Оптимизация и слияния CSS библиотек
gulp.task('css-libs', ['sass'], function() {
   return gulp.src('app/css/libs.css')
   .pipe(cssnano())
   .pipe(rename({ suffix: '.min' }))
   .pipe(gulp.dest('app/css'));
});
// Запуск сервера
gulp.task('bsync', function() {
   browserSync({
      server: { baseDir: 'app' },
      notify: false
   });
});

// Сжатие изображений
gulp.task('imgs', function() {
   return gulp.src('app/imgs/**/*')
   .pipe(cache(imagemin({
      interlaced: true,
      progressive: true,
      svqoPlugins: [{ removeViewBox: false }],
      une: [ pngquant() ]
   })))
   .pipe(gulp.dest('dist/img'));
});

// Очистка кеша изображений
gulp.task('clear', function() {
   return cache.clearAll();
});

// Сборка проекта
gulp.task('build', ['clean', 'sass', 'imgs', 'scripts'], function() {

   // Сборка стилей
   var buildCss = gulp.src([
      'app/css/main.css',
      'app/css/libs.min.css'
      ])
   .pipe(gulp.dest('dist/css'));

   // Сборка шрифтов
   var buildFonts = gulp.src('dist/fonts/**/*')
   .pipe(gulp.dest('dist/fonts'));

   // Сборка скриптов
   var buildJs = gulp.src('app/js/**/*')
   .pipe(gulp.dest('dist/js'));

   // Сборка документов
   var buildHtml = gulp.src('app/*.html')
   .pipe(gulp.dest('dist'));
});

// Удаление старой версии проекта для новой сборки
gulp.task('clean', function() {
   return del.sync('dist');
});
