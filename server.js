/*eslint-env node*/


// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');
var crypto = require('crypto');
var mongodb = require('mongodb');
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

// Use connect method to connect to the Server
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
    // do some work here with the database.
	
    // Get the documents collection
    var users = db.collection('users');

    //Create some users
    var user = {name: 'Sam', password: 'password', roles: ['admin', 'user']};


    // Insert some users
    users.insert(user, function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log('Inserted %d documents into the "users" collection. The documents inserted with "_id" are:', result.length, result);
      }
      //Close connection
      db.close();
    });
/*
	// login function
	exports.manualLogin = function(user, pass, callback){
		users.findOne({user:user}, function(e, o) {
			if (o == null){
				callback('user-not-found');
			}	else{
				validatePassword(pass, o.pass, function(err, res) {
					if (res){
						callback(null, o);
					}	else{
						callback('invalid-password');
					}
				});
			}
		});
	}

	//Verifies passhash for user 
	var validatePassword = function(plainPass, hashedPass, callback){
		var hash = bcrypt.hashSync(password);
		console.log("Result from login server: ", res);
		callback(null, bcrypt.compareSync(user.password, hash));
	};
*/
	
  }
});
