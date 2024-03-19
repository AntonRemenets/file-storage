import { Module } from '@nestjs/common'
import { UploadFileController } from './upload.controller'
import { UploadFileService } from './upload.service'
import { JwtAuthGuard } from '../guards/auth.guard'
import { JwtService } from '@nestjs/jwt'
import { FilesService } from '../files/files.service'
import { PrismaService } from '../services/prisma/prisma.service'

@Module({
  controllers: [UploadFileController],
  providers: [
    UploadFileService,
    JwtAuthGuard,
    JwtService,
    FilesService,
    PrismaService,
  ],
})
export class UploadFileModule {}
