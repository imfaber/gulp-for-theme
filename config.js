module.exports = {
  dest: './build',

  images: {
    enable: true,
    src:    './images'
  },

  sass: {
    enable: true,
    src:    './sass',
    dest:   './css'
  },

  javascript: {
    enable: true,
    src:    './js',
    dest:   './js',
    bundle: {
      entry:   './**/*.js', // relative to javascript.src
      // If order is important use the following instead
      // entry: [
      //   './file3.js',
      //   './file1.js',
      //   './file2.js'
      // ],
      output:  './site-bundle.js', // relative to javascripts.dest
      prepend: '(function($){"use strict";',
      append:  '})(jQuery);'
    }
  },

  browserSync: {
    server: {
      // should match `dest` in
      // path-config.json
      baseDir: 'public'
    }
  }

};



