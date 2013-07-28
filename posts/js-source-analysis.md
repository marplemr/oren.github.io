# Javascript Source Analysis

It's important to get an idea of the maintainability of your codebase.
I am using a great tool called [plato](https://github.com/jsoverson/plato) that doing exatly that. You run it against your js files and it generate a beautiful website that gives you a visual insight about the health of your project.

First, install it

    npm install plato -g

Now run it and give it your project's Javascript files:

    plato -d report-folder *.js mocks/*.js test/integration/*.js test/unit/*.js lwes/*.js

Here is a snapshot of a project I worked on: 

![project before](http://i.imgur.com/ZDrlLzD.png)

The first thing we can see is the maintainability score: 75.27. The maintainability scale is a number between 0 - 100 where the higher, the better. It is measured based on a few parameters - number of distinct paths in a code, number of operators and operands and logical lines of code. For the exact definition check out [JsComplexity.org](http://jscomplexity.org/complexity).

The orange lines represent each file in my project. The shortest the line the easy it is to maintain it. The shortest line in my project is the router.js file (hover on a line will show you it's name and rank). This file has less than 50 points of maintainability.
The generated webpage let's you click on any file where you can see the code base with each function graded by it's complexity and other metrics.

Here is my router.js file:
![router before](http://i.imgur.com/BvEqlHA.png)

The router function got a complexity score of 11. Complexity is measured by the number of paths your code can take. if-else statement for example will add 1 point. If your function is above 10, it's a good idea to refactor it.

Firest, let's look at the code:

```js
// The server's main routes function
//
// Supports the following end-points:
// POST /push
// POST /register
// POST /register.php
// GET /health
// GET /health.txt

function router(config, req, res) {
  if (req.url == '/push') {
    if(req.method.toLowerCase() == 'post') {
      pusher(config, req, res);
    } else {
      res.statusCode = 405;
      res.end();
    }
  } else if (req.url == '/register') {
    if(req.method.toLowerCase() == 'post') {
      register(config, req, res);
    } else {
      res.statusCode = 405;
      res.end();
    }
  } else if (req.url == '/register.php') {
    if(req.method.toLowerCase() == 'post') {
      registerLegacy(config, req, res);
    } else {
      res.statusCode = 405;
      res.end();
    }
  } else if (req.url == '/health') {
    if(req.method.toLowerCase() == 'get') {
      info = health(req.connections);
      res.end(JSON.stringify(info));
    } else {
      res.statusCode = 405;
      res.end();
    }
  } else if (req.url == '/health.txt') {
    if(req.method.toLowerCase() == 'get') {
      checkHealth(req, res);
    } else {
      res.statusCode = 405;
      res.end();
    }
  } else {
    res.statusCode = 404;
    res.end();
  };
};
```

This function have many if-else statements that each can be extracted into it's own function. Let's extract 5 small functions to make it smaller and readable:

```js
function router(config, req, res) {
  if (req.url == '/push') { 
    pushRoute();
  } else if (req.url == '/register') { 
    registerRoute();
  } else if (req.url == '/register.php') { 
    registerPhpRoute();
  } else if (req.url == '/health') { 
    healthRoute();
  } else if (req.url == '/health.txt') { 
    healthTxtRoute();
  } else {
    res.statusCode = 404;
    res.end();
  }

  function pushRoute() {
    if(req.method.toLowerCase() == 'post') {
      pusher(config,  req, res);
    } else {
      res.statusCode = 405;
      res.end();
    }
  }

  function registerRoute() {
    if(req.method.toLowerCase() == 'post') {
      register(config, req, res);
    } else {
      res.statusCode = 405;
      res.end();
    }
  }

  function registerPhpRoute() {
    if(req.method.toLowerCase() == 'post') {
      registerLegacy(config, req, res);
    } else {
      res.statusCode = 405;
      res.end();
    }
  }

  function healthRoute() {
    if(req.method.toLowerCase() == 'get') {
      info = health(req.connections);
      res.end(JSON.stringify(info));
    } else {
      res.statusCode = 405;
      res.end();
    }
  }

  function healthTxtRoute() {
    if(req.method.toLowerCase() == 'get') {
      checkHealth(req, res);
    } else {
      res.statusCode = 405;
      res.end();
    }
  }
}
```

**Note**: I am nesting the small functions instead of locating them outside of the router function so I can avoid passing the arguments to each one. Don't you agree that Javascript clojures are awesome?!

Let's generate the report again:

    plato -d report-folder *.js mocks/*.js test/integration/*.js test/unit/*.js lwes/*.js

![project after](http://i.imgur.com/Z8EVEGj.png)

Nice! our project maintainabily score is higher now and the router.js file is ranked above 50.  
Let's drill down to the file-level report:

![router after](http://i.imgur.com/ALoAGbi.png)

After this refactor the complexity of the router function was reduced from 11 to 6, and each of the small function have a complexity of 2 (hover on the blue circle will show that). 

In addition to complexity report, this tool also use [JSHint](http://www.jshint.com/about) which helps in ensuring you use good practices of the Javascript language.

Now you can automate it by adding it to your make file and running it with `make report`

<pre>
    report: 
      plato -d report-folder *.js mocks/*.js test/integration/*.js test/unit/*.js lwes/*.js
</pre>

The last step can be to add it to your Continuous Integration server.
