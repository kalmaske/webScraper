var express = require('express');
var app = express();

var cheerio = require('cheerio');

var request = require('request');

var Article = require('../models/Article.js');
var Note = require('../models/Note.js');

app.get("/", function (req, res) {
  res.render("index");
});

app.get("/savedArt", function (req, res) {
  res.render("savedArt");
});

// define the site we want to scrape
var website = 'https://www.nytimes.com/';

app.get("/scrape", function (req, response) {
  request(website, function (error, res, html) {

      Article.find({}, function (err, data) {

          var getScrapes = getArticle(html, data);
          if (getScrapes === 0) {
              response.send("There are No New Articles !" + getScrapes);
          } else {
              response.send(getScrapes + " articles added");
          };
      });
  });
});

app.get("/articles/:savedArt", function (req, res) {
  
      var savedArt = req.params.savedArt;
  
      // console.log("save " + save)
  
          Article.find({savedArt:savedArt}, function (error, doc) {
              if (error) {
                  res.send("Error: ",error);
              }
              // Or send the doc to the browser
              else {
                  res.json(doc);
              }
          });
  });

  app.post("/articlesSaved/:id", function (req, res) {
    
        var id = req.params.id;
    
        Article.findByIdAndUpdate(id, { $set: { save: 'true' } }, { new: true }, function (err, article) {
            if (err) res.send(err);;
            res.send(article);
        });
       
    });


app.get("/notes/:id", function (req, res) {

  var id = req.params.id;

  Article.findOne({ "_id": id })
      .populate("note")
      .exec(function (error, doc) {
        
          if (error) {
              console.log(error);
          }
          
          else {
              res.json(doc);
          }
      });
});


app.post("/articles/:id", function (req, res) {
    var articleID = req.params.id;

    var createNote = new Note(req.body);
    createNote.save(function (error, doc) {
        if (error) {
            res.send(error);
        }
        else {
            Article.findOneAndUpdate({
                "_id": articleID
            }, {
                $push: {
                    "note": doc._id
                }
            }, {
                new: true
            }, function (err, newdoc) {
                if (err) {
                    res.send("Error: ",err);
                }
                else {
                    res.send(newdoc);
                }
            });
        }
    });
});

app.delete("/articles/:id", function (req, res) {
  Article.findByIdAndRemove(req.params.id, function(error, article) {
    if (error) {
        console.log(error);
    } else {
        console.log(article);
        if (article.note) {
          Note.deleteMany({"_id": {$in: article.note}}, function(err){
            if (err) {
              console.log(err)
            };
          });
        };
      res.json(article);
    };
  });
});



app.delete("/articles/:id", function (req, res) {
  Article.findByIdAndRemove(req.params.id, function(error, article) {
    if (error) {
        console.log(error);
    } else {
        console.log(article);
        if (article.note) {
          Note.deleteMany({"_id": {$in: article.note}}, function(err){
            if (err) {
              console.log(err)
            };
          });
        };
      res.json(article);
    };
  });
});

app.delete("/notes/:data", function (req, res) {

var obj = JSON.parse(req.params.data);
var noteID = obj.noteid;
var articleID = obj.articleID;


Note.findByIdAndRemove(noteID, function (error, article) {
  if (error) {
    console.log("Error: ",error);
  } else {
    Article.update(
      { "_id": articleId },
      { "$pull": { "note": noteID } },
      function (err, article) {
        if (err) throw err;
        res.json(article);
      });
  };
});
});


function getArticle(html, data) {
  
      var $ = cheerio.load(html);
      var totalScrapes = 0;
      $("article").each(function (i, element) {
  
          var scraped = {};
          scraped.title = $(this).children("h2").children("a").text();
          scraped.link = $(this).children("h2").children("a").attr("href");
          scraped.summary = $(this).children("p.summary").text();
  
          if (scraped.title && scraped.link && scraped.summary) {
              let gotTile = data.some(article => article['title'] === scraped.title)
  
              if (!gotTile) {
                  totalScrapes++
                  var entry = new Article(scraped);
                  entry.save(function (err, doc) {
                      
                      if ("Eroor:",err) {
                          console.log(err);
                      }
                      else {
                      };
                  }); 
              }; 
          }
      }); 
      return totalScrapes;
  }
  


// export the scraps
module.exports = app;