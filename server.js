// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
// Parses our HTML and helps us find elements
var cheerio = require("cheerio");
// Makes HTTP request for HTML page for ajax get
var request = require("request");
// Set Handlebars.
var exphbs = require("express-handlebars");

var port = process.env.PORT || 7777;

var app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Database configuration with mongoose
// connect local
// mongoose.connect("mongodb://localhost/newsscraper");
// mongoose.connect("mongodb://heroku_vnmdws07:ja8fr4tdbsnut5k4pfkjm76osh@ds125555.mlab.com:25555/heroku_vnmdws07");
mongoose.connect("mongodb://<kalmaske>:<Newchapter_2017>@ds125555.mlab.com:25555/heroku_vnmdws07");



var db = mongoose.connection;

// Show any mongoose errors
db.on("error", function (error) {
  console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function () {
  console.log("Mongoose connection successful.");
});

// Import routes and give the server access to them.
var routes = require("./controllers/scrapercontroller.js");

app.use("/", routes);

app.listen(port);


// % mongo ds012345.mlab.com:56789/newScrape -u dbuser -p dbpassword