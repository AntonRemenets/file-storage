import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common'
import { PrismaService } from '../services/prisma/prisma.service'
import { CreateUserDto } from './dto/create.dto'
import * as bcrypt from 'bcrypt'
import { genSaltSync } from 'bcrypt'
import { Role, User } from './user.entity'

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  // РЕГИСТРАЦИЯ
  // 1. Проверяем есть ли такой пользователь в базе, если есть выкидиваем ошибку
  // 2. Валидируем данные
  // 3. Прверяем на лимит создания ползователей
  // 4. Сохраняем пользователя в базе данных
  async saveNewUser(dto: CreateUserDto): Promise<User> {
    if (await this.getUserByEmail(dto.email)) {
      throw new BadRequestException(
        'Пользователь с такой почтой уже зарегистрирован',
      )
    }
    const userCount: number = await this.prisma.user.count()
    if (userCount >= Number(process.env.LIMITOFUSERS)) {
      throw new ForbiddenException(
        'Превышен лимит на создание пользователей. Обратитсь к администратору.',
      )
    }

    try {
      return this.prisma.user.create({
        data: {
          email: dto.email,
          password: this.hashPassword(dto.password),
          roles: [Role.USER],
        },
      })
    } catch (e) {
      console.log(e)
      return null
    }
  }

  // Вспомогательная функция
  private async getUserByEmail(email: string): Promise<User> {
    return this.prisma.user.findFirst({
      where: { email },
    })
  }

  // Хеширование пароля
  private hashPassword(password: string): string {
    return bcrypt.hashSync(password, genSaltSync(10))
  }
}
