## Jam.js

what's Jam.js?  
the most popular package manager for JavaScript.  
Similar to rubygems for ruby or npm for node, Jam helps you maintain the  
different libraries you use - jquery, underscore, backbone, angular etc...

    npm install jam -g

    jam install jquery
    jam install angularjs
    jam search angular
    jam ls
    jam upgrade jquery
    jam remove jquery
    jam compile production.js


let's create a simple html page that uses jquery and angular.js
i'll start with a simple skeleton

    <!DOCTYPE html>
      <head>
      </head>

      <body>
        <p>hello</p>  
      </body>
    </html>

now let's add jquery and angular:

    <!DOCTYPE html>
      <head>
        <script src="jam/require.js"></script>
        <script>
          require(['jquery', 'angularjs'], function ($) {
            $(document.body).text('Hello, world!');
          });
        </script>
      </head>

      <body>
        <p>hello</p>  
      </body>
    </html>

we can also use a config file that define all our libraries.  
`jam install` will install the libraries under the jam key.

    {
      "name": "test-jam",
      "version": "0.0.0",
      "description": "ERROR: No README.md file found!",
      "main": "index.js",
      "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
      },
      "repository": "",
      "author": "",
      "license": "BSD",
      "jam": {
        "dependencies": {
          "jquery": "1.8.0",
          "angularjs": "1.0.2" 
        }
      }
    }

