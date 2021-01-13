const User = require('../models/User');
const passport = require('passport');

passport.use(User.createStrategy());


passport.serializeUser((user,done) => {
  done(null, user.id)
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id)
  done(null,user)
});


module.exports = passport;
