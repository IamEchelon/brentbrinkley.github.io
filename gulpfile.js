/*
|—————————————————————————————————————————————————————————————————————————
| Required Modules
|—————————————————————————————————————————————————————————————————————————
*/

var gulp         = require('gulp');
var browserSync  = require('browser-sync').create();
var sass         = require('gulp-sass');
var stylus       = require('gulp-stylus');
var ts           = require('gulp-typescript');
var sourcemaps   = require('gulp-sourcemaps');
var plumber      = require('gulp-plumber');
var notify       = require('gulp-notify');
var autoprefixer = require('gulp-autoprefixer');
var child        = require('child_process');
var utility      = require('gulp-util');


/*
|—————————————————————————————————————————————————————————————————————————
| Main Tasks
|—————————————————————————————————————————————————————————————————————————
*/

   
    /*
    |——————————————————————————————————————————————
    | Browsersync
    |——————————————————————————————————————————————
    */

    gulp.task('browser-sync', function() {

        // initialize browser-sync server on localhost:3000
        browserSync.init({
            files: [ '_site/**'],
            port: 4000,
            server: {
                baseDir: "_site"
            }
        });
    });

    /*
    |——————————————————————————————————————————————
    | Stylus
    |——————————————————————————————————————————————
    */
    gulp.task('stylus', function() {
        return gulp
            .src('_stylus/custom.styl')

            .pipe( sourcemaps.init() )

            .pipe(stylus({
                // use: jeet(),
                compress: true
            }))

            .on('error', notify.onError(function (error) {
                return "Message to the notifier: " + error.message;
            }))

            .pipe(  plumber()  )

            .pipe(  sourcemaps.write()  )
            .pipe(  gulp.dest('assets/')  )
            .pipe(  browserSync.stream()  );
    });


    /*
    |——————————————————————————————————————————————
    | Sass
    |——————————————————————————————————————————————
    */

    gulp.task('sass', function() {
        
        return gulp
        
            // input files 
            .src('_scss/queries.scss')

            // create sourcemap
            // .pipe( sourcemaps.init() )

            // Sass options object
            .pipe( sass( { outputStyle: 'compressed'} )

            // handles errors through notify
            .on('error', notify.onError(function (error) {
                return "Message to the notifier: " + error.message;
            }))
            )

            // prevents errors from stopping gulp
            .pipe(plumber())

            // browser preifixes  
            .pipe(autoprefixer())

            // output sourcemap
            // .pipe(sourcemaps.write('../css'))

            // output files
            .pipe(gulp.dest('_stylus/css/'))

            // conntection to browser-sync
            .pipe(browserSync.stream());
    });

    /*
    |——————————————————————————————————————————————
    | TypeScript
    |——————————————————————————————————————————————
    */

    // gulp.task("ts", function() {

    //     return gulp
        
    //         // input files
    //         .src('./scripts/ts/*.ts')

    //         // handles errors through notify
    //         .on('error', notify.onError(function (error) {
    //             return "Message to the notifier: " + error.message;
    //         }))

    //         // prevents errors from stopping gulp
    //         .pipe(plumber())

    //         // create sourcemap
    //         .pipe(sourcemaps.init())

    //         // TypeScript object
    //         .pipe(ts({

    //             // throws error on implicit any if enabled
    //             noImplicitAny: true,

    //             // name of output file
    //             outFile: 'main.js',

    //             pretty: true


    //         }))

    //         // output sourcemap
    //         .pipe(sourcemaps.write('../js'))

    //         // output files 
    //         .pipe(gulp.dest('./scripts/js/'))

    //         // conntection to browser-sync
    //         .pipe(browserSync.stream());
    // });

    

    /*
    |——————————————————————————————————————————————
    | Jekyll
    |——————————————————————————————————————————————
    */

    gulp.task('jekyll', () => {
        const jekyll = child.spawn('jekyll', ['build',
            '--watch',
            '--incremental',
            '--drafts'
        ]);

        const jekyllLogger = (buffer) => {
            buffer.toString()
            .split(/\n/)
            .forEach((message) => utility.log('Jekyll: ' + message));
        };

    jekyll.stdout.on('data', jekyllLogger);
    jekyll.stderr.on('data', jekyllLogger); 
});

/*
|—————————————————————————————————————————————————————————————————————————
| Watch Task
|—————————————————————————————————————————————————————————————————————————
*/

gulp.task('watch', function() {
    gulp.watch('./**/*.styl', ['stylus']);
    // gulp.watch('./scripts/ts/*.ts', ['ts']);
    
});

/*
|—————————————————————————————————————————————————————————————————————————
| Default Task
|—————————————————————————————————————————————————————————————————————————
*/

gulp.task('default', [ 'browser-sync', 'sass', 'stylus', 'jekyll', 'watch']);

