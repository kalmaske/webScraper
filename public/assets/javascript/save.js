$(document).ready(function () 
{
    function savedArtPage() {
        
            $("#scrapedData").empty();
            $.get("/articles/true").then(function (data) {
              // console.log(data)
              if (data && data.length > 0) {
        
                $.each(data, function (index, article) {
                  var listOfArt = "<div class='card card-default'>";
                  listOfArt += "<div class='card-header article-header'>";
                  listOfArt += "<h3><a class='article-link' target='_blank' href='" + article.link + "'>" + article.title + "</a>";
                  listOfArt += "<div class='linkBlock'>";
                  listOfArt += "<a data-id='" + article._id + "' class='btn btn-danger  delete-article'>Delete Article</a>";
                  listOfArt += "<a data-id='" + article._id + "' class='btn btn-primary  note-article'>Notes</a>";
                  listOfArt += "</div>";
                  listOfArt += "</h3>";
                  listOfArt += "</div>";
                  listOfArt += "<div class='card-body'>";
                  listOfArt += "<p class='card-text'>" + article.summary + "</p>";
                  listOfArt += "</div>";
                  listOfArt += "</div>";
        
                  $("#scrapedData").append(listOfArt);
                });
              } else {
                console.log("no data found")
                $("#scrapedData").html("<h3>No saved articles to display.  Scrape and Save some!</h3>");
              }
        
        
            }); 
          };
          $(document).on("click", ".delete-article", function () {
            
                var articleID = $(this).attr("data-id");
                $.ajax({
                    method: "DELETE",
                    url: "/articles/" + articleID
                  })
                  .then(function () {
                    savedArtPage();
                  })
                  .fail(function (xhr, textStatus, errorThrown) {
                    handleErr(xhr.responseText);
                  });
              });

        
              $(document).on("click", ".note-article", function () {
                
                    var articleID = $(this).attr("data-id");
                    $.get("/notes/" + articleID).then(function (data) {
                  
                      var noteAdded = "<div class='container-fluid text-center'>";
                      noteAdded += "<div class='card-header note-header'>";
                      noteAdded += "<h5>Notes for Article " + articleId + "</h5>";
                      noteAdded += "<hr>";
                      noteAdded += "<ul class='list-group notesblock'>";
                      if (data.note && data.note.length > 0) {
                      
                        $.each(data.note, function (index, notebody) {
                          noteAdded += "<li class='list-group-item note'>" + notebody.body;
                          noteAdded += "<button data-articleid='" + articleId + "' data-noteid='" + notebody._id + "' class='btn btn-danger note-delete'>x</button>";
                          noteAdded += "</li>"
                        }); //end of each loop
                
                      } else {
                        noteAdded += "<li class='list-group-item note'>No notes for this article</li>"; 
                      }
                      noteAdded += "</ul>";
                      noteAdded += "<textarea id='bodytext' placeholder='Enter a note' rows='5' cols='50'></textarea>";
                      noteAdded += "<button data-id='" + articleId + "' class='btn btn-primary note-save'>Save Note</button>";
                      noteAdded += "</div>";
                      bootbox.dialog({
                        message: noteAdded,
                        closeButton: true
                      });
                    }); 
                  });
                
                  $(document).on("click", ".note-save", function () {
                    
                        var articleID = $(this).attr("data-id");
                        var noteBody = $("#bodytext").val();
                    
                        if (noteBody) {
                    
                          $.post("articles/"+ articleID, {body:noteBody})
                          
                            .done(function () {
                              bootbox.hideAll();
                            })
                            .fail(function () {
                              handleErr("Error in note post");
                            }) 
                        }
                      }); 
                    
                      
                      $(document).on("click", ".note-delete", function () {
                    
                        // store id saved in data element of button
                        var articleID = $(this).attr("data-articleid");
                        var noteID = $(this).attr("data-noteid");
                        var parms = {"articleid":articleID, "noteid":noteID};
                    
                        $.ajax({
                          method: "DELETE",
                          url: "/notes/" + JSON.stringify(parms) 
                        })
                          .then(function () {
                            bootbox.hideAll();
                          })
                          .fail(function (xhr, textStatus, errorThrown) {
                            handleErr(xhr.responseText);
                          });
                    
                      });

                
});