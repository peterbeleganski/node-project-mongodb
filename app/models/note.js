var mongoose = require('mongoose');

var noteSchema = mongoose.Schema({
   title: String,
   dateCreated: Date,
   user_id: String,
   user_email: String
});

var Note =  mongoose.model('Note', noteSchema);

module.exports = Note;
