const Item = require('../models/Item')

module.exports = {
  findAll: function (req, res) {
    Item.find()
    .then(items => {
      res.status(200).send({
        message: 'Show all item',
        data: items
      })
    })
    .catch(err => {
      res.status(400).send({
        message: 'No result',
        error: err
      })
    })
  },

  add: function (req, res) {
    let newItem = new Item ({
      item_name: req.body.item_name,
      item_price: req.body.item_price,
      item_category: req.body.item_category,
      item_stock: req.body.item_stock,
      img_url: req.body.img_url
    })

    console.log('HERE', newItem)

    newItem.save()
    .then(success => {
      res.status(201).send({
        message: 'Add item success',
        data: newItem
      })
    })
    .catch(err => {
      res.status(400).send({
        message: 'Add item failed',
        error: err
      })
    })
  },

  uploadImage: function (req, res) {
    res.status(200).send({
      message: 'Upload to storage success',
      link: req.file.cloudStoragePublicUrl
    })
  },

  update: function (req, res) {
    Item.findOneAndUpdate({
      _id: req.params.id
    }, {
      item_name: req.body.item_name,
      item_price: req.body.item_price,
      item_category: req.body.item_category,
      item_stock: req.body.item_stock,
      img_url: req.body.img_url
    })
      .then(response => {
        res.status(201).send({
          message: 'Update success',
          data: req.body
        })
      })
      .catch(error => {
        res.status(400).send({
          message: 'Update failed',
          error: error.message
        })
      })
  },

  remove: function (req, res) {
    Item.deleteOne({
      _id: req.params.id
    })
      .then(response => {
        res.status(200).send({
          message: 'Delete success',
          data: response
        })
      })
      .catch(error => {
        res.status(400).send({
          message: 'Delete failed',
          data: error.message
        })
      })
  }
}