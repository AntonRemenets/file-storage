import { Module } from '@nestjs/common'
import { FilesService } from './files.service'
import { FilesResolver } from './files.resolver'
import { PrismaService } from '../services/prisma/prisma.service'

@Module({
  providers: [FilesResolver, FilesService, PrismaService],
  exports: [FilesService],
})
export class FilesModule {}
