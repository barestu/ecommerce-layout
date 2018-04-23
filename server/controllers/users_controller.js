const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const secret = process.env.SECRET

module.exports = {
  register: function (req, res) {
    let newUser = new User ({
      username: req.body.username,
      password: req.body.password,
      role: req.body.role
    })

    newUser.save()
    .then(success => {
      res.status(201).send({
        message: 'Register user success',
        data: newUser
      })
    })
    .catch(err => {
      res.status(400).send({
        message: 'Register user failed',
        detail: err.message
      })
    })
  },

  login: function (req, res) {
    User.findOne({
      username: req.body.username
    })
    .then(user => {
      let checkLogin = bcrypt.compareSync(req.body.password, user.password)

      if (checkLogin == true) {
        let token = jwt.sign({
          token: user._id,
          username: user.username,
          role: user.role
        }, secret)
  
        res.status(200).send({
          message: 'Login success',
          token: token
        })
      } else {
        res.status(400).send({
          message: 'Login failed',
          detail: err.message
        })
      }
    })
    .catch(err => {
      console.log('not found', err)

      res.status(400).send({
        message: 'Login failed',
        detail: err.message
      })
    })
  }
}