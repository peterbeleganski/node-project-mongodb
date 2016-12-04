var Statistics = require('../models/statistics');

module.exports = {
    getAllStats: function(req, res){
        console.log(req.user)
        Statistics.find({user_id: req.user._id}, function(err, collection) {
            if(err){
                console.log(err);
            }else {
                res.render('stats.ejs', {
                    stats: collection
                });
            }
        })
    }
}