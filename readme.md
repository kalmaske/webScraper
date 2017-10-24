# webScraper
 
 The app scrapes the NewYorkTimes website for new articles and adding them to the Database
 
 Whenever a user visits the site, and press Scrape new articles the app scrapes stories from NYTe and display them for the user. 
 
 Each scraped article will be saved to the apps' database. 
 
 The app  scrape and display the following information for each article:
 
    * Headline - the title of the article
 
    * Summary - a short summary of the article
 
    * URL - the url to the original article
 
   
 Users is also able to leave comments on the articles displayed and revisit them later. 
 
 The comments will be saved to the database as well and associated with their articles. 
 
 Users is able to delete comments left on articles. All stored comments should be visible to every user.
 
 Used npm packages:
     express
     express-handlebars
     mongoose
     body-parser
     cheerio
     request

Deployed: https://mysterious-ocean-75164.herokuapp.com/