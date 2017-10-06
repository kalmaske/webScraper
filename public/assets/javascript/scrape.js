$(document).ready(function () {
    
    
      function indexPage() {
    
        $("#scrapedData").empty();
        $.get("/articles/false").then(function (data) {
          // console.log(data)
          if (data && data.length > 0) {
    
            $.each(data, function (index, article) {
              var listOfArt = "<div class='card card-default'>";
              listOfArt += "<div class='card-header article-header'>";
              listOfArt += "<h3><a class='article-link' target='_blank' href='" + article.link + "'>" + article.title + "</a>";
              listOfArt += "<a data-id='" + article._id + "' class='btn btn-primary save-article'>Save Article</a>";
              listOfArt += "</h3>";
              listOfArt += "</div>";
              listOfArt += "<div class='card-body'>";
              listOfArt += "<p class='card-text'>" + article.summary + "</p>";
              listOfArt += "</div>";
              listOfArt += "</div>";
    
              $("#scrapedData").append(listOfArt);
            });
          } else {
            $("#scrapedData").html("<h3>No articles to display.  Scrape some!</h3>");
          }
        });
      };
    
      $("#scrapedArticles").on("click", function () {
    
        $.get("/scrape").then(function (data) {
    
          indexPage();
          bootbox.alert("<h3 class='text-center m-top-80'>" + data + "<h3>");
        });
    
      });
    
      
      $(document).on("click", ".save-article", function () {
    
        var articleID = $(this).attr("data-id");
        $.post("/saveArticle/" + articleID).then(function (data) {
          indexPage();
        });
    
      }); 

      indexPage();
    
    }); 