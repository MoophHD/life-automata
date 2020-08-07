const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/user.model");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
      scope: ["user:email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;
        const username = profile.username;

        const candidate = await User.findOne({ email, provider: "Github" });
        if (!candidate) {
          const user = new User({ username, email, provider: "Github" });

          await user.save();
        }
      } catch (e) {
        console.log(`An error has occured in password.js middleware, ${e}`);
      }
      done(null, profile);
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: ["user:email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;
        const username = profile.displayName;

        const candidate = await User.findOne({ email, provider: "Google" });

        if (!candidate) {
          const user = new User({ username, email, provider: "Google" });
          await user.save();
        }
      } catch (e) {
        console.log(`An error has occured in password.js middleware, ${e}`);
      }
      done(null, profile);
    }
  )
);

module.exports = passport;
