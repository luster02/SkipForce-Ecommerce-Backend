import { diskStorage } from 'multer'
import { join, extname } from 'path'

export const multerOptions = {
    storage: diskStorage({
        destination: (req, file, cb) => {
            const dirPath = join(__dirname, '/../temp')
            cb(null, dirPath)
        },
        filename: (req, file, cb) => {
            cb(null, file.originalname + extname(file.originalname));
        }
    })
}