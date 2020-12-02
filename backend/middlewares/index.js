exports.catchErrs = ctl => (req, res, next) => ctl(req, res).catch(next)

exports.isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next()
  } else {
    res.status(403).json({
      message: 'You must login'
    })
  }
}