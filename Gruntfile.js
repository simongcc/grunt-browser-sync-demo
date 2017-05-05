'use strict';

module.exports = function (grunt) {
    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        watch: { 
            sass: {
                files: ['app/assets/css/**/*.{scss,sass}'], //Watch these files, and...
                tasks: ['sass:server'] //run this operation when the files change.
            }
        },

        php: {
            server: {  //Configuration options for the "server" task (i.e. during development).
                options: {
                    port: '5000',
                    base: 'app', //Set the document root to the app folder.
                    router: 'router.php',
                    keepalive: false,
                    open: false
                }
            }
        },

        browserSync: {
            server: {
                bsFiles: {
                    src : [
                       '.tmp/assets/css/**/*.css',
                        'app/assets/js/**/*',
                        'app/assets/img/**/*',
                        'app/**/*.php',
                        'app/**/*.html'
                    ]
                },
                options: {
                    proxy: 'localhost:5000',
                    watchTask: true,
                    open: true
                }
            }
        },

        sass: {
            server: {
                options: {
                    style: 'expanded'
                },
                files : [{
                    expand: true,
                    cwd: 'app/assets/css',
                    src: '**/*.scss',
                    dest: '.tmp/assets/css',
                    ext: '.css'
                }]
            }
        }
    });

    grunt.registerTask('default', function (target) {
        grunt.task.run([
            'sass:server',
            'php:server',
            'browserSync:server', 
            'watch'
        ]);
    });
};