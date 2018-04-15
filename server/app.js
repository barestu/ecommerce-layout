const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const cors = require('cors')
const db_user = process.env.DB_USER
const db_pass = process.env.DB_PASS
const port = process.env.PORT || 3000

const userRoute = require('./routes/users')
const itemRoute = require('./routes/items')

mongoose.connect(`mongodb://${db_user}:${db_pass}@ds147905.mlab.com:47905/ecommerce`)
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
  console.log('Connected to database...')
})

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'))

app.get('/', (req, res) => {
  res.send('Ecommerce API Server')
})

app.use('/user', userRoute)
app.use('/item', itemRoute)

app.listen(port, function() {
  console.log('Listening on port', port)
})