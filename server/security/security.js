const User = require('../models/user.model');
const config = require('../config');
const uuidv1 = require('uuid');

module.exports = function(app, passport) {
  LocalStrategy = require('passport-local').Strategy;
  var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

  var JwtStrategy = require('passport-jwt').Strategy,
      ExtractJwt = require('passport-jwt').ExtractJwt;
  var opts = {}
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = config.jwt.secret;
  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    return done(null, jwt_payload.user);
  }));

  passport.use(new LocalStrategy(
    async function(username, password, done) {
      console.log("passport-local");
      var user = await User.findOne({ username: username }, null, null, { readAll: true })
        .catch(err => { return done(err) } );
      if (user) {
        user.checkPassword(password).then(async valid => {
          if (valid) {
            let userPlain = user.plain();
            let userProfile = await user.getProfile();
            userPlain.profile = userProfile.plain();
            done(null, userPlain);
          } else {
            return done(null, false);
          }
        }).catch(err => { return done(err) } );
      } else {
        done(null, false);
      }
    }
  ));

  passport.use(new GoogleStrategy({
      clientID: config.google.clientID,
      clientSecret: config.google.clientSecret,
      callbackURL: config.app.rootUrl + '/api/auth/google/callback'
    },
    function(token, tokenSecret, profile, done) {
      console.log("passport-google");
      var email = "";
      for (var i = 0; i < profile.emails.length; i++) {
        if (profile.emails[i].type == "account") {
          email = profile.emails[i].value;
        }
      }
      User.findOne({ googleId: profile.id }, function (err, user) {
        if (user) {
          var user = user.plain();
          return done(null, user);
        } else {
          User.findOne({username: email}, function(err, user) {
            if (user) {
              return done(null, null);
            } else {
              var user = new User()
              user.googleId = profile.id;
              user.username = email;
              user.password = uuidv1();
              user.save().then(user => {
                var user = user.plain();
                delete user.password;
                return done(null, user);
              }).catch(err => {
                return done(err, null);
              });
            }
          });
        }
      });
    }
  ));

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.get(id, function(err, user) {
      if (user) {
        done(err, user.plain());
      } else {
        done(null, null);
      }
    });
  });
}
