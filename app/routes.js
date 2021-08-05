module.exports = function(app, passport, db) {

// normal routes ===============================================================

    // show the home page (will also have our login links)
    app.get('/', function(req, res) {
        res.render('index.ejs');
    });

    // PROFILE SECTION =========================
    app.get('/profile', isLoggedIn, function(req, res) {
        db.collection('messages').find({player: req.user.local.email}).toArray((err, result) => {
          let totalWins = 0
          let totaLosses = 0
          for(game of result){
            console.log(game.theWinner)
            if(game.theWinner === 'Player1'){
              totalWins++
            } else if(game.theWinner === 'Player2'){
              totaLosses++
            }
          }
          if (err) return console.log(err)
          res.render('profile.ejs', {
            user : req.user,
            messages: result,
            wins: totalWins,
            losses: totaLosses
          })
          console.log(result, result.length)
        })
    });



    // PLayer 1 Game Area SECTION =========================

    //backend side
    function getGameHistory(req, res){
      db.collection('messages').find().toArray((err, result) => {
        if (err) return console.log(err)
        return JSON.stringify(result)
      })
    }

    //backend route
    app.get('/gameHistory', getGameHistory)


//  frontend side
    app.get('/game', isLoggedIn, function(req, res) {
        res.render('game.ejs', {
          user : req.user,
          messages: getGameHistory(req, res)
        })
    });

    

    // LOGOUT ==============================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

// message board routes ===============================================================

    app.post('/messages', (req, res) => {
      db.collection('messages').insertOne({player: req.user.local.email, theWinner: req.body.theWinner, howManyRounds: req.body.howManyRounds, playerOneWins: req.body.playerOneWins, playerTwoWins: req.body.playerTwoWins}, (err, result) => {
        if (err) return console.log(err)
        console.log('saved to database')
        // res.redirect('/profile')
      })
    })


    // app.put('/messages', (req, res) => {
    //   db.collection('messages')
    //   .findOneAndUpdate({winner: 0}, {
    //     $set: {
    //       winner:req.body.winner + 1
    //     }
    //   }, {
    //     sort: {_id: -1},
    //     upsert: true
    //   }, (err, result) => {
    //     if (err) return res.send(err)
    //     res.send(result)
    //   })
    // })


    // app.delete('/messages', (req, res) => {
    //   db.collection('messages').findOneAndDelete({tag: req.body.tag, bill: req.body.bill, dicuss: req.body.dicuss, background: req.body.background}, (err, result) => {
    //     if (err) return res.send(500, err)
    //     res.send('Message deleted!')
    //   })
    // })

// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

    // locally --------------------------------
        // LOGIN ===============================
        // show the login form
        app.get('/login', function(req, res) {
            res.render('login.ejs', { message: req.flash('loginMessage') });
        });

        // process the login form
        app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

        // SIGNUP =================================
        // show the signup form
        app.get('/signup', function(req, res) {
            res.render('signup.ejs', { message: req.flash('signupMessage') });
        });

        // process the signup form
        app.post('/signup', passport.authenticate('local-signup', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/signup', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

// =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================
// used to unlink accounts. for social accounts, just remove the token
// for local account, remove email and password
// user account will stay active in case they want to reconnect in the future

    // local -----------------------------------
    app.get('/unlink/local', isLoggedIn, function(req, res) {
        var user            = req.user;
        user.local.email    = undefined;
        user.local.password = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}
