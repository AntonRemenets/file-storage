import { Module } from '@nestjs/common'
import { UploadFileController } from './upload.controller'
import { UploadFileService } from './upload.service'

@Module({
  controllers: [UploadFileController],
  providers: [UploadFileService],
  exports: [],
})
export class UploadFileModule {}
