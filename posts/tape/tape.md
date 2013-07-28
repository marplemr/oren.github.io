## Client and Server tests looks the same with the Tape and Browserify

![tape](https://a248.e.akamai.net/camo.github.com/50dd49050de38c87a28ab6aa0b09bbe2d042cba1/687474703a2f2f737562737461636b2e6e65742f696d616765732f746170655f64726976652e706e67)

I like [tape](https://github.com/substack/tape), substack's module for testing both the client and the server.
In this post I would like to demonstrate how to apply tape for client-side javascript.  
tape isn't a framework. you just run a file that does require('tape') with node and tape writes its output to stdout whereas something like mocha or jasmine pukes a bunch of globals into your test file's namespace so that your tests will only run with the test framework's custom harness bin script.

Let's say we have the following 3 files:

    <!--index.html-->

    <!DOCTYPE html>
    <html lang="en">
      <head>
      </head>
      <body>
        <p>CommonJS in the browser!</p>

        <script src="app.min.js"></script>
      </body>
    </html>

```js
// app.js

var saveUser = require('./saveUser.js');
saveUser({name: 'rose'});
```

```js
// saveUser.js

module.exports = function(user, cb) {
  // save user in our DB. in the real scenario this will be an async call to an http endpoint
  setTimeout(function() {
    console.log('user ' + user.name + ' was saved in the db');
    cb && cb(200);                                                                                                     
  });
};
```

If we want this code to run we need to use browserify. Read about it [here](https://github.com/oren/oren.github.com/blob/master/posts/browserify/browserify.md) if you don't know what browserify is.
install it - `npm install browserify -g` and run `browserify app.js > app.min.js`


Great, and now let's see how we can use tape to test our saveUser.js.  
Create a folder called test and add this file:


```js
// test-saveUser.js

var test = require('tape');

var saveUser = require('../saveUser.js');

test('save user', function (t) {
  t.plan(1);  // you have to declare how many assertions are in your test

  saveUser({name: 'joe'}, function(result){
    t.equal(result, 200);  // using the === operator
  });
});
```

To run our test we need to install tape - `npm install tape`.  
We run our test with `node test/test-saveUser.js` and should see output similar to  this:

    # save user
    ok 1 should be equal

    1..1
    # tests 1
    # pass  1

The code sample of everything we did can be found [here](https://github.com/oren/oren.github.com/tree/master/posts/tape/website).
