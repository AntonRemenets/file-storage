import { Module } from '@nestjs/common'
import { DownloadFileController } from './download.controller'
import { DownloadFileService } from './download.service'
import { FilesService } from '../files/files.service'
import { PrismaService } from '../services/prisma/prisma.service'

@Module({
  controllers: [DownloadFileController],
  providers: [DownloadFileService, FilesService, PrismaService],
})
export class DownloadFileModule {}
