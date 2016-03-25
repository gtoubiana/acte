// http://makina-corpus.com/blog/metier/2015/make-your-gulp-modular
var requireDir = require('require-dir');

requireDir('./gulp/tasks', {
  recurse: true
});
