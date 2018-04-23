const mongoose = require('mongoose')
const Schema = mongoose.Schema

let itemSchema = new Schema ({
  item_name: String,
  item_price: Number,
  item_category: String,
  item_stock: Number,
  img_url: String
},{
  timestamps: true
})

let Item = mongoose.model('Item', itemSchema)

module.exports = Item 