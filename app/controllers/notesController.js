var Note = require('../models/note');
var User = require('mongoose').model('User');

module.exports = {
    getAllNotesAllusers: function(req, res){
         Note.find({}, function(err, collection) {
            if(err) {
                console.log(err);
                return;
            }
           User.find({}, function(err, users) {
               if(err){
                   console.log(err);
                   return;
               }

                res.render('all-notes.ejs', {
                    user_note: users,
                    notes: collection
                });
           })
           
        });
    },
    fillData: function(req, res) {
        Note.find({}, function(err, collection) {
            if(err){
                throw err;
            }
            if(collection.length === 0) {
                console.log("prazna kolekciq");

                var note = new Note();

                note.title = "Test notes";
                note.dateCreated =  Date.now();
                note.user_id = req.user._id;
                note.user_email = req.user.local.email;
                note.save(function(err, data) {
                    if(err) throw err;
                    console.log("First note Added,: ", data);
                });
            }  

            res.end();
        });
    },
    getAllnotes : function(req, res) {
        Note.find({user_id:req.user._id}, function(err, collection) {
            if(err) {
                console.log(err);
                return;
            }
            res.render('notes.ejs', {
                notes: collection
            });

        });
    },
    getNoteById: function(req, res) {
        var id = req.params.id;
        Note.findOne({_id:id}, function(err, result) {
            if(err) {
                throw err;
            }
            console.log("result from getNoteByid: " + result);
           res.render('edit-note.ejs', {
                user : req.user,
                message: "",
                note: result
            });

        });

    },
    deleteNote: function(req, res, next) {
        var id = req.params.id;

        User.findOne({_id:req.user._id}, function(err, currentUser){

            var index = currentUser.local.notes_id.indexOf(id);
            if (index > -1) {
                currentUser.local.notes_id.splice(index, 1);
            }   
            currentUser.save(function(err, result) {
                if(err) {
                    console.log(err);
                    return;
                }

                console.log("delete and drom user also " + result);
            })
        });
        Note.remove({_id:id}, function(err, collection) {
            if (err) {
                return next(err);
            }
            else {
                console.log("deleted");
                res.render('messages.ejs', {
                    message:'Note deleted!'
                });
            }
        });  
    },
    addNote: function(req, res) {

        console.log(req);
       
        var data = req.body;
        var note = new Note();

        note.title = data.title;
        note.dateCreated = data.dateCreated;
        note.user_id = req.user._id;
        note.user_email = req.user.local.email;

        Note.create(note,function(err, insertedNote) {
            if(err) {
                console.log(err)
                return;
            }

            console.log("Note inserted: " + insertedNote);
            User.findOne({_id:req.user._id} , function(err, user) {
                if(err) {
                    console.log(err);
                    return;
                }
            
                user.local.notes_id.push(insertedNote._id);

                user.save(function(err, data) {
                    console.log("Note added to user: " + data);
                });

            });

            res.render('add-note.ejs', {
                message: "Note added!"
            });
        });
        
    },
    updateNote: function(req, res) {
        var noteData = req.body;
        console.log(noteData);
        Note.update({_id: noteData.id}, noteData, function() {
            res.render('edit-note.ejs', {
                message: "Note edited!",
                note: noteData
            });
        });
        
    }
}