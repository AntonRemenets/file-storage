import {
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { UploadFileService } from './upload.service'
import { FileInterceptor } from '@nestjs/platform-express'
import { fileStorage } from './storage'
import { JwtAuthGuard } from '../guards/auth.guard'

@Controller('files')
export class UploadFileController {
  constructor(private readonly uploadService: UploadFileService) {}

  @UseGuards(JwtAuthGuard)
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: fileStorage,
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return 'ok'
  }
}
