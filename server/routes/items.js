const router = require('express').Router()
const { add, findAll, uploadImage } = require('../controllers/items_controller')
const { multer, sendUploatdToGCS } = require('../helpers/upload')

router.get('/', findAll)
      .post('/add', add)
      .post('/upload', multer.single('fieldname'), sendUploatdToGCS, uploadImage)

module.exports = router