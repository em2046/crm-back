const { src, dest } = require('gulp');

function defaultTask(cb) {
  // place code for your default task here
  cb();
}

exports.default = defaultTask;

function copy() {
  return src('src/assets/**/**.*').pipe(dest('dist/assets/'));
}

exports.copy = copy;
