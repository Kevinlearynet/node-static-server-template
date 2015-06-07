/**
 * Static HTTP Server
 *
 * Create a static file server instance to serve files
 * and folder in the './public' folder
 */
'use strict';

// modules
var server = require('node-static');
var port = process.env.PORT || 8080;
var http = require('http');

// config
var file = new server.Server('./public', {
	cache: 3600,
	gzip: true
});

// serve
http.createServer(function (request, response) {
	request.addListener('end', function () {
		file.serve(request, response);
	}).resume();
}).listen(port);