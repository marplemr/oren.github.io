## Grunt in 20 seconds

Lets't start from the end - let's see a real example of grunt.  
I'll show you how in 20 seconds you'll be able to run `grunt stylus` to convert my main.styl file to main.css. Even that's not what you care about, it will give you a starting point, where you can remove it or extend this example with your own stuff (minify js, linting, tests, etc).

Install everything you'll need to run this example. Don't worry about the details.

    npm install -g grunt-cli
    npm install grunt grunt-contrib-stylus stylus --save-dev

Copy paste this file - Gruntfile.js

```js
module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    stylus: {
      compile: {
        files: {
          'main.css': ['main.styl'] // compile and concat into single file
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-stylus');

};
```

Copy paste this file - main.styl

```css
body, html
  height 100%
  margin 0
  padding 0
  line-height 1.9em
```

Run `grunt stylus`  
A file named main.css was created. Good job. now move on and read the rest of the guide so you'll actually understand what you just did!

http://gruntjs.com/getting-started
