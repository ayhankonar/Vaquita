const express = require('express');
const router = express.Router();
const User = require('../models/User');
const passport = require('../config/passport');
const {isAuth} = require ('../middlewares/index')

router.post('/signup', (req, res, next) => {
  const {password, password2} = req.body
  if (password != password2){
    return res.status(403).json({msg: 'Passwords do not match'})
  } else {
    User.register(req.body, req.body.password)
    .then((user) => res.status(201).json({ user }))
    .catch((err) => res.status(500).json({ err }));
  }
});

router.post('/login', passport.authenticate('local'), (req, res, next) => {
  const { user } = req;
  res.status(200).json({ user });
});

router.get('/logout', (req, res, next) => {
  req.logout();
  res.status(200).json({ msg: 'Logged out' });
});

router.get('/profile', isAuth, (req, res, next) => {
  const {userId}  = req.user._id
  User.findById(userId)
    .then((user) => res.status(200).json({ user }))
    .catch((err) => res.status(500).json({ err }));
});

router.get('/auth/google', passport.authenticate('google', {
  scope: [
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email"
  ]
}))

router.post('/auth/google/callback', (req,res,next) => {
  passport.authenticate('google', (err, user, errDetails)=> {
    if (err) return res.status(500).json({ err, errDetails })
    if (!user) return res.status(401).json({ err, errDetails })

    req.login(user, err => {
      if (err) return res.status(500).json({ err })
      return res.redirect(process.env.FRONTENDPOINT + '/profile')
  })
})(req, res, next)
})

// function isAuth(req, res, next) {
//   req.isAuthenticated() ? next() : res.status(401).json({ msg: 'Log in first' });
// }

module.exports = router;
