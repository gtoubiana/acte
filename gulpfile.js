// http://makina-corpus.com/blog/metier/2015/make-your-gulp-modular
const requireDir = require('require-dir');

requireDir('./gulp/tasks', {
  recurse: true,
});
