const router = require('express').Router()
const { register, login } = require('../controllers/users_controller')

router.post('/register', register)
      .post('/login', login)

module.exports = router