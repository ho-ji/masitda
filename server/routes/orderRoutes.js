const router = require('express').Router()
const controller = require('../controllers/orderController')

router.post('/:uid', controller.postOrder)

router.get('/:uid', controller.getOrder)

module.exports = router
