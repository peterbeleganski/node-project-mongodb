var mongoose = require('mongoose');

var statisticsSchema = mongoose.Schema({
    dateOfRegistration: Date,
    lastLoginDate : Date,
    user_id: String
});

var Statistics =  mongoose.model('Statistics', statisticsSchema);

module.exports = Statistics;
