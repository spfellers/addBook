/*eslint-env node*/


// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');
var crypto = require('crypto');
var mongodb = require('mongodb');
var http = require('http');
var fs = require('fs');// Load mongoose package
var mongoose = require('mongoose');
//var pkg = require('package.json');
// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var server = express();

// serve the files out of ./public as our main files
server.use(express.static(__dirname + '/public'));

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


// Use connect method to connect the database to the Server
MongoClient.connect(url, function (err, db) {
	if(err) { return console.dir(err); }
	//we win
	console.log("Made connection to ", url);
	db.close();
});

