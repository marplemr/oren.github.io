# Docker image for Bourbon

![screenshot](screenshot.png)

Bourbon is a lightweight mixin library for Sass - http://bourbon.io  
This image is a template based on the Bourbon intro [video](https://www.youtube.com/watch?v=8ItNE_DX6Cc).

## Prerequisites

* [docker](https://docs.docker.com/installation/mac)
* [docker compose](https://docs.docker.com/compose/install)

## Setup

    git clone git@github.com:oren/bourbon.git
    cd bourbon
    docker-compose build   # put ruby, sass, bourbon, neat, and bitters inside a docker image
    docker-compose up      # watch sass files and compile them into css/app.css

Open index.html in the browser and modify any sass or scss file using your text editor.
