const router = require('express').Router()
const { add, findAll, uploadImage } = require('../controllers/items_controller')
const { multer, sendUploadToGCS } = require('../helpers/upload')

router.get('/', findAll)
      .post('/add', add)
      .post('/upload', multer.single('image_file'), sendUploadToGCS, uploadImage)

module.exports = router