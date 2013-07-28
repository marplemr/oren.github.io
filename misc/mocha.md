## Mocha

    var assert = require("assert")
    describe('Array', function(){
      describe('#indexOf()', function(){
        it('should return -1 when the value is not present', function(){
          assert.equal(-1, [1,2,3].indexOf(5));
          assert.equal(-1, [1,2,3].indexOf(0));
        })
      })

      describe('#length()', function(){
        it('should return 3 when the value is not present', function(){
          assert.equal(3, [1,2,3].length);
        })
      })
    })

install mocha (globally)

    npm install mocha -g

    mocha





    ./node_modules/.bin/mocha --reporter nyan --ui bdd

     20  -_-_-_-_-_-_-_-_-_-_-_,------,
     0   -_-_-_-_-_-_-_-_-_-_-_|   /\_/\ 
     0   -_-_-_-_-_-_-_-_-_-_-^|__( ^ .^) 
         -_-_-_-_-_-_-_-_-_-_-  ""  "" 

      ✔ 20 tests complete (319 ms)
