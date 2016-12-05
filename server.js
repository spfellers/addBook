/*eslint-env node*/



	// Connection URL. This is where your mongodb server is running.
	var url = 'mongodb://admin:RADYQZUDBEYHLWVT@sl-us-dal-9-portal.3.dblayer.com:16990/admin?ssl=true';


 	// set up ========================
    var express  = require('express');
    var app      = express();                               // create our app w/ express
    var mongoose = require('mongoose');                     // mongoose for mongodb
    var morgan = require('morgan');             // log requests to the console (express4)
    var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
    var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
    var cfenv = require('cfenv');
    // configuration =================

    mongoose.connect(url);    									    // connect to mongoDB database on modulus.io

    app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
    app.use(morgan('dev'));                                         // log every request to the console
	app.use(bodyParser.json());
	var appEnv = cfenv.getAppEnv();

	//create our mongoose model, 3 string parameters for name, email, and phone number
	var contactlist = mongoose.model('contactlist',  {"name": String ,"email": String ,"number": String} );


	//when get requests come to /contactlist, send them a json of all of the contact information in the database
	app.get('/contactlist', function (req, res) {
		console.log("I got the request");
		contactlist.find(function(err, docs) {
			if (err)
				console.log("error", err);
			res.json(docs);
		});
	});

	//when post requests come to /contactlist we should be adding a new contact to our database
	app.post('/contactlist', function (req, res) {
	  //log all of the post data
	  console.log("trying to insert into db: ", req.body);
	  console.log("name: ", req.body.name);
	  console.log("email: ", req.body.email);
	  console.log("number: ", req.body.number);

	  //create a document to be added to our database using all of the information in the fields
	  contactlist.create({
	  	name : req.body.name,
		email : req.body.email,
		number : req.body.number
	  }, function(err, doc) {
		        if (err){
		            res.send(err);
					console.log("error: ", err);
				}
		    //return the json with all of this info to guaruntee a "successful" request
			res.json(doc);
	   });

	});


	//when we get a delete request, find the id and delete the corresponding document
	app.delete('/contactlist/:id', function (req, res) {
	  var id = req.params.id;
	  console.log("delete id = " + id);
		contactlist.findOne({ _id : id }, function (err, contactlist) {
			if (err) {
				console.log("Couldnt find that id");
				return;
			}
			contactlist.remove(function (err) {
				console.log("removing id: " + id);
				res.send(id);
				// if no error, your model is removed
			});
		});
	});

	//when we get a GET request with an id attached to it, bring it into "edit mode"
	app.get('/contactlist/:id', function (req, res) {
	  var id = req.params.id;
	  console.log("searching for edit id: " + req.params.id);
	  console.log("request params: " + req.params);
	  contactlist.findOne({ _id : id }, function (err, docs) {
			if (err) {
				console.log("Couldnt find that id");
				return;
			}
			res.json(docs);
	  });
	});

	//when we get a PUT request with an id attached to it, we are updating that id
	app.put('/contactlist/:id', function (req, res) {
	   var id = req.params.id;
		contactlist.findById(id, function (err, doc) {
		  if (err){
			console.log("error in update");
			return;
		  }
		  //assign the doc the parameters from the forms in the html, then save it
		  doc.name = req.body.name;
		  doc.email = req.body.email;
		  doc.number = req.body.number;
		  doc.save(function (err) {
	  		if (err) return console.log(err);
	  		// saved!
			});
		  res.json(doc);
		});
	});


    app.listen(appEnv.port);
    console.log("App listening on port ",appEnv.port);
