import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthResolver } from './auth.resolver'
import { JwtModule } from '@nestjs/jwt'
import { UsersService } from '../users/users.service'
import { PrismaService } from '../services/prisma/prisma.service'

@Module({
  providers: [AuthResolver, AuthService, UsersService, PrismaService],
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.EXPIRES_IN },
    }),
  ],
})
export class AuthModule {}
