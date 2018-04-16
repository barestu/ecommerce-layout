const Multer = require('multer')
const Storage = require('@google-cloud/storage')

const CloudBucket = process.env.GCS_BUCKET

const storage = Storage ({
  projectId: process.env.GCS_PROJECTID,
  keyFilename: process.env.GCS_KEYFILE_PATH
})

const bucket = storage.bucket(CloudBucket)

const getPublicUrl = function (filename) {
  return `https://storage.googleapis.com/${CloudBucket}/${filename}`
}

const sendUploatdToGCS = function (req, res, next) {
  console.log(req.body)

  if (!req.file) {
    return next()
  } else {
    let gcsfilename = new Date().toISOString() + req.file.originalname

    const stream = file.createWriteStream({
      metadata: {
        contentType: req.file.mimetype
      }
    })

    stream.on('error', (err) => {
      req.file.cloudStorageError = err
      next(err)
    })

    stream.on('finish', () => {
      req.file.cloudStorageError = gcsfilename
      file.makePublic().then( () => {
        req.file.cloudStorageError = getPublicUrl(gcsfilename)
        next()
      })
    })

    stream.end(req.file.buffer)
  }
}

const multer = Multer ({
  storage: Multer.memoryStorage,
  limits: {
    fileSize: 50 * 1024 * 1024
  }
})

module.exports = {
  getPublicUrl,
  sendUploatdToGCS,
  multer
}