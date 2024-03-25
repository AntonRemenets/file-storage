import { BadRequestException, Injectable } from '@nestjs/common'
import { RequestPayload } from '../middleware/request.interface'
import { Response } from 'express'
import { PrismaService } from '../services/prisma/prisma.service'
import { FilesService } from '../files/files.service'
import { readFileSync } from 'fs'

@Injectable()
export class DownloadFileService {
  constructor(
    private readonly filesService: FilesService,
    private readonly prisma: PrismaService,
  ) {}

  // Загрузка файло по id
  async getFileById(id: number, request: RequestPayload, response: Response) {
    const fileCandidate = await this.prisma.file
      .findUnique({ where: { id } })
      .catch(e => console.log(e))

    if (fileCandidate && fileCandidate.userId === request.user.id) {
      try {
        response.send(readFileSync(fileCandidate.path))
      } catch (e) {
        console.log(e)
        return null
      }
    } else {
      throw new BadRequestException('Файл не найден')
    }
  }
}
