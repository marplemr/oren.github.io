## Control Flow in Node.js

Recent discussion on the Node.js Google Group inspired me to write [another](control-flow.md) post about control flow in node.
Let's look at two ways to write parallel async functions. One with simple callbacks and the other with a popular control flow library ,[ async](https://github.com/caolan/async#parallel).

Parallel functions using simple Javascript callbacks

```js
// index.js

function makeParallelAsyncCalls(cb) {
  var num1, num2, num3;
  var i = 0;  // counter of callbacks

  foo1(function(er, n) {
    num1 = n;
    done(er);
  });

  foo2(function(er, n) {
    num2 = n;
    done(er);
  });

  foo3(function(er, n) {
    num3 = n;
    done(er);
  });

  function done (er) {
    if (er) {return cb(er);}

    i = i + 1;
    if (i === 3) {
      cb(null, (num1 + num2) / num3);  // (1+2)/3
    };
  }
} 

function foo1(cb) {
  setTimeout(function() {
    cb(null, 1);
  }, 100);
}

function foo2(cb) {
  setTimeout(function() {
    cb(null, 2);
  }, 100);
}

function foo3(cb) {
  setTimeout(function() {
    cb(null, 3);
  }, 100);
}

// call a few async functions and do something with the result
makeParallelAsyncCalls(function(err, result) {
  if (err) {
    console.error(err);
    return;
  };

  console.log('result', result);  // => 3
});
```

Run it with `node index.js` and notice the output: 3  
We use i to count the number of callbacks that were called.

Now let's see how it with the async library

```js
// index.js

var async = require('async');

function makeParallelAsyncCalls(cb) {
  async.parallel([
    function (cb) {
      foo1(function(er, n) {
        cb(er, n);
      });
    },
    function (cb) {
      foo2(function(er, n) {
        cb(er, n);
      });
    },
    function (cb) {
      foo3(function(er, n) {
        cb(er, n);
      });
    }
  ], function(err, results) {
      if(err) throw err;

      // Your results will now be an array of [num1, num2, num3]
      var temp = (results[0] + results[1]) / results[2];  // (1+2)/3
      console.log(temp);
    }
  );
}

function foo1(cb) {
  setTimeout(function() {
    cb(null, 1);
  }, 100);
}

function foo2(cb) {
  setTimeout(function() {
    cb('boom', 2);
  }, 100);
}

function foo3(cb) {
  setTimeout(function() {
    cb(null, 3);
  }, 100);
}I 

// call a few async functions and do something with the result
makeParallelAsyncCalls(function(err, result) {
  if (err) {
    console.error(err);
    return;
  };

  console.log('result', result);  // => 3
});
```

run it with `node index.js` and notice the same output as before: 3

So far I like the first approach better since it's just javascript, and I didn't see the need (yet) to use an external libary for control flow.