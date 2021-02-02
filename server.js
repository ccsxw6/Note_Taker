// Require Dependencies
const express = require("express");
const fs = require("fs");
const path = require('path');

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3000; //telling web server what port to listen to

// Middleware - Setup data parsing - converting a type of data to a different type of data
// need first two for post and put requests, both are dealing w/ sending data (in the form of some object) 
// to the server and you are asking the server to accept or store that data (object), which is enclosed in the body
// i.e req.body of that post or put request
//app.use method mounts the middleware for every request
app.use(express.urlencoded({ extended: true })); //inbuilt express method, to recognize incoming req object as strings or arrays
app.use(express.json()); //express method, recognizes incoming request object as a json object. 
app.use(express.static(__dirname)); // express.static() method specifies the folder from which to serve all static resources

// route if user visits '/' and '/notes'
app.get('/', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './public/notes.html')));

//Require routes file
require('./routes/routes')(app);

// Setup listener
app.listen(PORT, () => console.log("App listening on PORT: " + PORT));  