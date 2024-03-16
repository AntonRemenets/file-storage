import { diskStorage } from 'multer'
import { MAIN_DIR } from '../files/files.service'

export const fileStorage = diskStorage({
  destination: MAIN_DIR(),
})
