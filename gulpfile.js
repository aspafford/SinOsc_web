var gulp = require('gulp')
var concat = require('gulp-concat')
var uglify = require('gulp-uglify')
var pump = require('pump')

gulp.task('build', function(cb) {
  pump([
    gulp.src([
      // 'src/jquery.js',
      'src/Fluid.js',
      'src/FluidIoC.js',
      'src/DataBinding.js',
      'src/flocking-core.js',
      'src/flocking-scheduler.js',
      // 'src/flocking-buffers.js',
      // 'src/flocking-audiofile.js',
      // 'src/flocking-audiofile-compatibility.js',
      'src/flocking-webaudio.js',
      'src/flocking-parser.js',
      'src/flocking-ugens.js',
      'src/flocking-gfx.js',
      'src/flocking-ugens-browser.js'
    ]),
    concat('src.js'),
    uglify(),
    gulp.dest('dist')
  ])
})
