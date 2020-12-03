const User = require('../models/User')

exports.updateProfile = async (req, res) => {
  const { userId } = req.params
  const { 
    email,
    userName,
    firstName,
    lastName,
    googleID,
    image
  } = req.body
  const updatedProfile = await User.findByIdAndUpdate(userId, {
    email,
    userName,
    firstName,
    lastName,
    googleID,
    image
  }, {new: true})

  res.status(200).json(updatedProfile)
}