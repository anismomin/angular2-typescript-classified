/// <reference path="typings/tsd.d.ts" />

import gulp = require('gulp');
var ts = require('gulp-typescript');
var rimraf = require('gulp-rimraf');
import nodemon = require('gulp-nodemon');

 
gulp.task('cleanServerDistDir', function(){
  return gulp.src('dist/server').pipe(rimraf());
}); 

gulp.task('cleanClientDistDir', function(){
  return gulp.src('dist/client').pipe(rimraf());
}); 
 
gulp.task('buildServer', ['cleanServerDistDir'],  function () {
  var tsResult = gulp.src('./src/server/**/*.ts')
    .pipe(ts({
        module: 'CommonJS'
      }));
  return tsResult.js.pipe(gulp.dest('./dist/server/'));
});


gulp.task('copylibs', ['cleanClientDistDir'], function() {
  return gulp.src([
    'node_modules/angular2/bundles/angular2-polyfills.js',
    'node_modules/systemjs/dist/system.src.js',
    'node_modules/rxjs/bundles/Rx.js',
    'node_modules/angular2/bundles/angular2.dev.js',
    'node_modules/angular2/bundles/router.dev.js',
    'node_modules/angular2/bundles/http.dev.js'
    ])
    .pipe(gulp.dest('./dist/client/lib'))
});


gulp.task('copyNG2BootstrapLib', ['cleanClientDistDir'],  function () {
    var clientResult = gulp.src('./node_modules/ng2-bootstrap/ng2-bootstrap.js')
    return clientResult.pipe(gulp.dest('./dist/client/lib/ng2-bootstrap'));
});

gulp.task('copyNG2BootstrapComponents', ['cleanClientDistDir'],  function () {
    var clientResult = gulp.src('./node_modules/ng2-bootstrap/components/**/*.js')
    return clientResult.pipe(gulp.dest('./dist/client/lib/ng2-bootstrap/components'));
});


gulp.task('copyClient', ['cleanClientDistDir'],  function () {
  var clientResult = gulp.src(['./src/client/**/*.*', '!./src/client/**/*.ts'])
  return clientResult.pipe(gulp.dest('./dist/client/'));
});


gulp.task('buildClient', ['copyClient', 'copylibs', 'copyNG2BootstrapLib', 'copyNG2BootstrapComponents', ], function() {
  var clientResult = gulp.src('./src/client/**/*.ts')
  .pipe(ts({
        module: 'system',
        target: 'ES5',
        moduleResolution: "node",     
        emitDecoratorMetadata: true,
        experimentalDecorators: true,
        removeComments: false,
        noImplicitAny: false
      }));
  return clientResult.pipe(gulp.dest('./dist/client/'));
});

gulp.task('nodemon', ['buildServer', 'buildClient', 'watchClient', 'watchServer'], function(){
    nodemon({
        script: './dist/server/server.js',
        ignore: ["test/*", "dist/client/**/*.*", "src/client/**/*.*"]
    }).on('restart', function(){
        console.log('nodemon restarted pinpoint.js');
    })
})

gulp.task('watchServer', function() {
   let watcher = gulp.watch('./src/server/**/*.ts', ['buildServer']);
   watcher.on('change', function(event) {
      console.log("Rebuilding Server Only: ");
    });
});

gulp.task('watchClient', function() {
   let watcher = gulp.watch('./src/client/**/*.*', ['buildClient']);
   watcher.on('change', function(event) {
      console.log("Rebuilding Client Only: ");
    });
});


gulp.task('default', ['nodemon']);