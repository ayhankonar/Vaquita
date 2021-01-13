const User = require('../models/User')
const Rifa = require("../models/Rifa");
const Ticket = require("../models/Ticket")

exports.profileView = async (req, res, next) => {
  const user = await User.findById(req.user._id)
  res.status(200).json(user)
}


exports.updateProfile = async (req, res) => {
  const { user: { id } } = req
  // const { userId } = req.params
  const { 
    email,
    userName,
    firstName,
    lastName,
    city,
    country,
    image,
    rifas,
    tickets
  } = req.body

  const updatedProfile = await User.findByIdAndUpdate(id, {
    email,
    userName,
    firstName,
    lastName,
    city,
    country,
    image,
    rifas,
    tickets
  }, {new: true})
  
  res.status(200).json(updatedProfile)
}

exports.deleteProfile = async (req, res, next) => {
  await User.findByIdAndRemove(req.user._id)
  res.redirect('/signup')
}