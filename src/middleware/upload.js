import multer from 'multer'
import path from 'path'

const upload = multer({
    storage: multer.memoryStorage(),

    limits: {
        fileSize: 2 * 1024 * 1024
    },

    fileFilter: (req, file, cb) => {

        const extension = path.extname(file.originalname).toLowerCase()

        if (extension === '.json') {
            cb(null, true)
        } else {
            cb(new Error('Only JSON files are allowed'))
        }
    }
})

export default upload