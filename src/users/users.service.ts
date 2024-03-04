import { Injectable } from '@nestjs/common'
import { PrismaService } from '../services/prisma/prisma.service'
import { CreateUserDto } from './dto/create.dto'
import * as bcrypt from 'bcrypt'
import { User } from './user.entity'

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  // Регистрация нового пользователя
  async registerNewUser(dto: CreateUserDto): Promise<Partial<User>> {
    // 1. Проверяем есть ли такой пользователь в базе, если есть выкидиваем ошибку
    // 2. Валидируем данные
    // 3. Сохраняем пользователя в базе данных
    // 4. Выдаем акцесс токен
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

  // Логин
  async loginUser() {}

  // Логаут
  async logoutUser() {}

  // Хеширование пароля
  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10)
  }
}
