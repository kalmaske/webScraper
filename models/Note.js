var mongoose = require("mongoose");


// Create a schema class
var Schema = mongoose.Schema;
// Create the Note schema
var NoteSchema = new Schema({
  body: {
    type: String
  }
});


var Note = mongoose.model("Note", NoteSchema);


module.exports = Note;