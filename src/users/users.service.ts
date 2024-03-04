import { Injectable } from '@nestjs/common'
import { PrismaService } from '../services/prisma/prisma.service'
import { CreateUserDto } from './dto/create.dto'
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async registerNewUser(dto: CreateUserDto) {
    /*
     * Регистрация нового пользователя
     * 1. Проверяем есть ли такой пользователь в базе, если есть выкидиваем ошибку
     * 2. Валидируем данные
     * 3. Сохраняем пользователя в базе данных
     * */
    const candidate = await this.prisma.user.findFirst({
      where: { email: dto.email },
    })
    if (candidate) {
      throw new Error('Пользователь существует')
    }

    return this.prisma.user.create({
      data: {
        email: dto.email,
        password: await this.hashPassword(dto.password),
      },
    })
  }

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10)
  }
}
