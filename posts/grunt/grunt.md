![grunt](http://a2.ec-images.myspacecdn.com/images02/56/4931bf18944e44d4b4908fdb0decebac/l.jpg)


## What is Grunt?
Grunt is a build tool for JavaScript projects. It automate all the annoying tasks so you don't have to think about them.
a few common examples are linting, assets minification, compiling stuff (coffeescript, stylus, etc) and running your tests on code change.  
It's open source and available on github. [This](http://gruntjs.com/) is Grunt's website.

In this blog post I want to show you how to install it and  how to automate a few common tasks.  
Hopefully it will convince you to drop everything you are doing and you'll find yourself adding grunt to your current project.

*note - your can get the complete code sample [here](https://github.com/oren/oren.github.com/tree/master/posts/grunt).*

## Installing Grunt
Grunt is available as an npm module. npm is the package manager for node.js, so you'll need to install node first.  
Go get it [here](http://nodejs.org/) and come back. I am waiting.

Now that you have node, you can use npm to install all kind of fun packages. grunt is one of them: 

<pre class="nocode">
npm install grunt -g
</pre>

The above command will install grunt globally (that's the reason for the -g) - it will be available for use in all of your projects. Once grunt has been installed, you can type grunt --help at the command line for more information. 

## Lint, concatenate and minimize our JavaScript files
JavaScript is a wild language. you can twist and bend it to your needs but you can easily shoot yourself in the foot.  
Javascript Lint is a tool that checks for common mistake in your codebase. it will be nice to use lint and get errors from all the Javascript files in my project. In addition for lintinting, I want to concatenate the JavaScript files into a single file, and minimize that file.  

create a new folder for your project and add the following structure:

<pre class="nocode">
    └── public
        ├── css
        ├── js
        │   └── app.js
        └── styles
            └── app.styl
</pre>

app.js and app.styl can remain empty. you can also use [my code](https://github.com/oren/oren.github.com/tree/master/posts/grunt).

create `grunt.js` in the root dir of your project. this is grunt's config file.

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

let's see what happend when you run `grunt`

<pre class="nocode">
grunt

Running "lint:files" (lint) task
Lint free.

Running "stylus:compile" (stylus) task
File public/css/site.css created.

Running "cssmin:dist" (cssmin) task
File 'public/css/production.css' created.
Uncompressed size: 20097 bytes.
Compressed size: 3270 bytes gzipped (13445 bytes minified).

Running "concat:dist" (concat) task
File "public/js/production.js" created.

Running "min:dist" (min) task
File "public/js/production.min.js" created.
Uncompressed size: 14717 bytes.
Compressed size: 6257 bytes gzipped (14281 bytes minified).

Done, without errors.
</span>
</pre>

That's it. all the tasks that are defined in grunt.registerTask will run - lint, concat and min.  
notice that lint, concat and min are all tasks that comes built-in with grunt. There are additional tasks that are not part of the core grunt but avaialable as well. we will look at some of them in the next section.

Now that we got a basic flow working, let's add a few more things.

## Compiling stylus files into css

I like [stylus](http://learnboost.github.com/stylus/). You write very clean css-like files that compile into css.  
Let's add a grunt task that do just that. I want to type `grunt stylus` and all my .style files will compile into .css files.  
add the following to grunt.js:

    stylus: {
      compile : {
        files : {
          'public/css/site.css' : 'public/styles/*.styl'
        }
      }
    },

if you'll try running it with `grunt stylus` you'll see this warning:

<pre class="nocode">
Warning - Task "stylus" not found. Use --force to continue.
Aborted due to warnings.
</pre>

what happend? oh, stylus task does not come with grunt. we'll have to add it ourself.

<pre class="nocode">
npm install grunt-contrib --save-dev
</pre>

and add this line before the last line of grunt.js:

    grunt.loadNpmTasks('grunt-contrib');

and add app.styl file inside public/styles

run `grunt stylus` and hopefully everything is ok now.

now add it to registerTask: 

    grunt.registerTask('default', 'lint stylus concat min');

and run all of them with `grunt`

## Minimize css files

great. now let's add a grunt task to minimize all our css files into one file that will be used in production environment.  
start by adding this key to the grunt.js file:
    
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

cssmin is part of the grunt-css package. install it with npm:

<pre class="nocode">
npm install grunt-css --save-dev
</pre>

and add this line right next to the other loadNpmTasks line:

    grunt.loadNpmTasks('grunt-css');                                 

and run it with `grunt cssmin`.  
if all is good, add it to registerTask line and run `grunt`

    grunt.registerTask('default', 'lint stylus concat cssmin min');  

## Watch for file changes and do stuff

if everything is working so far, let's add one more thing. grunt can watch for file changes and run whatever tasks we want.  
let's run the lint task whenever we change our JavaScript files and the stylus task when we modify our stylus files:

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

now run:

    grunt watch

and edit app.js or app.styl files and notice the watch doing it's job.  

## Summary

Well done, you know how grunt work, how to add tasks to grunt and how to watch for file changes.  
Now go ahead and start using it!
