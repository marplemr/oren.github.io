# Keeping the logic out of the UI using presenters

Presenters are a way to remove logic from your UI templates. Instead of doing stuff like - `if(user && user.name){return 'foo'}` inside your template fle, you can encapulate this logic into an object that you pass to your template. Here we'll use [jade](https://github.com/visionmedia/jade), but it can apply to most of the templates out there like [ejs](http://embeddedjs.com/).
## Basic example

`npm install jade`

```js
// index.jade

doctype 5
html(lang="en")
  head
    title crickets are yummy
  body
    h1 yo
    #container
      p #{user.title()} #{user.name()}, You are amazing
```

```js
'use strict';
/*jslint node: true */

var jade = require('jade');

var UserPresenter = function (data) {
    this.data = data;
};

UserPresenter.prototype = {
    name: function() {
        return this.data.name || '';
    },

    title: function() {
        return this.data.title || '';
    }
};

var user = new UserPresenter({ name: 'Josh', title: 'Sir' });
var html = jade.renderFile('index.jade', { user: user });

console.log(html);
```
And here is the output - html with Sir josh inside the p element:
```html
<!DOCTYPE html>

<html lang="en">
  <head><title>crickets are yummy</title></head>
  <body>
    <h1>yo</h1>
	  <div id="container"><p>Sir Josh, You are amazing</p></div>
	</body>
</html>
```

The basic idea is to pass an object to the template. this object have functions that we call within the template like `user.name`

## Example with express.js

```bash
sudo npm install -g express
cd myapp
npm install
mkdir presenters
```
Create a user presenter function:
```js
var Presenter = function (data) {
    this.data = data;
};

Presenter.prototype = {
    name: function() {
        return this.data.name || '';
    },

    title: function() {
        return this.data.title || '';
    }
};

module.exports = Presenter;

```
Replace views/index.js with our version:
```js
doctype 5
html(lang="en")
  head
    title crickets are yummy
  body
    h1 yo
    #container
      p #{user.title()} #{user.name()}, You are amazing
```

Replace routes/index.js:

```js
var UserPresenter = require('../presenters/user.js');

exports.index = function(req, res){
  // in the real world userData should come from a db or a service
  var userData = { name: 'Josh', title: 'Sir' };

  res.render('index', { user: new UserPresenter(userData) });
};
```

And go to [localhost:0.0.0.0:3000](http://localhost:3000)

There are a few more things I wanted to show:

1. Using ECMAScript 5 getters to simplify our templates
1. Using idiomatic Javascript for the presenter object (instead of the new keyword).

But this is already too long so I'll write about those in another post.