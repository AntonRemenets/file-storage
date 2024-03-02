import { Injectable } from '@nestjs/common'
import { PrismaService } from '../services/prisma.service'
import { CreateUserDto } from './dto/create.dto'

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async registerNewUser(dto: CreateUserDto) {
    return this.prisma.user.create({
      data: {
        email: dto.email,
        password: dto.password,
      },
    })
  }
}
