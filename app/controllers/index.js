
var notesController = require('../controllers/notesController');
var usersController = require('../controllers/usersController');
var statsController = require('../controllers/statisticsController');

module.exports = {
    notes: notesController,
    users: usersController,
    stats: statsController
}