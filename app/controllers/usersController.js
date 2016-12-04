var Note = require('../models/note');
var User = require('mongoose').model('User');

module.exports = {
    deleteUser: function(req, res) {
        console.log(req.params);

        Note.find({user_id:req.params.id}, function(err, collection) {
            if(err) {
                console.log(err);
            }

            collection.forEach(function(e){
                e.remove({_id:e._id}, function(err, result) {
                    if(err) {
                        console.log(err);
                    }else{
                        console.log(result + " deleted");
                    }
                });
            });
        });

        User.findOne({_id:req.params.id}, function(err, user){
            user.remove({_id:user._id}, function(err, data) {
                if(err) {
                    console.log(err);
                }else{
                    console.log("User deleted " + data);
                    res.render('signup.ejs', { message: req.flash('signupMessage') });
                }
            })
        });

    }
}