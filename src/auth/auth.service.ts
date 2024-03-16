import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { JwtService } from '@nestjs/jwt'
import { CreateUserDto } from '../users/dto/create.dto'
import { User } from '../users/entity/user.entity'
import { AccessToken } from './entity/token.entity'
import { compareSync } from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(
    private readonly users: UsersService,
    private readonly jwt: JwtService,
    //private readonly filesService: FilesService,
  ) {}

  async registerNewUser(dto: CreateUserDto): Promise<User> {
    const user: User = await this.users.saveNewUser(dto)
    if (user) {
      user.accessToken = this.generateAccessToken(user)
      return user
    } else {
      return null
    }
  }

  async loginUser(dto: CreateUserDto): Promise<AccessToken> {
    const user: User = await this.users.getUserByEmail(dto.email)
    if (!user || !compareSync(dto.password, user.password)) {
      throw new UnauthorizedException('Неправильное имя или пароль')
    }
    const accessToken: string = this.generateAccessToken(user)

    return { accessToken }
  }

  private generateAccessToken(user: User): string {
    return (
      'Bearer ' +
      this.jwt.sign({
        email: user.email,
        roles: user.roles,
        mainDirectory: user.mainDirectory,
      })
    )
  }
}
