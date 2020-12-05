const express = require('express')
const router = express.Router()
const User = require('../models/User')
const passport = require('../config/passport')
const {updateProfile} = require('../controllers/user')

const { isAuth, catchErrs } = require('../middlewares')

router.put('/profile/edit/:id', updateProfile)