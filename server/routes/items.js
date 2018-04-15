const router = require('express').Router()
const { add, findAll } = require('../controllers/items_controller')

router.get('/', findAll)
      .post('/add', add)

module.exports = router