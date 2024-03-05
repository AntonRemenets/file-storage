import { Injectable } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { JwtService } from '@nestjs/jwt'
import { CreateUserDto } from '../users/dto/create.dto'

@Injectable()
export class AuthService {
  constructor(
    private readonly users: UsersService,
    private readonly jwt: JwtService,
  ) {}

  async registerNewUser(dto: CreateUserDto) {
    const user = await this.users.saveNewUser(dto)
    user.accessToken = this.generateAccessToken(user)

    return user
  }

  private generateAccessToken(user) {
    const accessToken =
      'Bearer ' +
      this.jwt.sign({
        id: user.id,
        email: user.email,
      })

    return accessToken
  }
}
