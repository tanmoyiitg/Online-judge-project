const express = require('express')
const AuthRouter = express.Router()
const Register = require('../Controllers/Register')
const LogIn = require('../Controllers/LogIn')
const { Profile, Logout } = require('../Controllers/Profile')
AuthRouter.post('/register', Register)
AuthRouter.post('/login', LogIn)
AuthRouter.get('/profile', Profile)
AuthRouter.post('/logout', Logout)

module.exports = AuthRouter;