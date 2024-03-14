import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common'
import { UploadFileService } from './upload.service'
import { FileInterceptor } from '@nestjs/platform-express'

@Controller()
export class UploadFileController {
  constructor(private readonly uploadService: UploadFileService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file)
  }
}
