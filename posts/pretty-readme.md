## Turn your Readme.md into a pretty website

Don't you want your project's documentation to look like this?

![readme](http://i.imgur.com/UqY4Lrh.png)

Well, now you can, with the help of a little npm package called [readme-docs](https://github.com/getprove/node-bootstrap-readme-docs).  
First format your Readme.md file to look like that:

```md
# Project foo

web-scale website for managing fooos.

## index
* [how it works](#how-it-works)
* [format](#format)
* [examples](#examples)

## how it works
hello

## format
world

## examples
hi
```

install the bin script

    npm install -g readme-docs

run this command inside your project

    readme-docs

That's it. a build folder was created, open the index.html and welcome to your new documentation page.
