![cat](http://2.bp.blogspot.com/_SKElCv5NTzM/S7FhgagFjGI/AAAAAAAAAD8/9r15ywR169c/s1600/chase.jpg)

How to bencmark your Node app or Javascript code?  
I like to keep it simple and use [Date.getTime()](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/getTime)

    var start = new Date().getTime(); // 1359845872815

    setTimeout(function() {
      console.log('Time in milliseconds', new Date().getTime() - start);
    }, 1000);

    // Time in milliseconds 1018


A cleaner alternative is [console.time()](https://developer.mozilla.org/en-US/docs/DOM/console.time) and [console.timeEnd()](https://developer.mozilla.org/en-US/docs/DOM/console.timeEnd)  
Those 2 function exist exactly for the purpose of benchmark your code:

    var start = console.time('foo');

    setTimeout(function() {
      console.timeEnd('foo');
    }, 1000);

    // foo: 1006ms

