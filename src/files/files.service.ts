import { Injectable } from '@nestjs/common'
import * as path from 'path'
import * as process from 'process'
import * as fs from 'fs'
import { v4 as uuidv4 } from 'uuid'

const MAIN_DIR = () => {
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
  async removeMainDirectory(dirName: string) {
    const dirPath: string = path.join(MAIN_DIR(), dirName)
    fs.rm(dirPath, { recursive: true, force: true }, err => {
      if (err) throw err
    })
    return true
  }
}
