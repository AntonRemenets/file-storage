import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthResolver } from './auth.resolver'
import { UsersService } from '../users/users.service'
import { PrismaService } from '../services/prisma/prisma.service'
import { FilesService } from '../files/files.service'

@Module({
  providers: [
    AuthResolver,
    AuthService,
    UsersService,
    PrismaService,
    FilesService,
  ],
  imports: [],
})
export class AuthModule {}
