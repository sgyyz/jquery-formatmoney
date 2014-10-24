module.exports = function(grunt) {
	
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		meta: {
            banner: "/*\n" +
            " *  <%= pkg.name %> - v<%= pkg.version %>\n" +
            " *  <%= pkg.description %>\n" +
            " *  <%= pkg.homepage %>\n" +
            " *\n" +
            " *  Made by <%= pkg.author %>\n" +
            " *  Under <%= pkg.license.type %> License (<%= pkg.license.url %>)\n" +
            " */\n"
        },
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
				banner: '<%= meta.banner %>',
				mangle: {
                    except: ["jQuery", "$"]
                }
			},
			build: {
				src: 'src/*.js',
				dest: 'dist/<%= pkg.name %>.min.js'
			}
		},
		watch: {
			files: ['src/*.js']
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['jshint','clean', 'uglify']);
};