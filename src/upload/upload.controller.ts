import {
  Controller,
  InternalServerErrorException,
  Post,
  Req,
  UnauthorizedException,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { fileStorage } from './storage'
import { FilesService } from '../files/files.service'
import * as process from 'process'
import { MaxFilesCount } from '../guards/files.guard'
import { RequestPayload } from '../middleware/request.interface'

@Controller()
export class UploadFileController {
  constructor(private readonly files: FilesService) {}

  @UseGuards(MaxFilesCount)
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: fileStorage,
      limits: { fileSize: Number(process.env.MAX_FILE_SIZE) },
    }),
  )
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Req() request: RequestPayload,
  ): Promise<string> {
    if (!request.user) {
      throw new UnauthorizedException()
    }
    if (!file) {
      throw new InternalServerErrorException()
    }
    return await this.files.saveFiles(file, request)
  }
}
