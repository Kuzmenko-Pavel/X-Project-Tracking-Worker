module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            tracking: {
                src: [
                    "x_project_tracking_worker/static/js/tracking/**/*.js"
                ],
                options: {
                    jshintrc: '.jshintrc',
                    globals: {
                        jQuery: true
                    }
                }
            },
            writer: {
                src: [
                    "x_project_tracking_worker/static/js/writer/**/*.js"
                ],
                options: {
                    jshintrc: '.jshintrc',
                    globals: {
                        jQuery: true
                    }
                }
            }
        },
        watch: {
            tracking: {
                files: [
                    "x_project_tracking_worker/static/js/tracking/**/*.js"
                ],
                tasks: ['jshint:tracking', 'requirejs:tracking']
            },
            writer: {
                files: [
                    "x_project_tracking_worker/static/js/writer/**/*.js"
                ],
                tasks: ['jshint:writer', 'requirejs:writer']
            }
        },
        requirejs: {
            tracking: {
                    options: {
                        mainConfigFile: 'x_project_tracking_worker/static/js/tracking/require_config.js',
                        baseUrl: 'x_project_tracking_worker/static/js/tracking/',
                        out: 'x_project_tracking_worker/static/js/tracking.js',
                        include: ['main'],
                        removeCombined: true,
                        findNestedDependencies: true,
                        preserveLicenseComments: false,
                        wrap: true,
                        optimize: 'uglify2',
                        // optimize: 'none',
                        uglify2: {
                            output: {
                                beautify: false,
                                quote_keys: true,
                                screw_ie8: false,
                                ascii_only: true
                            },
                            compress: {
                                unsafe: true,
                                comparisons: true,
                                cascade: true,
                                collapse_vars: true,
                                reduce_vars: true,
                                warnings: true,
                                loops: true,
                                properties: true,
                                screw_ie8: false,
                                sequences: true,
                                dead_code: true,
                                conditionals: true,
                                booleans: true,
                                unused: true,
                                if_return: true,
                                join_vars: true,
                                drop_console: true,
                                passes: 3
                            },
                            warnings: true,
                            verbose: true,
                            mangle: {
                                screw_ie8: false,
                                toplevel: true,
                                sort: true,
                                eval: true,
                                props: true


                            },
                            ie8: true
                        },
                        generateSourceMaps: false,
                        onModuleBundleComplete: function (data) {
                            var fs = module.require('fs'),
                                amdclean = module.require('amdclean'),
                                outputFile = data.path,
                                cleanedCode = amdclean.clean({
                                    'filePath': outputFile
                                });

                            fs.writeFileSync(outputFile, cleanedCode);
                        }
                    }
                },
            writer: {options: {
                        mainConfigFile: 'x_project_tracking_worker/static/js/writer/require_config.js',
                        baseUrl: 'x_project_tracking_worker/static/js/writer/',
                        out: 'x_project_tracking_worker/static/js/writer.js',
                        include: ['main'],
                        removeCombined: true,
                        findNestedDependencies: true,
                        preserveLicenseComments: false,
                        wrap: true,
                        optimize: 'uglify2',
                        // optimize: 'none',
                        uglify2: {
                            output: {
                                beautify: false,
                                quote_keys: true,
                                screw_ie8: false,
                                ascii_only: true
                            },
                            compress: {
                                unsafe: true,
                                comparisons: true,
                                cascade: true,
                                collapse_vars: true,
                                reduce_vars: true,
                                warnings: true,
                                loops: true,
                                properties: true,
                                screw_ie8: false,
                                sequences: true,
                                dead_code: true,
                                conditionals: true,
                                booleans: true,
                                unused: true,
                                if_return: true,
                                join_vars: true,
                                drop_console: false,
                                passes: 3
                            },
                            warnings: true,
                            verbose: true,
                            mangle: {
                                screw_ie8: false,
                                toplevel: true,
                                sort: true,
                                eval: true,
                                props: true


                            },
                            ie8: true
                        },
                        generateSourceMaps: false,
                        onModuleBundleComplete: function (data) {
                            var fs = module.require('fs'),
                                amdclean = module.require('amdclean'),
                                outputFile = data.path,
                                cleanedCode = amdclean.clean({
                                    'filePath': outputFile
                                });

                            fs.writeFileSync(outputFile, cleanedCode);
                        }
                    }
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.registerTask('default', ['jshint:tracking', 'jshint:writer', 'requirejs:tracking', 'requirejs:writer', 'watch']);
};