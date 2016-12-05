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
    app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    app.use(methodOverride());
	var appEnv = cfenv.getAppEnv();


    // application -------------------------------------------------------------
    app.get('*', function(req, res) {
        res.sendfile('./public/index2.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
    // listen (start app with node server.js) ======================================
    app.listen(appEnv.port);
    console.log("App listening on port ",appEnv.port);

/*

    // define model =================
    var Todo = mongoose.model('Todo', {
        names : String,
		address : String,
		phone : String
    });

// routes ======================================================================

    // api ---------------------------------------------------------------------
    // get all todos
    app.get('/api/todos', function(req, res) {

        // use mongoose to get all todos in the database
        Todo.find(function(err, todos) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)

            res.json(todos); // return all todos in JSON format
        });
    });

    // create todo and send back all todos after creation
    app.post('/api/todos', function(req, res) {

        // create a todo, information comes from AJAX request from Angular
        Todo.create({
            names : req.body.text,
            done : false
        }, function(err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            Todo.find(function(err, todos) {
                if (err)
                    res.send(err)
                res.json(todos);
            });
        });

    });

    // delete a todo
    app.delete('/api/todos/:todo_id', function(req, res) {
        Todo.remove({
            _id : req.params.todo_id
        }, function(err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            Todo.find(function(err, todos) {
                if (err)
                    res.send(err)
                res.json(todos);
            });
        });
    });
*/

var contactlist = mongoose.model('contactlist', {name : String, email : String, number : String} );

app.get('/contactlist', function (req, res) {
	console.log("get request was made");
	res.send("hello world");
});

app.post('/contactlist', function (req, res) {
  console.log("trying to insert into db: ", req.body);
  console.log("name: ", req.body.name);
  console.log("email: ", req.body.email);
  console.log("number: ", req.body.number);

  contactlist.create({
  	name : req.body.name,

    email : req.body.email,

	number : req.body.number

  }, function(err, doc) {
            if (err)
                res.send(err);
			res.json(doc)
			console.log("sent");
        });

  //db.contactlist.insert(req.body, function(err, doc) {
  //  res.json(doc);
  //});
});
/*
app.delete('/contactlist/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  //Entry.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
  //  res.json(doc);
  //});
});

app.get('/contactlist/:id', function (req, res) {
  var id = req.params.id;
  console.log('I received a GET:ID request');
  console.log(id);
  //Entry.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
  //  res.json(doc);
  //});
});

app.put('/contactlist/:id', function (req, res) {
  var id = req.params.id;
  console.log(req.body.name);
 // Entry.findAndModify({
 //   query: {_id: mongojs.ObjectId(id)},
 //   update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
 //   new: true}, function (err, doc) {
 //     res.json(doc);
 //   }
 // );
});

*/
