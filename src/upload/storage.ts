import { diskStorage } from 'multer'
import * as path from 'path'
import { MAIN_DIR } from '../files/files.service'

export const fileStorage = diskStorage({
  destination: function (req: any, file, cb) {
    const destination = path.join(MAIN_DIR(), req.user.mainDirectory)
    cb(null, destination)
  },
  filename: function (req, file, cb) {
    file.originalname = Buffer.from(file.originalname, 'utf8').toString('utf8')
    cb(null, file.originalname)
  },
})
