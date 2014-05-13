var path = require('path') 
, gulp = require('gulp')
, express = require('express')
, conn = require('connect')
, gutil = require('gulp-util')
, livereload = require('gulp-livereload')
, tinylr = require('tiny-lr')
, Deferred = require('./Deferred')

, log = gutil.log
, bold = gutil.colors.bold
, magenta = gutil.colors.magenta

;

conn.livereload = require('connect-livereload')

/**
  * @param {String} glob - glob pattern to watch. NOTE: doesn't support an array.
  * @returns {Function} - A gulp task
  * @description 
  * It creates a express/livereload servers and server the `./coverage/index.html`, and `./*.md` diles
 */
module.exports = function server () {
  var app = express()
  , lrUp = new Deferred()
  , glob = "./coverage/index.html"
  , serverLR
  ;

  serverLR = tinylr({
    liveCSS: false,
    liveJs: false,
    LiveImg: false
  });

  serverLR.listen(35729, function(err) {
    if (err) { return lrUp.reject(err) }
    lrUp.resolve();
  });

  app.use(conn.errorHandler({dumpExceptions: true, showStack: true}));
  app.use(conn.livereload());
  app.use('/coverage', express["static"](path.resolve('./coverage')));

  app.listen(3001, function() {
    log(bold("express server running on port: " + magenta(3001)));
  });

 

  return function() {
    gulp.watch(glob, function(evt) {
      lrUp.then(function() {
        log('LR: reloading....');
        gulp.src(evt.path).pipe(livereload(serverLR));
      });
    });
  };
};

