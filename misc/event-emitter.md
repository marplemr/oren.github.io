// var emitter = new require('events').EventEmitter();
    var EventEmitter = require('events').EventEmitter; 
    var emitter = new EventEmitter();

    // the listener is the console.log function
    emitter.on('foo', function(){ 
      console.log(arguments); 
      }); 

    emitter.emit('foo', 1, 2, 3, 4); 
