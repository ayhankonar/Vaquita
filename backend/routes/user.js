const express = require('express')
const router = express.Router()
const User = require('../models/User')
const passport = require('../config/passport')
const {profileView, updateProfile, deleteProfile} = require('../controllers/user')
const {isAuth} = require ('../middlewares/index')

//PREFIX: "profile"
router.get('/', isAuth, profileView)
router.put('/edit/:id', updateProfile)
router.delete('/edit/:id', deleteProfile)

module.exports = router;