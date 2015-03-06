var mime = require('mime');
var path = require('path');
var fs = require('fs');
var _ = require('lodash');

module.exports = function (grunt) {
  'use strict';

  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  var paths = {
    bower: 'bower_components',
    dist: 'dist',
    e2e: 'test/e2e',
    sassCache: '.sass-cache',
    src: 'src',
    temp: '.tmp',
    test: 'test/unit'
  };

  grunt.initConfig({
    project: paths,

    autoprefixer: {
      options: {
        browsers: ['last 2 versions', 'ie >= 8', 'ff >= 2', 'safari >= 5.1'],
        cascade: false
      },
      all: {
        files: [{
          expand: true,
          cwd: '<%= project.temp %>/styles/',
          src: '**/*.css',
          dest: '<%= project.temp %>/styles/'
        }]
      }
    },

    clean: {
      dev: '<%= project.temp %>',
      dist: {
        files: [{
          dot: true,
          src: [
            '<%= project.temp %>',
            '<%= project.sassCache %>',
            '<%= project.dist %>'
          ]
        }]
      }
    },

    compass: {
      options: {
        config: 'config.rb'
      },
      dev: {
        options: {
          debugInfo: true
        }
      },
      dist: {
        options: {
          environment: 'production'
        }
      },
      test: {
        options: {
          debugInfo: true
        }
      }
    },

    concurrent: {
      options: {
        logConcurrentOutput: true
      },
      dist: [
        'compass:dist',
        'imagemin',
        'svgmin'
      ]
    },

    connect: (function () {
      var bower = paths.bower;
      var bowerMiddleware = function (req, res, next) {
        if (req.url.indexOf('/scripts/vendor/') !== 0 && req.url.indexOf('/fonts/vendor/') !== 0) {
          return next();
        }

        var filePath = req.url.replace(/^\/(?:scripts|fonts)\/vendor/, bower);
        res.setHeader('Content-Type', mime.lookup(filePath));
        res.end(grunt.file.read(filePath));
      };

      var rewriteMiddleware = function () {
        var modRewrite = require('connect-modrewrite');
        return modRewrite([
          '^/api/(.*)$ http://localhost:9004/api/$1 [NC][P][L]',
          '!^/(?:fonts/|images/|scripts/|styles/|views/|favicon.ico) / [NC][L]'
        ]);
      };

      return {
        options: {
          hostname: 'localhost',
          livereload: false
        },
        dev: {
          options: {
            port: 9000,
            open: true,
            debug: true,
            middleware: function (connect, options, middlewares) {
              middlewares.push(bowerMiddleware);
              middlewares.unshift(rewriteMiddleware());
              middlewares.unshift(require('connect-livereload')());
              return middlewares;
            },
            base: [
              '<%= project.temp %>',
              '<%= project.src %>'
            ]
          }
        },
        dist: {
          options: {
            port: 9001,
            open: true,
            keepalive: true,
            middleware: function (connect, options, middlewares) {
              middlewares.unshift(rewriteMiddleware());
              return middlewares;
            },
            base: '<%= project.dist %>'
          }
        },
        e2e: {
          options: {
            port: 9002,
            open: false,
            keepalive: true,
            livereload: false,
            middleware: function (connect, options, middlewares) {
              middlewares.unshift(rewriteMiddleware());
              return middlewares;
            },
            base: '<%= project.dist %>'
          }
        },
        test: {
          options: {
            port: 9003,
            livereload: false,
            middleware: function (connect, options, middlewares) {
              middlewares.unshift(rewriteMiddleware());
              middlewares.push(bowerMiddleware);
              return middlewares;
            },
            base: [
              '<%= project.temp %>',
              '<%= project.test %>',
              '<%= project.src %>'
            ]
          }
        }
      };
    })(),

    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= project.src %>',
          dest: '<%= project.dist %>',
          src: [
            '*.{ico,txt}',
            '*.html',
            'views/**/*.html',
            'fonts/**/*'
          ]
        }, {
          expand: true,
          cwd: '<%= project.temp %>/images',
          dest: '<%= project.dist %>/images',
          src: ['sprites/**/*']
        }, {
          expand: true,
          cwd: 'bower_components/bootstrap-sass-official/assets/fonts/bootstrap/',
          src: '*.*',
          dest: '<%= project.dist %>/fonts/bootstrap/'
        }]
      }
    },

    filerev: {
      dist: {
        src: [
          '<%= project.dist %>/scripts/**/*.js',
          '<%= project.dist %>/styles/**/*.css',
          '<%= project.dist %>/images/**/*.{png,jpg,gif,svg}',
          '<%= project.dist %>/fonts/**/*'
        ]
      }
    },

    html2js: {
      options: {
        base: '<%= project.src %>/scripts/common/',
        quoteChar: '\'',
        fileHeaderString: '(function (angular) {\r\n  \'use strict\';\r\n',
        fileFooterString: '\r\n})(window.angular);',
        htmlmin: {
          collapseWhitespace: true,
          removeCommentsFromCDATA: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true
        },
        singleModule: true
      },
      directives: {
        module: 'test.common.directives.templates',
        src: ['<%= project.src %>/scripts/common/directives/**/*.tpl.html'],
        dest: '<%= project.src %>/scripts/common/directives/module.tpl.js'
      },
      dialogs: {
        module: 'test.common.dialogs.templates',
        src: ['<%= project.src %>/scripts/common/dialogs/**/*.tpl.html'],
        dest: '<%= project.src %>/scripts/common/dialogs/module.tpl.js'
      }
    },

    htmlhint: {
      options: {
        htmlhintrc: '.htmlhintrc',
        force: true
      },
      all: {
        src: [
          '<%= project.src %>/index.html',
          '<%= project.src %>/scripts/**/*.html',
          '<%= project.src %>/views/**/*.html'
        ]
      }
    },

    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          removeCommentsFromCDATA: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true
        },
        files: [{
          expand: true,
          cwd: '<%= project.dist %>',
          src: ['*.html', 'views/**/*.html'],
          dest: '<%= project.dist %>'
        }]
      }
    },

    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= project.src %>/images',
          src: ['**/*.{png,jpg,gif,ico}', '!sprites/**/*'],
          dest: '<%= project.dist %>/images'
        }]
      }
    },

    jsbeautifier: {
      options: {
        js: {
          indentWithTabs: false,
          maxPreserveNewlines: 2,
          indentChar: ' ',
          indentSize: 2,
          jslintHappy: true
        }
      },
      ngconstant: {
        src: ['<%= project.src %>/scripts/config.js']
      },
      html2js: {
        src: ['<%= project.src %>/scripts/**/*.tpl.js']
      }
    },

    jshint: {
      options: {
        force: true,
        reporter: require('jshint-stylish')
      },
      dev: {
        options: {
          jshintrc: '.jshintrc'
        },
        src: [
          'Gruntfile.js',
          '<%= project.src %>/scripts/**/*.js',
          '!<%= project.src %>/scripts/**/*.tpl.js'
        ]
      },
      e2e: {
        options: {
          jshintrc: '<%= project.e2e %>/.jshintrc'
        },
        src: [
          '<%= project.e2e %>/spec/**/*.js',
          '<%= project.e2e %>/page-objects/**/*.js'
        ]
      },
      test: {
        options: {
          jshintrc: '<%= project.test %>/.jshintrc'
        },
        src: ['<%= project.test %>/spec/**/*.js']
      }
    },

    jscs: {
      options: {
        force: true,
        config: '.jscsrc'
      },
      dev: {
        src: [
          'Gruntfile.js',
          '<%= project.src %>/scripts/**/*.js',
          '!<%= project.src %>/scripts/**/*.tpl.js'
        ]
      },
      e2e: {
        src: [
          '<%= project.e2e %>/spec/**/*.js',
          '<%= project.e2e %>/page-objects/**/*.js'
        ]
      },
      test: {
        src: ['<%= project.test %>/spec/**/*.js']
      }
    },

    karma: {
      unit: {
        configFile: '<%= project.test %>/karma.conf.js',
        singleRun: true
      }
    },

    ngAnnotate: {
      options: {
        singleQuotes: true
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= project.temp %>/concat/scripts',
          src: '*.js',
          dest: '<%= project.temp %>/concat/scripts'
        }]
      }
    },

    ngconstant: (function () {
      var src = paths.src;
      var defaultConfig = path.join(src, 'config.json');
      var readConfigJson = function (environment) {
        if (environment) {
          var configPath = path.join(src, 'config.' + environment + '.json');
          if (grunt.file.exists(configPath)) {
            return grunt.file.readJSON(configPath);
          }
        }

        return grunt.file.readJSON(defaultConfig);
      };

      return {
        options: {
          name: 'test.environment',
          dest: '<%= project.src %>/scripts/config.js',
          template: grunt.file.read('./ng-constant-tpl.ejs'),
          constants: {
            config: readConfigJson()
          }
        },
        dev: {
          constants: {
            config: readConfigJson('dev')
          }
        },
        dist: {
          constants: {
            config: readConfigJson('dist')
          }
        },
        e2e: {
          constants: {
            config: readConfigJson('e2e')
          }
        },
        test: {
          constants: {
            config: readConfigJson('test')
          }
        }
      };
    })(),

    'sails-linker': {
      options: {
        startTag: '<!-- scripts -->',
        endTag: '<!-- scripts end -->',
        fileTmpl: '<script src="%s"></script>',
        appRoot: '<%= project.src %>'
      },
      src: {
        files: {
          '<%= project.src %>/index.html': '<%= project.src %>/scripts/**/*.js'
        }
      }
    },

    scsslint: {
      options: {
        force: true,
        config: '.scss-lint.yml',
        reporterOutput: '<%= project.temp %>/scss-lint-report.xml'
      },
      all: [
        '<%= project.src %>/styles/**/*.scss',
        '!<%= project.src %>/styles/fonts/**/*.scss'
      ]
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= project.src %>/images',
          src: '**/*.svg',
          dest: '<%= project.dist %>/images'
        }]
      }
    },

    useminPrepare: {
      html: '<%= project.src %>/index.html',
      options: {
        dest: '<%= project.dist %>',
        flow: {
          html: {
            steps: {
              js: [{
                name: 'concat',
                createConfig: function (context, block) {
                  var cfg = {
                    files: []
                  };
                  var outfile = path.join(context.outDir, block.dest);

                  var files = {};
                  files.dest = outfile;
                  files.src = [];

                  context.inFiles.forEach(function (file) {
                    file = file.replace(/^\/scripts\/vendor\//, path.join('../', grunt.config.data.project.bower, '/'));
                    if (_.isArray(context.inDir)) {
                      context.inDir.every(function (d) {
                        var joinedPath = path.join(d, file);
                        var joinedPathExists = fs.existsSync(joinedPath);
                        if (joinedPathExists) {
                          files.src.push(joinedPath);
                        }
                        return !joinedPathExists;
                      });
                    } else {
                      files.src.push(path.join(context.inDir, file));
                    }
                  });

                  cfg.files.push(files);
                  context.outFiles = [block.dest];
                  return cfg;
                }
              }, 'uglifyjs'],
              css: ['cssmin']
            },
            post: {}
          }
        }
      }
    },

    usemin: {
      options: {
        assetsDirs: ['<%= project.dist %>', '<%= project.dist %>/images'],
        blockReplacements: {
          js: function (block) {
            return '<script src="/' + block.dest + '"></script>';
          },
          css: function (block) {
            return '<link rel="stylesheet" href="/' + block.dest + '" />';
          }
        }
      },
      html: ['<%= project.dist %>/**/*.html'],
      css: ['<%= project.dist %>/styles/**/*.css']
    },

    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },
      compass: {
        files: ['<%= project.src %>/styles/**/*.scss'],
        tasks: ['compass:dev', 'autoprefixer']
      },
      html: {
        files: ['<%= project.src %>/views/**/*.html'],
        options: {
          livereload: true
        }
      },
      html2js: {
        files: ['<%= project.src %>/scripts/common/**/*.tpl.html'],
        tasks: ['templates']
      },
      js: {
        files: ['<%= project.src %>/scripts/**/*.js'],
        options: {
          livereload: true
        }
      },
      generated: {
        files: [
          '<%= project.temp %>/images/**/*.{png,jpg,gif,svg}',
          '<%= project.temp %>/styles/**/*.css',
          '<%= project.src %>/images/**/*.{png,jpg,gif,svg}'
        ],
        options: {
          livereload: true
        }
      },
      test: {
        files: ['<%= project.test %>/spec/**/*.js'],
        tasks: ['karma']
      }
    },

    wiredep: {
      src: {
        src: ['<%= project.src %>/index.html'],
        ignorePath: '../<%= project.bower %>/',
        exclude: [/bootstrap\-sass\-official/, /es5-shim/, /html5shiv/, /json3/, /rem.js/],
        fileTypes: {
          html: {
            replace: {
              js: '<script src="/scripts/vendor/{{filePath}}"></script>'
            }
          }
        }
      },
      test: {
        src: '<%= project.test %>/karma.conf.js',
        ignorePath: '../../',
        exclude: [/bootstrap\-sass\-official/, /es5-shim/, /html5shiv/, /json3/, /rem.js/],
        fileTypes: {
          js: {
            block: /(([ \t]*)\/\/\s*bower:*(\S*))(\n|\r|.)*?(\/\/\s*endbower)/gi,
            detect: {
              js: /\\'.*\.js\\'/gi
            },
            replace: {
              js: '\'{{filePath}}\','
            }
          }
        }
      }
    }
  });

  // TASK - BUILD
  grunt.registerTask('build', [
    'clean:dist',
    'environment:dist',
    'wiredep:src',
    'sails-linker:src',
    'templates',
    'useminPrepare',
    'concurrent:dist',
    'autoprefixer',
    'concat',
    'ngAnnotate',
    'copy:dist',
    'cssmin',
    'uglify',
    'filerev',
    'usemin',
    'htmlmin'
  ]);

  // TASK - DEFAULT
  grunt.registerTask('default', ['linters', 'serve:dist']);

  // TASK - E2E
  grunt.registerTask('e2e', ['build', 'connect:e2e']);

  // TASK - ENVIRONMENT
  grunt.registerTask('environment', function (target) {
    return grunt.task.run(['ngconstant:' + (target || 'dev'), 'jsbeautifier:ngconstant']);
  });

  // TASK - LINTERS
  grunt.registerTask('linters', ['jshint', 'jscs', 'scsslint', 'htmlhint']);

  // TASK - SERVE
  grunt.registerTask('serve', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist']);
    }
    return grunt.task.run([
      'clean:dev',
      'environment:dev',
      'wiredep:src',
      'sails-linker:src',
      'templates',
      'compass:dev',
      'autoprefixer',
      'connect:dev',
      'watch'
    ]);
  });

  // TASK - TEMPLATES
  grunt.registerTask('templates', ['html2js', 'jsbeautifier:html2js']);

  // TASK - TEST
  grunt.registerTask('test', [
    'clean:dev',
    'environment:test',
    'wiredep:test',
    'templates',
    'compass:test',
    'autoprefixer',
    'connect:test',
    'karma'
  ]);
};