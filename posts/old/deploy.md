## Simple way to deploy your code

![deploy](http://regmedia.co.uk/2013/02/04/hello_kitty_3.jpg)

I like TJ Holowaychuk's [Deploy](https://github.com/visionmedia/deploy) tool.
It's simple, has no dependencie (it's a 400 lines bash script) and easy to read. It uses ssh to run commands on you remote hosts. by commands I mean simple stuff like git clone and mkdir. After setting it up you will be able to deploy your code with `deploy <host>`

First get the [deploy script](https://github.com/visionmedia/deploy/blob/master/bin/deploy) from the repository. I just put it in the bin folder of my project, so anyone on the team can deploy as well.  
Second, make sure your laptop can ssh without a password to the host you want to deploy to. Also ssh to that host and make sure you can clone your project. If You have issues it's probably due to ssh keys, so take care of that and come back here when you're done.

There is one configuration file that this script is using - deproy.conf. just put it in the project's directory. Here is an example:

    [dev1]
    host ci.foo.com
    user deployer
    path /var/www/ci
    repo https://github.com/oren/ci.git
    ref origin/master
    forward-agent yes

    post-deploy NODE_ENV=dev /var/www/ci/source/bin/restart.sh

Notice the last line. On every deploy, bin/restart.sh will be executed. This is my bash script that will install my app's dependecies and restart my app. Deploy has other scripts you can run such as pre-deploy and test.

The first time you deploy to a new host you should run the setup command:

    deploy dev1 setup

the setup command will create the following structure on your host and will clone your project:
        
    ── ci
       ├── shared
       │   ├── logs
       │   └── pids
       └── source

Here are the exact commands that the deploy script is running:

    mkdir -p /var/www/ci/{shared/{logs,pids},source}
    ln -sfn /var/www/ci/source /usr/local/nextgen/ci/current
    git clone https://github.com/oren/ci.git /var/www/ci/source

Now you are ready to deploy and start the project:

    deploy dev1

And here is what's going on behind the curtain

    cd /var/www/ci/source && git fetch --all
    cd /var/www/ci/source && git reset --hard origin/master
    ln -sfn /var/www/ci/source /var/www/ci/current
    cd /var/www/ci/source && echo `git rev-parse --short HEAD` >> /var/www/ci/.deploys
    cd /var/www/ci/current; SHARED="/var/www/ci/shared" NODE_ENV=prod /var/www/ci/source/bin/restart.sh

Notice that a file .deploys is created on the server. It contain the git sha of each deploy, so you can revert to any previous deploy with `deploy revert`.

That's it. Enjoy quick and frequent deployments!
