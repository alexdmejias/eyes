"use strict";

module.exports = function(grunt) {
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	grunt.initConfig({

		watch: {
			options: {
				livereload: true
			},

			html: {
				files: ['index.html']
			},

			js: {
				files: ['./js/**/*.js', '!./js/app.bundle.js'],
				tasks: ['browserify:watch']
			}
		},

		connect: {
			server: {
				options: {
					hostname: 'localhost',
	        base: './',
					sourceMap: true,
					livereload: true,
					open: {
						target: 'http://localhost:8000/'
					}
				}
			}
		},

		browserify: {
			options: {
				alias:             {
					'utils': './js/modules/utils.js',
					'V':     './js/modules/p5Vectors.js'
				},
				browserifyOptions: {
					debug: true
				},
			},
			init: {
				files: [{
	      	expand: true,
					cwd: './js/',
					src: ['app.js'],
					ext: '.bundle.js',
					rename: function(dest, src) {
						return './js/' + src;
					}
		    }]
			},

			watch: {
				files: [{
					expand: true,
					cwd: './js/',
					src: ['app.js'],
					ext: '.bundle.js',
					rename: function(dest, src) {
						return './js/' + src;
					}
				}]
			}
		}
	});

	grunt.registerTask('default', ['browserify:init', 'connect', 'watch']);
};
