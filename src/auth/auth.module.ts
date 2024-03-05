import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthResolver } from './auth.resolver'
import { UsersService } from '../users/users.service'
import { JwtModule } from '@nestjs/jwt'

@Module({
  providers: [AuthResolver, AuthService],
  imports: [
    UsersService,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.EXPIRES_IN },
    }),
  ],
})
export class AuthModule {}
