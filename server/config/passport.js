const UserModel = require("../models/user.model");
const LocalStrategy = require("passport-local");

const initialize = (passport) => {
  passport.use(
    new LocalStrategy(
      { usernameField: "email", passwordField: "password" },
      function (username, password, done) {
        UserModel.findOne({ email: username }, function (err, user) {
          if (err) {
            return done(null, { error: message });
          }
          if (!user) {
            return done(null, false, { message: "Incorrect username." });
          }
          if (!user.validPassword(password)) {
            return done(null, false, { message: "Incorrect password." });
          }
          return done(null, user);
        });
      }
    )
  );
  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (user, done) {
    done(null, user);
  });
};

module.exports = initialize;
