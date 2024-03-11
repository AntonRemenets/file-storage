import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { PrismaService } from '../services/prisma/prisma.service'
import { FilesService } from '../files/files.service'
import { UsersResolver } from './users.resolver'

@Module({
  providers: [UsersResolver, UsersService, FilesService, PrismaService],
  exports: [UsersService],
})
export class UsersModule {}
