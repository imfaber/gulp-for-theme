module.exports = {

  /**
   * The public directory is where all your theme assets will
   * be placed.
   */
  public: './public', // Relative to theme directory.

  /**
   * Image task.
   *
   * Optimise images.
   */
  image: {
    enable: true,
    src:    './images', // Relative to theme directory.
    dest:   './images'  // Relative to public directory.
  },

  /**
   * Sass task.
   *
   * Compile sass, create sourcemaps, clean css etc..
   */
  sass: {
    enable: true,
    src:    './scss', // Relative to theme directory.
    dest:   './css'   // Relative to public directory.
  },

  /**
   * Javascript task.
   *
   * Validate, compile, create sourcemaps, uglify etc..
   */
  javascript: {
    enable: true,
    src:    './js', // Relative to theme directory.
    dest:   './js', // Relative to public directory.
    bundle: {
      files:   './*.js', // relative to javascript.src
      // If order is important use the following instead
      // files: [
      //   './file3.js',
      //   './file1.js',
      //   './file2.js'
      // ],
      output:  'site-bundle.js',
      prepend: '(function($){',
      append:  '})(jQuery);'
    }
  },

  /**
   * Copy fonts to public folder.
   */
  font: {
    enable: false,
    src:    './fonts', // Relative to theme directory.
    dest:   './fonts', // Relative to public directory.
  },

  /**
   * The vendor task makes node_modules available to your public directory.
   * Useful if you need, for instance, to reference Javascript or CSS files
   * in your templates.
   */
  vendor: {
    enable:      false,
    dest:        './vendor',
    nodeModules: [
      // 'bootstrap-sass',
      // 'bulma',
      // 'hamburgers'
    ]
  },

  /**
   * Browser sync.
   */
  browserSync: {
    enable: false,
    config: {
      open:         false,
      proxy:        'http://my-site.localhost',
      watchOptions: {
        debounceDelay: 2000
      }
    }
  }

};



