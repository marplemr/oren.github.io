## Creating table-like structure in LevelDB with sublevel

![mario-sublevel](http://static.gamesradar.com/images/mb/GamesRadar/us/Features/2008/04/Lost%20Levels/ART/Finished/Underground1--article_image.jpg)

### TLDR

[level-sublevel](https://github.com/dominictarr/level-sublevel) is an npm package that makes it easy to interact with levelup API by creating table-like structure to your keys.

### Now for the details

This post assumes you heard and maybe even played with [LevelDB](http://code.google.com/p/leveldb/) - fast, embedded key-value database. If you havn't - read my LevelDB introduction [blog post](./leveldb.md).

In this post I'll show you a small piece of code that saves some keys to LevelDB. First I'll use LevelUP without any additional packages and than I'll write the same code but with the help of level-sublevel.

If All your application requires is storing key-values, you might never need to use any additional npm packages besides [levelup](https://github.com/rvagg/node-levelup). But if your app have different types of data (as I am about to show you), there is a nice package called [level-sublevel](https://github.com/dominictarr/level-sublevel) that you should be aware of.

### Example without level-sublevel

Let's take a look at my google groups-like website. I have 3 types of stuff I am saving - groups, topics and replies. Let's see how my code looks like without any additional packages:

    npm install levelup

```js

"use strict";

var levelup = require('levelup')
var db = levelup('./myDB', {valueEncoding: 'json'})

var timeGroup1 = Date.now();
var timeGroup2 = Date.now() + 1;  // Date.now might return the same date so + 1 will make sure our keys are unique. 
var timeTopic1 = Date.now() + 2;  // a better approach is to use the monotonic-timestamp package
var timeTopic1 = Date.now() + 2;
var timeTopic2 = Date.now() + 3;
var timeReply1 = Date.now() + 4;
var timeReply2 = Date.now() + 5;

// add cat group
db.put('group!' + timeGroup1, {name: 'cats', user: 'josh@gmail.com'}, function (err) {
  if (err) return console.log('Ooops!', err) // some kind of I/O error
  // add cooking group
  db.put('group!' + timeGroup2, {name: 'cooking', user: 'dan@gmail.com'}, function (err) {
    if (err) return console.log('Ooops!', err) // some kind of I/O error
    // add topic to cat group
    db.put('topic!' + timeGroup1 + '!' + timeTopic1, {user: 'josh@gmail.com', title: 'cat jumping into tv'}, function (err) {
      if (err) return console.log('Ooops!', err) // some kind of I/O error
      // add topic to cat group
      db.put('topic!' + timeGroup1 + '!' + timeTopic2, {user: 'jordan@gmail.com', title: 'sleepy cat'}, function (err) {
        if (err) return console.log('Ooops!', err) // some kind of I/O error
        // add reply to topic
        db.put('reply!' + timeTopic1 + '!' + timeReply1, {user: 'vera@gmail.com', content: 'OMG. so cute!'}, function (err) {
          if (err) return console.log('Ooops!', err) // some kind of I/O error
          // add reply to topic
          db.put('reply!' + timeTopic1 + '!' + timeReply2, {user: 'misha@gmail.com', content: 'LOL i totaly want one too'}, function (err) {
            if (err) return console.log('Ooops!', err) // some kind of I/O error
            getGroups();
          });
        });
      });
    });
  });
});

function getGroups() {
  // to get a stream of all groups in reverse chronological order
  db.createReadStream({start: 'group!~', end: 'group!', reverse: 'true' })
   .on('data', function (data) {
      console.log('group:');
      console.log(data.key, '=', data.value)
    })
    .on('end', function () {
      getTopics('topic!' + timeGroup1);
    })
}

function getTopics(group) {
  // to get a stream of all topics of a group in reverse chronological order
  db.createReadStream({start: group + '!~', end: group + '!', reverse: true })
   .on('data', function (data) {
      console.log('topic:');
      console.log(data.key, '=', data.value)
    })
    .on('end', function () {
      getReplies('reply!' + timeTopic1);
    })
}

function getReplies(topic) {
  // to get a stream of all replies in a topic in reverse chronological order
  db.createReadStream({start: topic + '!~', end: topic + '!', reverse: true })
   .on('data', function (data) {
      console.log('reply:');
      console.log(data.key, '=', data.value)
    })
}

```

`node index.js` will output something similar to this:

    group!1367198966756 = { name: 'cooking', user: 'dan@gmail.com' }
    group!1367198966755 = { name: 'cats', user: 'josh@gmail.com' }

    topic!1367198966755!1367198966758 = { user: 'jordan@gmail.com', title: 'sleepy cat' }
    topic!1367198966755!1367198966757 = { user: 'josh@gmail.com', title: 'cat jumping into tv' }

    reply!1367198966757!1367198966760 = { user: 'misha@gmail.com', content: 'LOL i totaly want one too' }
    reply!1367198966757!1367198966759 = { user: 'vera@gmail.com', content: 'OMG. so cute!' }

Notice that I had to namespace my keys - for example, every keys that holds a group is prefixed with group!

### Example with the addition of level-sublevel

Now, let's see how it looks like with level-sublevel:

    npm install levelup level-sublevel

```js
// index.js

"use strict";

var LevelUp = require('levelup');
var Sublevel = require('level-sublevel');

var db = Sublevel(LevelUp('./myDB', {valueEncoding: 'json'}));
var groups =  db.sublevel('groups');        // groups is similar to a table or a bucket. 
                                            // we'll use groups instead of db anytime we need to read or save a group
var topics =  db.sublevel('topics');        // topics is another 'table'
var replies =  db.sublevel('replies');      // replies is another 'table'

var timeGroup1 = Date.now();
var timeGroup2 = Date.now() + 1;  // Date.now might return the same date so + 1 will make sure our keys are unique. 
var timeTopic1 = Date.now() + 2;  // a better approach is to use the monotonic-timestamp package
var timeTopic2 = Date.now() + 3;
var timeReply1 = Date.now() + 4;
var timeReply2 = Date.now() + 5;

// add cat group
groups.put(timeGroup1, {name: 'cats', user: 'josh@gmail.com'}, function (err) {
  if (err) return console.log('Ooops!', err) // some kind of I/O error
  // add cooking group
  groups.put(timeGroup2, {name: 'cooking', user: 'dan@gmail.com'}, function (err) {
    if (err) return console.log('Ooops!', err) // some kind of I/O error
    // add topic to cat group
    topics.put(timeGroup1 + '!' + timeTopic1, {user: 'josh@gmail.com', title: 'cat jumping into tv'}, function (err) {
      if (err) return console.log('Ooops!', err) // some kind of I/O error
      // add topic to cat group
      topics.put(timeGroup1 + '!' + timeTopic2, {user: 'jordan@gmail.com', title: 'sleepy cat'}, function (err) {
        if (err) return console.log('Ooops!', err) // some kind of I/O error
        // add reply to topic
        replies.put(timeTopic1 + '!' + timeReply1, {user: 'vera@gmail.com', content: 'OMG. so cute!'}, function (err) {
          if (err) return console.log('Ooops!', err) // some kind of I/O error
          // add reply to topic
          replies.put(timeTopic1 + '!' + timeReply2, {user: 'misha@gmail.com', content: 'LOL i totaly want one too'}, function (err) {
            if (err) return console.log('Ooops!', err) // some kind of I/O error
            getGroups();
          });
        });
      });
    });
  });
});

function getGroups() {
  // to get a stream of all groups in reverse chronological order
  groups.createReadStream({start: timeGroup1, end: 0, reverse: 'true' })
   .on('data', function (data) {
      console.log('group:');
      console.log(data.key, '=', data.value)
    })
    .on('end', function () {
      getTopics(timeGroup1);
    })
}

function getTopics(group) {
  // to get a stream of all topics of a group in reverse chronological order
  topics.createReadStream({start: group + '!~', end: group, reverse: true })
   .on('data', function (data) {
      console.log('topic:');
      console.log(data.key, '=', data.value)
    })
    .on('end', function () {
      getReplies(timeTopic1);
    })
}

function getReplies(topic) {
  // to get a stream of all replies in a topic in reverse chronological order
  replies.createReadStream({start: topic + '!~', end: topic, reverse: true })
   .on('data', function (data) {
      console.log('reply:');
      console.log(data.key, '=', data.value)
    })
}
```

Runnning it with `node index.js` will output

    1367204554026 = { name: 'cooking', user: 'dan@gmail.com' }
    1367204554025 = { name: 'cats', user: 'josh@gmail.com' }

    1367204554025!1367204554028 = { user: 'jordan@gmail.com', title: 'sleepy cat' }
    1367204554025!1367204554027 = { user: 'josh@gmail.com', title: 'cat jumping into tv' }

    1367204554027!1367204554030 = { user: 'misha@gmail.com', content: 'LOL i totaly want one too' }
    1367204554027!1367204554029 = { user: 'vera@gmail.com', content: 'OMG. so cute!' }

Notice the following:  

* We created 3 'tables' - groups, topics and replies. Now we can use group.put, groups.createReadStream and every other function that we previously used on the db object.
* We don't need to namespace all the keys like we did in the first example. So instead of  `db.put('group!' + timeGroup1, {})` ....  we can do `groups.put(timeGroup1, {})`

That's great, but what exactly happends in this line?  `var groups =  db.sublevel('groups');`   
It gives you a levelup interface that you can use as if it were you original db object but entries are all restricted to the '\xffgroups\xff' prefix. so  puts, deletes, gets, readstream are all available to your 'sub' objects.


