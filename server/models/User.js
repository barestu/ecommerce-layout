const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const saltRounds = 10

let userSchema = new Schema ({
  username: String,
  password: String,
  role: String
},{
  timestamps: true
})

let User = mongoose.model('User', userSchema)

userSchema.pre('save', function(next) {
  let hash = bcrypt.hashSync(this.password, saltRounds)
  this.password = hash
  next()
})

module.exports = User