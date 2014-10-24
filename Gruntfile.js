module.exports = function(grunt) {
	
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
            all: ["Gruntfile.js", "src/**/*.js"],
            options: {
                jshintrc: true
            }
        },
		clean: {
			build: {
				src: 'dist/<%= pkg.name %>.min.js'
			}
		},
		uglify: {
			options: {
				banner: '/* \n *\t <%= pkg.name %>.<%= pkg.version %>.js \n *\t Created by <%= pkg.author %> \n *\t Since <%= grunt.template.today("yyyy-mm-dd") %> \n */\n'
			},
			build: {
				src: 'src/*.js',
				dest: 'dist/<%= pkg.name %>.min.js'
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('default', ['jshint','clean', 'uglify']);
};