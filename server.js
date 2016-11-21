/*eslint-env node*/


// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');
var crypto = require('crypto');
var mongodb = require('mongodb');
var http = require('http');
var fs = require('fs');
//var pkg = require('package.json');
// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var app = express();

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();
//lets require/import the mongodb native drivers.

var port = 16990;

//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;

// Connection URL. This is where your mongodb server is running.
var url = 'mongodb://admin:RADYQZUDBEYHLWVT@sl-us-dal-9-portal.3.dblayer.com:16990/admin?ssl=true';


server.listen(appEnv.port, '0.0.0.0', function() {
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});

fs.readFile('./public/index.html', function (err, html) {
	if (err) {
		throw err; 
	}       
	http.createServer(function(request, response) {  
		   response.writeHeader(200, {"Content-Type": "text/html"});  
		   response.write(html);  
		   response.end();  
	}).listen(appEnv.port);
});

// Use connect method to connect the database to the Server
MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    //HURRAY!! We are connected. :)
    var server = app.listen(port, function () {
    	app.set('server', server);
    	app.set('db', db);
    	console.log('Connection established to', url);
	});
	
  }
	db.close();
});
