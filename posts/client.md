## Client-Side JavaScript - Still a Mess

![mess](http://www.personal.psu.edu/afr3/blogs/siowfa13/assets_c/2013/12/messy-baby-eating-in-high-chair250aaol-lifestyle-uk111010-thumb-250x300-392646.jpg)

[Ghost](https://ghost.org/) is a new blogging platform written in Node. Think of Wordpress but just for blogging. No CMS or any additional features.

After getting  got a few bucks from [kickstarter](https://www.kickstarter.com/projects/johnonolan/ghost-just-a-blogging-platform) (asked for 40k and got 330k) they recently open sourced the project. A few weeks ago their CTO blogged about their main issue in their codebase - nightmare to maintain their client side code. It shouldn't come as a surprise to anyone who had to deal with any decent size JavaScript app. There are many ways to organize the code, and proliferation of frameworks and libraries to choose from.

The Ghost team uses Backbone for their Admin section. They decided to evaluate other options for this portion of their project and open an issue on their Github project to get opinions from the JavaScript community. After a long discussion they picked Ember.js as their framework and they plan to re-write their Backbone codebase into Ember.

The main contestants were Ember, Angular and Backbone. Other suggestions were Facebook's React, Ractive.js and TJ (The guy behind express.js) even suggested Web Components, an idea that was rejected due to it's experimental state.

Regardless of you their choice I think it's an interesting discussion that includes comments from the develeoprs behind those libraries and frameworks.


Here is the announcement of the re-write: [http://dev.ghost.org/hello-ember/](http://dev.ghost.org/hello-ember/)  
And this is the discussion: [https://github.com/TryGhost/Ghost/issues/2144](https://github.com/TryGhost/Ghost/issues/2144)

<br />
BTW, You can install Ghost using one command - `docker pull dockerfile/ghost`. Yes, Docker is amazing!

