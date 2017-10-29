module.exports = {

  public: './public',

  /**
   * Image task.
   *
   * Optimise images.
   */
  image: {
    enable: true,
    src:    './images'
  },

  /**
   * Sass task.
   *
   * Compile sass, create sourcemaps, clean css etc..
   */
  sass: {
    enable: true,
    src:    './scss',
    dest:   './css'
  },

  /**
   * Javascript task.
   *
   * Validate, compile, create sourcemaps, uglify etc..
   */
  javascript: {
    enable:      true,
    src:         './js',
    dest:        './js',
    bundle: {
      files:   './**/*.js', // relative to javascript.src
      // If order is important use the following instead
      // files: [
      //   './file3.js',
      //   './file1.js',
      //   './file2.js'
      // ],
      output:  'site-bundle.js',
      prepend: '(function($){"use strict";',
      append:  '})(jQuery);'
    }
  },

  /**
   * The vendor task makes node_modules available to your public directory.
   * Useful if you need, for instance, to reference Javascript or CSS files
   * in your templates.
   */
  vendor: {
    enable:      true,
    dest:        './vendor',
    nodeModules: [
      'bootstrap-sass',
    ]
  },

  /**
   * Browser sync.
   */
  browserSync: {
    enable: false,
    config: {
      open:           false,
      proxy:          "local.dev",
      reloadDebounce: 1000
    }
  }

};



