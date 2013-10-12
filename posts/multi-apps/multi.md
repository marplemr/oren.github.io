# Modular Website

## TLDR:
Splitting YP.com into small websites is really nice.

## What
We always try to modularize our code - break down a big function to smaller ones or chunk a feature to it's use-cases.
What about the application level? what if we could take YP.com and break it into multiple website?
Let's say we have the following: Home, SRP, MIP and Mybook. 
Each site is autonomous - it has a git repo with dependencies, and it can be deployed by itself.
The dependencies for each site will be NPM packages and some of them will be shared with other sites (tracking, css, utilities).

## How

### Router
A small node-based router will forward each request to the right website based on the url.
For example:  '/', '/autosuggest', '/nearby.html' and '/api' will be sent to the home website.


### Websites
SRP project:

```bash
ypu-srp/
├── node_modules
│   ├── ypu-listing
│   │   ├── helpers.js
│   │   └── model.js
│   ├── ypu-tracking
│   ├── ypu-style
│   └── ypu-util
├── package.json
├── public
│   ├── css
│   └── js
└── server.js
```

Mybook project:

```bash
ypu-mybook/
├── node_modules
│   ├── ypu-mybook
│   │   ├── helpers.js
│   │   └── model.js
│   ├── ypu-tracking
│   ├── ypu-style
│   └── ypu-util
├── package.json
├── public
│   ├── css
│   └── js
└── server.js
```

Notice that tracking, style and util are dependencies of both projects. public/css and public/js contain project specific code.

### Production

Nginx sites in front of the hosts and provide load balancing and SSL termination.
For the sake of simplicity (deployment/monitoring), the router and the websites can live on the same host, each on it's own process.
The only caveat is that we continue to use 8 core machines. It will allow us to have maximum of 7 separate websites + router.
If at some point we decide to use smaller machines, we can have each website on it's own host.

## Why

* Maintenance - easier to add feature/fix bug when working on smaller codebase.
* Flexible - each project might require different architecture/framework.
* Velocity - since each project can be deployed separately, new features or bug fixes hit production faster.
* Team structure - clear boundaries between features can lead to more focused teams.
* Innovation - big codebase makes it hard to experiment with new tools/technologies (Rails 2.3 anyone??)

## Other Considerations

* Deployment - we can still use tpkg (create tpkg for each site) or switch to git-based deploy but in both cases it require some dev-ops work.
* Shared Libraries - we need to communicate when we make a change in shared dependency. For example when touching base.css.
This is also the case now, but will be more noticeable in the multi-website environment.

## Try it
We wrote a proof-of-concept of that approach. It uses 3 seperate apps: router, SRP, and the current node project (Home, MIP and Mybook).
https://github.com/citrusbyte/ypu-router
https://github.com/citrusbyte/ypu-srp
https://github.com/citrusbyte/yp

cd ypu-router && npm install && node server
cd ypu-srp && npm install && node server
cd yp && npm install && PORT=8001 make run

now hit the 0.0.0.0:8000 (the router)
make a search for a business and you should see 'Cpk'. The SRP is served from the ypu-srp app that runs on port 8002.
