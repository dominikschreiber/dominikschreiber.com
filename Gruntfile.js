module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);
    
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
        
        dir: {
            src: './src',
            target: '.'
        },
        
        clean: {
            less: ['<%= dir.target %>/css'],
            js: ['<%= dir.target %>/js'],
            img: ['<%= dir.target %>/img']
        },
        
		less: {
			productive: {
				options: {
					paths: ['<%= dir.src %>/css'],
					cleancss: true,
					compress: true,
					report: 'min'
				},
				files: {
					'<%= dir.target %>/css/ds.min.css': '<%= dir.src %>/css/ds.less'
				}
			}
		},
        
		concat: {
			dist: {
				src: ['<%= dir.src %>/js/*.js'],
				dest: '<%= dir.target %>/js/ds.min.js'
			}
		},
        
		uglify: {
			dist: {
				files: {
					'<%= dir.target %>/js/ds.min.js': [ '<%= concat.dist.dest %>' ]
				}
			}
		},
        
		jshint: {
			files: ['Gruntfile.js', '<%= dir.src %>/js/*.js'],
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
					{expand: true, cwd: '<%= dir.src %>/img/', src: '*', dest: '<%= dir.target %>/img', flatten: true, filter: 'isFile'},
					{expand: true, cwd: '<%= dir.src %>/img/', src: '*', dest: 'img', flatten: true, filter: 'isFile'}
				]
			},
			html: {
				files: [
					{src: '<%= dir.src %>/index.html', dest: '<%= dir.target %>/index.html'}
				]
			}
		},
        
		smoosher: {
			all: {
				files: {
					'index.html': '<%= dir.target %>/index.html'
				}
			}
		},
        
		watch: {
			html: {
				files: ['<%= dir.src %>/**/*.html'],
				tasks: ['copy:html', 'smoosher']
			},
			img: {
				files: ['<%= dir.src %>/img/*'],
				tasks: ['copy:img', 'smoosher']
			},
			js: {
				files: ['<%= jshint.files %>'],
				tasks: ['jshint', 'concat', 'uglify', 'copy:html', 'smoosher']
			},
			less: {
				files: ['<%= dir.target %>/css/ds.min.css'],
				tasks: ['less', 'copy:html', 'smoosher']
			}
		}
	});

	grunt.registerTask('default', ['clean', 'jshint', 'less', 'concat', 'uglify', 'copy', 'smoosher']);
};