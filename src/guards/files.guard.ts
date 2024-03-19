import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common'
import { FilesService } from '../files/files.service'
import * as process from 'process'

@Injectable()
export class MaxFilesCount implements CanActivate {
  constructor(private readonly files: FilesService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest()
    const userId: number = Number(request.user.id)
    const filesCount = await this.files.getFilesCount(userId)
    if (filesCount >= Number(process.env.MAX_FILES_COUNT)) {
      throw new BadRequestException('Превышен лимит на загрузку файлов')
    }

    return true
  }
}
