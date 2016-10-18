module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {                              // Task
       dist: {                            // Target
         options: {                       // Target options
           style: 'compressed',
           loadPath: [
                      'node_modules/bourbon/app/assets/stylesheets',
                      'node_modules/bourbon-neat/app/assets/stylesheets',

                  ]
         },
         files: {                         // Dictionary of files
           'lib/styles/main.min.css': 'src/styles/main.scss',       // 'destination': 'source'
         }
       }
     },
     uglify: {
       options: {
         preserveComments: false
       },
       my_target: {
               files: {
                   'lib/js/main.min.js': ['lib/js/main.js'],
                   'lib/js/vendor.min.js': ['lib/js/vendor.js']
               }
       }
     },
     concat: {
       options: {
         separator: ';'
       },
       dist: {
             files: {
               'lib/js/main.js': ['src/js/*.js'],
               'lib/js/vendor.js': ['src/js/vendor/*.js']
             }
           }
     },
     jshint: {
        all: ['Gruntfile.js', 'src/*.js', 'test/*.js']
      },
     imagemin: {
       dynamic: {
         options: {
           optimizationLevel: 3
         },
         files: [{
           expand: true,
           cwd: 'images/',
           src: ['**/*.{png,jpg,gif,svg}'],
           dest: 'images/'
         }]
       }
     },
     watch: {
       css: {
         files: ['src/styles/**/*'],
         tasks: ['sass']
       },
       javascript: {
         files: ['src/js/**/*'],
         tasks: ['concat', 'uglify', 'jshint']
       },
       img: {
         files: ['images/**/*'],
         tasks: ['imagemin']
       }
     }

  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.registerTask('default', ['sass', 'watch', 'imagemin', 'jshint', 'concat', 'uglify']);
};
