## The Substack Pattern - a module should only do one thing

I had a db module with a few functions for getting and saving some stuff from my db.  
I decided to try splitting this file into multiple modules/files and here it is.  
Notice that I inject the db into each of the mobules and notice index.js. This file is responsible to load all the small modules and it exposes the get function for retrieving them.

db/index.js

```js
"use strict";

var fs = require("fs");
var path = require("path");
var files = null;
var modules = {};

// init your database stufF
var levelup = require('levelup')
var db = levelup('./groupsDB', {valueEncoding: 'json'})

// Load all the other "db modules" in the current directory.
files = fs.readdirSync(__dirname);

files.forEach(function (file) {
  var stats = fs.statSync(path.join(__dirname, file));

  if (!stats.isDirectory() && path.extname(file) === ".js" && __filename.indexOf(file) === -1) {
    file = file.replace(path.extname(file), "");
    modules[file] = require('./' + file)(db);
  }
});

exports.get = function (type) {
  return modules[type];
};
```

db/insertGroup.js

```js
"use strict";

var now = null;

module.exports = function (db) {
  return function(name, title, cb){
    now = Date.now();

    db.put('group!' + now, {name: name, title: title, user: null}, function (err) {
      if (err) {return cb(err) };// some kind of I/O error

      cb(null, now)
    });
  };
}
```

db/getAllGroups.js

```js
"use strict";

module.exports = function (db) {
  return function(cb){
    var groups = [];

    function getGroups() {
      // to get a stream of all groups in reverse chronological order
      db.createReadStream({start: 'group!~', end: 'group!', reverse: 'true' })
       .on('data', function (data) {
          groups.push({id: data.key, value: data.value});
        })
        .on('error', function (err) {
          console.log('Oh my!', err)
          cb(err);
        })
        .on('close', function () {
        })
        .on('end', function () {
          cb(null, groups);
        })
    }

    getGroups();

  };
}
```

Let's use it. we will insert a group to our DB and read all the groups:

```js
"use strict";

db = require('./db');

var insert = db.get('insertGroup');
var get = db.get('getAllGroups');

insert('Cat Videos', 'EVERYONE LOVES CATS', function(err, group) {
  if (err) {
    return console.log('error', err);
  }

  get(function(err, groups){
    if (err) {
      console.log('Error', err);
    }

    console.log('groups', groups);
  });
});
```

=>

    groups 

    [ 
      { id: 'group!1366010832126', 
        value: { name: 'Cat Videos', title: 'EVERYONE LOVES CATS', user: null } 
      } 
    ]
