const router = require('express').Router()
const controller = require('../controllers/orderController')

router.post('/:uid', controller.postOrder)

router.get('/:uid', controller.getOrder)

router.get('/recent/:uid', controller.getRecentOrder)

module.exports = router
