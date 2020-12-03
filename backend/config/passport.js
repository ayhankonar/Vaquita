const User = require('../models/User');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy

passport.use(User.createStrategy());

//GOOGLE AUTH
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: "/auth/google/callback"
    },
    async (_, __, profile, done) => {
      const user = await User.findOne({ googleID: profile.id })

      if (user) {
        return done(null, user)
      }
      const newUser = await User.create({
        googleID: profile.id,
        email: profile.emails[0].value,
        image: profile.photos[0].value
      })
      done(null, newUser)
      return
    }
  )
)


passport.serializeUser((user,done) => {
  console.log(user)
  done(null, user.id)
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id)
  done(null,user)
});


module.exports = passport;
