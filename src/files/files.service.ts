import { Injectable, InternalServerErrorException } from '@nestjs/common'
import * as path from 'path'
import * as process from 'process'
import * as fs from 'fs'
import { v4 as uuidv4 } from 'uuid'
import { PrismaService } from '../services/prisma/prisma.service'
import { RequestPayload } from '../middleware/request.interface'
import { FileEntity } from './entity/file.entity'

export const MAIN_DIR = () => {
  const dir = path.resolve(process.cwd(), 'root')
  if (fs.existsSync(dir)) {
    return dir
  } else {
    console.log('Главный каталог root не существует')
    process.exit()
  }
}

@Injectable()
export class FilesService {
  constructor(private readonly prisma: PrismaService) {}

  // Создание домашнего каталога
  async createMainDirectory(email: string): Promise<string> {
    const dirName: string = [...email][0] + '-' + uuidv4()
    const dirPath: string = path.join(MAIN_DIR(), dirName)
    fs.mkdir(dirPath, err => {
      if (err) throw err
    })
    return dirName
  }

  // Удаление домашнего католога
  async removeMainDirectory(dirName: string): Promise<boolean> {
    const dirPath: string = path.join(MAIN_DIR(), dirName)
    fs.rm(dirPath, { recursive: true, force: true }, err => {
      if (err) throw err
    })
    return true
  }

  // Сохранение файлов в базе данных
  async saveFiles(
    file: Express.Multer.File,
    request: RequestPayload,
  ): Promise<string> {
    if (await this.findDuplicateFile(file, request)) {
      return file.path
    }
    try {
      await this.prisma.file.create({
        data: {
          fileName: file.originalname,
          path: file.path,
          fileSize: file.size,
          userId: request.user.id,
        },
      })

      return file.path
    } catch (e) {
      console.log(e)
      return null
    }
  }

  // Вернуть количество файлов у пользователя
  async getFilesCount(userId: number): Promise<number> {
    try {
      return await this.prisma.file.count({
        where: { userId },
      })
    } catch (e) {
      throw new InternalServerErrorException()
    }
  }

  // Поиск дубликата файла
  async findDuplicateFile(
    file: Express.Multer.File,
    request: RequestPayload,
  ): Promise<Partial<FileEntity>> {
    return this.prisma.file.findFirst({
      where: {
        fileName: file.originalname,
        fileSize: file.size,
        userId: request.user.id,
      },
    })
  }

  // Вернуть список файлов пользователя
  async getUserFiles(userId: number) {
    return this.prisma.file.findMany({ where: { userId } })
  }
}
