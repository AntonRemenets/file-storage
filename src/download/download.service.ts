import { Injectable } from '@nestjs/common'
import { RequestPayload } from '../middleware/request.interface'
import { Response } from 'express'
import { PrismaService } from '../services/prisma/prisma.service'
import { FilesService } from '../files/files.service'

@Injectable()
export class DownloadFileService {
  constructor(
    private readonly filesService: FilesService,
    private readonly prisma: PrismaService,
  ) {}

  async getFileById(id: number, request: RequestPayload, response: Response) {
    const userFiles = await this.filesService.getUserFiles(request.user.id)
    console.log(userFiles)
    return 'ok'
  }

  // async getUserFiles(userId: number) {
  //   return this.prisma.file.findMany({ where: { userId } })
  // }
}
