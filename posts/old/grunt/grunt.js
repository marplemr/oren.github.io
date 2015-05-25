module.exports = function(grunt) {
module.exports = function(grunt) {
  grunt.initConfig({
    lint: {
      files: ['public/js/app.js']
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true
      }
    },
    stylus: {
      compile : {
        files : {
          'public/css/site.css' : 'public/styles/*.styl'
        }
      }
    },
    concat: {
      dist: {
        src: [
          'public/js/prettify.js',
          'public/js/ga.js',
          'public/js/app.js'
        ],
        dest: 'public/js/production.js'
      }
    },
    min : {
      dist : {
        src : 'public/js/production.js',
        dest : 'public/js/production.min.js'
      }
    }
  });

  grunt.registerTask('default', 'lint concat min');
};
  grunt.initConfig({
    lint: {
      files: ['public/js/app.js']
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true
      }
    },
    stylus: {
      compile : {
        files : {
          'public/css/site.css' : 'public/styles/*.styl'
        }
      }
    },
    cssmin : {
      dist : {
        src: [
          'public/css/font-awesome.css',
          'public/css/site.css',
          'public/css/prettify.css'
        ],
        dest: 'public/css/production.css'
      }
    },
    concat: {
      dist: {
        src: [
          'public/js/prettify.js',
          'public/js/ga.js',
          'public/js/app.js'
        ],
        dest: 'public/js/production.js'
      }
    },
    min : {
      dist : {
        src : 'public/js/production.js',
        dest : 'public/js/production.min.js'
      }
    },
    watch: {
      stylus: {
        files: ['public/styles/*.styl'],
        tasks: 'stylus'
      },
      lint: {
        files: '<config:lint.files>',
        tasks: 'lint'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib');
  grunt.loadNpmTasks('grunt-css');
  grunt.registerTask('default', 'lint stylus concat cssmin min');
};

