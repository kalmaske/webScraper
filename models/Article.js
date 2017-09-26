var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  title: 
  {
    type: String,
    required: true,
    unique: true,
    dropDups: true
  },
  link: 
  {
    type: String,
    required: true,
    unique: true
  },
  summary: {
    type: String,
    required: true
  },
  savedArt: {
    type: Boolean,
    default: false
  },
  
note: [{
    // Store ObjectIds in the array
    type: Schema.Types.ObjectId,
    // The ObjectIds will refer to the ids in the Note model
    ref: "Note"
  }]
});

// Create the Article model with the ArticleSchema
var Article = mongoose.model("Article", ArticleSchema);

// Export the model
module.exports = Article;
