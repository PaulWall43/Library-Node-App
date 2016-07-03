var passport = require('passport');

module.exports = function(app){
    app.use(passport.initialize());
    app.use(passport.session());
    //serializeUser to bundle user up for later
    //deserialize, pull user back out of the session
    //needs strategy, passport-local (local authentication)
    //passport-googe, facebook, oAuth
    passport.serializeUser(function(user, done){
        done(null, user); //this must match
    });

    //this must match
    passport.deserializeUser(function(user, done){
        done(null, user);
    });

    require('./strategies/local.strategy')();
};
