## Cron jobs made easy with Node

![schedule](http://milwaukeegayvolleyball.com/wp-content/uploads/2009/11/schedule.gif)

Recently I had to built a job that runs every 10 minutes and exactly on the minute - 8:00, 8:10, 8:20 etc until the end of times.  
Instead of reaching to unix [cron jobs](http://www.cyberciti.biz/faq/how-do-i-add-jobs-to-cron-under-linux-or-unix-oses/) I wanted to explore what packages are out there in the Node land that can help me. I was pleasantly surprised by a packages called [node-cron](https://github.com/ncb000gt/node-cron) and want to share it with the world. Let's just show you the code:

    npm install cron

```js
// index.js

function listen() {
  // in my case I listen to RabbitMQ and do some work
  console.log( new Date() );
}

new cronJob('00 0,10,20,30,40,50 * * * *', listen, null, true);
```

`node index.js`

That's it. I love to keep everything in Node land if possible. All we need to make sure is that our little Node service is running. Something like [forever](https://github.com/nodejitsu/forever) will take care of that.

The nice think about node-cron is it keeps the same syntax of unix cron so you don't need to learn a DSL to make it work. The only thing that node-cron added is the extra number at the left that represents seconds so you can be even more accurate then unix cron.

```bash
* * * * * * command to be executed
- - - - - -
| | | | | |
| | | | | ----- Day of week (0 - 7) (Sunday=0 or 7)
| | | | ------- Month (1 - 12)
| | | --------- Day of month (1 - 31)
| | ----------- Hour (0 - 23)
| ------------- Minute (0 - 59)
 -------------- Second (0 - 59)
```