# Simple Static Node.js HTTP Server

Run a static HTTP server locally on a specified domain host. 

## Setup

1. Clone the repository to your machine: `git clone git@github.com:Kevinlearynet/node-static-server-template.git`
1. Move into your install directory: `cd node-static-server-template`
1. Install package dependencies: `npm install`

## Start

1. In the terminal run the command `npm start`
1. Open [http://localhost:8080](http://localhost:8080) in your browser

## Gulp

A few gulp routines are included for compiling and building resources in the `./working/` directory.

* Concatenating, compiling and minifying LESS into CSS
* Concatenating, compiling and minifying JS

Gulp's `watch` command is used to compile on the fly while working. To turn on the watch routines use the command `gulp`.

## Notes

* Static files are served from `./public/` directory
* Uses the `http-server` project
