var gulp = require('gulp'); //require this module
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');//
var nodemon = require('gulp-nodemon'); //unclear as to whether or not we need the original jscs

var jsfiles = ['*.js', 'src/**/*.js'];



gulp.task('style', function(){
   return gulp.src(jsfiles)
   .pipe(jshint())
   .pipe(jshint.reporter('jshint-stylish', {
    verbose: true
   }))
   .pipe(jscs()); 
});

gulp.task('inject', function(){
    var wiredep = require('wiredep').stream;
    /*var inject = require('gulp-inject');*/

    var injectSrc = gulp.src(['./public/css/*.css',
        './public/js/*.js'], {read: false});

    var injectOptions = {
        ignorePath: '/public'
    };

    var options = {
        bowerJson: require('./bower.json'),
        directory: './public/lib',
        ignorePath: '../../public'
    };

    return gulp.src('./src/views/*.jade') //change this to whatever *. is your file type
    .pipe(wiredep(options))
    .pipe(gulp.dest('./src/views'));

    /*.pipe(wiredep(options))
    .pipe(inject(injectSrc, injectOptions))
    .pipe(gulp.dest('./src/views'));*/
});

//style and inject will run asychronusly before serve 
gulp.task('serve', ['style', 'inject'], function(){
    var options = {
        script: 'app.js',
        delayTime: 1,
        env: { //Database connection strings, things that change from env to env
            'PORT': 3000
        },
        watch: jsfiles
    }

    return nodemon(options).on('restart',function(err){
        console.log('Restarting...');
    })
})