import { Injectable } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(
    private readonly users: UsersService,
    private readonly jwt: JwtService,
  ) {}

  async registerNewUser(dto) {
    const newUser = await this.users.saveNewUser(dto)
  }

  private generateAccessToken() {
    const accessToken =
      'Bearer ' +
      this.jwt.sign({
        id,
        email,
        roles,
        iat,
      })

    return accessToken
  }
}
