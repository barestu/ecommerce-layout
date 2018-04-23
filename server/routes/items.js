const router = require('express').Router()
const { loginAuth, adminAuth } = require('../middleware/auth')
const { add, findAll, uploadImage, update , remove } = require('../controllers/items_controller')
const { multer, sendUploadToGCS } = require('../helpers/upload')

router.get('/', findAll)
      .post('/add', adminAuth, add)
      .post('/upload', adminAuth, multer.single('image_file'), sendUploadToGCS, uploadImage)
      .put('/update/:id', adminAuth, update)
      .delete('/delete/:id', adminAuth, remove)

module.exports = router