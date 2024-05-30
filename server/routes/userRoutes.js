const router = require('express').Router()
const controller = require('../controllers/userController')
const checkAuth = require('../middlewares/checkAuth')

router.post('/signup', controller.postUserSignUp)

router.get('/check/:account', controller.getUserCheckAccount)

router.post('/login', controller.postUserLogIn)

router.get('/', checkAuth, controller.getUser)

module.exports = router
