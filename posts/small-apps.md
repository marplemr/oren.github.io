* Dependency Injection
* Callbacks
* Event emitter

Dependency Injection

```js
ping = require('./ping.js);
mailer = require('./mailer.js');

ping(['bar.com', 'foo.com'], mailer);
```

Using a callback

```js
ping = require('./ping.js);
mailer = require('./mailer.js');

ping(['bar.com', 'foo.com'], function(data) {
  mailer('server is down', data); 
};
```

Using an event emitter

```js
pinger = require('./pinger.js');
mailer = require('./mailer.js');

pinger.start(['bar.com', 'foo.com']);

pinger.on('status', function(data) {
  console.log('status event', data);
});

pinger.on('siteUp', function(data) {
  console.log('siteUp event', data);
});

pinger.on('siteDown', function(data) {
  mailer(data); 
});
```
