const router = require('express').Router()
const controller = require('../controllers/userController')
const checkAuth = require('../middlewares/checkAuth')

router.post('/signup', controller.postUserSignUp)

router.get('/check/:userid', controller.getUserCheckUserId)

router.post('/login', controller.postUserLogin)

router.get('/', checkAuth, controller.getUser)

module.exports = router
