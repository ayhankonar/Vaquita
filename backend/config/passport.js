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
    async (_, __, { id, emails, photos }, done) => {
      const user = await User.findOne({ googleID: id })
  
      if (!user) {
        const newUser = await User.create({
          googleID: id,
          email: emails[0].value,
          image: photos[0].value
        })
        done(null, newUser)
        return;
      }
  
      done(null, user);
    }
  ));


passport.serializeUser((user,done) => {
  console.log(user)
  done(null, user.id)
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id)
  done(null,user)
});


module.exports = passport;
