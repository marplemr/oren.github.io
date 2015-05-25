## Control Flow library - when is the right time to use one?

![cat](http://gifs.gifbin.com/012010/1264355701_cat.gif)

I like to minimize the usage of abstractions in my node code. Whether it's web frameworks or testing framework or control flow libraries.  
I just wrote a little module that is part of an rss reader I am working on. All it's doing is inserting urls to my DB based on some simple logic.  
Here are two versions of this moudule. One with [async](https://github.com/caolan/async#parallel) (control flow library) and the other one without it.

This part is sharor both versions:

```js

// add articles to unread set if they don't exist
//
// arguments: site is url for xml feed, articles is array of urls
// returns: callbackunread with array of unread articles
//
// usage:
/
With async

```js
module.exports = function(site, articles, cb) {
  function add(url, cb) {
    client.sismember(site + ':read', url, function (err, articleFound) {
      if (err) { return cb(err); }
      if (articleFound) {
        return cb(); 
      } else {
        // insert to unread set
        client.sadd(site + ':unread', url, function (err, value) {
          if (err) { return cb(err); }
          return cb(); 
        });
      }
    });
  }

  async.each(articles, add, function(err) {
    if (err) { return cb(err); }

    client.smembers(site + ':unread', function (err, unread) {
      if (err) { return cb(err); }
      return cb(null, unread); 
    });
  });
}
```

Without async

```js
var numOfArticles = 0;
var lastArticle = false;

module.exports = function(site, articles, cb) {
  numOfArticles = articles.length;

  articles.forEach(function(url, index) {
    lastArticle = ((index + 1) === numOfArticles);

    // without this function lastArticle will be true since sismember is async and executed
    // later on. by creating a closure we keep lastArticle's correct value.
    // http://book.mixu.net/ch4.html - example 2 and 4
    (function(lastArticle) {
      client.sismember(site + ':read', url, function (err, articleFound) {
        if (err) { return cb(err); }
        if (articleFound) {
          if (lastArticle) {
            client.smembers(site + ':unread', function (err, unread) {
              if (err) { return cb(err); }
              return cb(null, unread); 
            });
          }
        } else {
          // insert to unread set
          client.sadd(site + ':unread', url, function (err, value) {
            if (err) { return cb(err); }
            client.smembers(site + ':unread', function (err, unread) {
              if (err) { return cb(err); }
              if (lastArticle) {
                return cb(null, unread); 
              }
            });
          });
        }
      });})(lastArticle);
  });  
}
```


Which version do you prefer?

It's clear that async let's you write less code, but it require you to read async's documentation so you can understand how it works. For example, you need to know that .each is executed in parallel and that the last argument to .each will be called after all the elements of the array were called etc.  
The non async version require 2 extra variables that are used to determine if we are at the end of the array. in addition we have to wrap our asyn call in a function and pass lastArticle into that function so it's value will be maintain inside the function.  All that is hidden from us in the async verision.

I am not sure which one I like, but I think it's improtant to understand both.
