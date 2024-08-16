const path = require('path')
const multer = require('multer')

var strorage = multer.diskStorage({
    destination: function (req, files, cb) {
        cb(null, 'upload/')
    },
    filename: function (req, file, cb) {
        let ext = path.extname(file.originalname)
        cb(null, Date.now() + ext)
    }
})

var upload = multer({
    storage: strorage,
    fileFilter: function (req, file, callback) {
        console.log(file);
        if (
            file.mimetype === 'image/png' ||
            file.mimetype === 'image/jpg' ||
            file.mimetype === 'image/jpeg'
        ) {
            callback(null, true)
        } else {
            console.log('Only JPG and PNG file supported!');
            callback(null, false)
        }
    },
    limits: {
        fileSize: 1024 * 1024 * 2
    }
})

module.exports = upload