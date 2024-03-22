import {
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common'
import { RequestPayload } from '../middleware/request.interface'
import { DownloadFileService } from './download.service'
import { Response } from 'express'

@Controller('download')
export class DownloadFileController {
  constructor(private readonly download: DownloadFileService) {}

  @Post(':id')
  async getFileById(
    @Param('id') id: number,
    @Req() request: RequestPayload,
    @Res() response: Response,
  ) {
    console.log(id)
    if (!request.user) {
      throw new UnauthorizedException()
    }

    return this.download.getFileById(id, request, response)
  }

  @Get()
  async getFileByName() {}
}
