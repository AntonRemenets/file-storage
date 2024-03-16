import { Module } from '@nestjs/common'
import { UploadFileController } from './upload.controller'
import { UploadFileService } from './upload.service'
import { JwtAuthGuard } from '../guards/auth.guard'
import { JwtService } from '@nestjs/jwt'

@Module({
  controllers: [UploadFileController],
  providers: [UploadFileService, JwtAuthGuard, JwtService],
})
export class UploadFileModule {}
