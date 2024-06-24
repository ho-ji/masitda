const router = require('express').Router()
const controller = require('../controllers/userController')

router.post('/signup', controller.postUserSignUp)

router.get('/check/:account', controller.getUserCheckAccount)

router.post('/login', controller.postUserLogIn)

router.get('/:uid', controller.getUser)

router.get('/login/:uid', controller.getVerifyToken)

router.post('/orderCount/:uid', controller.postOrderCount)

module.exports = router
