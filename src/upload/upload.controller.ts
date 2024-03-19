import {
  Controller,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { fileStorage } from './storage'
import { JwtAuthGuard } from '../guards/auth.guard'
import { FilesService } from '../files/files.service'
import * as process from 'process'
import { MaxFilesCount } from '../guards/files.guard'

@Controller('files')
export class UploadFileController {
  constructor(private readonly files: FilesService) {}

  @UseGuards(JwtAuthGuard, MaxFilesCount)
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: fileStorage,
      limits: { fileSize: Number(process.env.MAX_FILE_SIZE) },
    }),
  )
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Req() request: Request,
  ) {
    return await this.files.saveFiles(file, request)
  }
}
