# Web

## Requirements

* npm (Node package manager) [installed](http://blog.npmjs.org/post/85484771375/how-to-install-npm)

* gulp installed globally (`npm install -g gulp`)

* bower

Remember to execute `npm install` and `bower install` before call gulp.

## Build

Execute `gulp` to build the development profile, or `gulp -p` to build the production profile.

## Develop

Execute:

    cd dist
    python -m SimpleHTTPServer
    
To start a http server in the `dist` folder as root. Then open http://localhost:8000/index.html.

## Deploy

Execute the task `deploy`. Ensure that the target directories have the required permissions.