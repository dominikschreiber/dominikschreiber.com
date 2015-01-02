module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		less: {
			productive: {
				options: {
					paths: ['src/css'],
					cleancss: true,
					compress: true,
					report: 'min'
				},
				files: {
					'target/css/ds.min.css': 'src/css/ds.less'
				}
			}
		},
		concat: {
			dist: {
				src: ['src/js/*.js'],
				dest: 'target/js/ds.min.js'
			}
		},
		uglify: {
			dist: {
				files: {
					'target/js/ds.min.js': [ '<%= concat.dist.dest %>' ]
				}
			}
		},
		jshint: {
			files: ['gruntfile.js', 'src/js/*.js'],
			options: {
				laxcomma: true,
				nonew: true,
				quotmark: 'single',
				smarttabs: true,
				globals: {
					jQuery: true
				}
			}
		},
		copy: {
			img: {
				files: [ 
					{expand: true, cwd: 'src/img/', src: '*', dest: 'target/img', flatten: true, filter: 'isFile'},
					{expand: true, cwd: 'src/img/', src: '*', dest: 'img', flatten: true, filter: 'isFile'}
				]
			},
			html: {
				files: [
					{src: 'src/index.html', dest: 'target/index.html'}
				]
			}
		},
		smoosher: {
			all: {
				files: {
					'index.html': 'target/index.html'
				}
			}
		},
		watch: {
			html: {
				files: ['src/**/*.html'],
				tasks: ['copy:html', 'smoosher']
			},
			img: {
				files: ['src/img/*'],
				tasks: ['copy:img', 'smoosher']
			},
			js: {
				files: ['<%= jshint.files %>'],
				tasks: ['jshint', 'concat', 'uglify', 'copy:html', 'smoosher']
			},
			less: {
				files: ['target/css/ds.min.css'],
				tasks: ['less', 'copy:html', 'smoosher']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-html-smoosher');
	grunt.loadNpmTasks('grunt-contrib-copy');

	grunt.registerTask('default', ['jshint', 'less', 'concat', 'uglify', 'copy', 'smoosher']);
};