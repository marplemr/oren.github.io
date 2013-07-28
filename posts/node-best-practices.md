* Style Guide - http://nodeguide.com/style.html
* Avoid frameworks/abstractions ([web](http://expressjs.com/), [test](http://visionmedia.github.com/mocha/), [control flow](https://github.com/caolan/async)) untill you feel a pain
* "use strict" at the top of every js file
* Process monitoring - I like Mon and Mongroup
* Use /health end-point that shows json of uptime, memory etc
* Single entry point for dependencies and using Mocks during unit tests
* App should be able to run as a command line app. app = require('./app')
* Separate app initialization from app execution. app.init(); app.start()
* Tests should be easy to run - `make test-unit`, `make test-integration` or directly - `node my_test.js`
* Use Callbacks when you want to know if something has finished. app.init(doneInit); app.start(readyToServe);
* Use Event Emitter when you want to notify someone multiple times or when you have many listeners
