# Oren's Website

## Prerequisites

* [docker](https://docs.docker.com/installation/mac)
* [docker compose](https://docs.docker.com/compose/install)

## Setup

    docker-compose build   # put ruby, sass, bourbon, neat, and bitters inside a docker image
    docker-compose up      # watch sass files and compile them into css/app.css

Open index.html in the browser and modify any sass or scss file using your text editor.

## New Talk / Post

    npm install marked -g
    cd posts
    ./convert foo   # converts foo.md into foo.html
