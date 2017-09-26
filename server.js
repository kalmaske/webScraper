// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var handlebars = require('express-handlebars');
var mongoose = require("mongoose");
var cheerio = require("cheerio");
var request = require("request");

// Require the routes and use them
var routes = require('./routes/routes');

// Initialize Express
var app = express();

// var db = "mongodb://localhost/newsScrape" || process.env.MONGODB_URI;


// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));

app.engine("handlebars", handlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");



mongoose.connect("mongodb://localhost/newsScrape");
var db = mongoose.connection;
// mongoose.connect(db);

db.on("error", function (error) {
  console.log("mongoose error: ", error);
});

db.once("open", function () {
  console.log("successful connection - mongoose.");
});

var routes = require("./controller/scraperController.js");
app.use("/", routes);

// Launch App
var port = process.env.PORT || 7777;


app.listen(port, function()
{
  console.log('Running on port: ' + port);
});
