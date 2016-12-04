var controllers = require('./controllers');

module.exports = function(app, passport) {

    app.get('/', function(req, res) {
        res.render('index.ejs');
    });

    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user
        });
    });

    app.get('/stats', isLoggedIn, controllers.stats.getAllStats);

    app.get('/allnotes', isLoggedIn, controllers.notes.getAllNotesAllusers)

    app.get('/notes',isLoggedIn, controllers.notes.getAllnotes);

    app.post('/add', isLoggedIn, controllers.notes.addNote);

    app.get('/add',isLoggedIn,  function(req, res) {
        res.render('add-note.ejs', {
            user : req.user,
            message: ""
        });
    });

    app.get('/update/:id', isLoggedIn, controllers.notes.getNoteById);

    app.post('/delete/:id',isLoggedIn, controllers.notes.deleteNote);
    app.post('/edit', isLoggedIn, controllers.notes.updateNote);

    app.post('/delete/user/:id', isLoggedIn, controllers.users.deleteUser);

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    app.get('/login', function(req, res) {
        res.render('login.ejs', { message: req.flash('loginMessage') });
    });

    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    app.get('/signup', function(req, res) {
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));
    
    app.get('/connect/local', function(req, res) {
        res.render('connect-local.ejs', { message: req.flash('loginMessage') });
    });

    app.post('/connect/local', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/connect/local', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}
