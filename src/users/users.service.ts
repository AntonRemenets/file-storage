import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { PrismaService } from '../services/prisma/prisma.service'
import { CreateUserDto } from './dto/create.dto'
import * as bcrypt from 'bcrypt'
import { genSaltSync } from 'bcrypt'
import { Role, User } from './entity/user.entity'
import { FilesService } from '../files/files.service'
import { DeleteUserEntity } from './entity/deleteUser.entity'
import { RequestPayload } from '../middleware/request.interface'

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly files: FilesService,
  ) {}

  // РЕГИСТРАЦИЯ
  // 1. Проверяем есть ли такой пользователь в базе, если есть выкидиваем ошибку
  // 2. Валидируем данные
  // 3. Прверяем на лимит создания ползователей
  // 4. Сохраняем пользователя в базе данных
  // 5. Сохраняем имя папки в базе данных
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
    const dirName: string = await this.files
      .createMainDirectory(dto.email)
      .catch(err => {
        throw new Error(err)
      })

    try {
      return this.prisma.user.create({
        data: {
          email: dto.email,
          password: this.hashPassword(dto.password),
          roles: [Role.USER],
          mainDirectory: dirName,
        },
      })
    } catch (e) {
      console.log(e)
      return null
    }
  }

  // Информация о пользователе
  async aboutMe(id: number): Promise<User> {
    if (!id) {
      throw new UnauthorizedException('Не авторизован')
    }
    try {
      return this.prisma.user.findUnique({
        where: { id },
        include: { files: true },
      })
    } catch (e) {
      console.log(e)
    }
  }

  // Удаление пользователя
  async deleteUser(
    request: RequestPayload,
    password: string,
  ): Promise<DeleteUserEntity> {
    if (!request.user) {
      throw new UnauthorizedException()
    }
    const _user: User = await this.getUserByEmail(request.user.email)
    if (!_user) {
      throw new BadRequestException('Пользователь не найден')
    }
    const result: boolean = bcrypt.compareSync(password, _user.password)
    if (!result) {
      return { status: 'Неправильный пароль' }
    }
    const rmDir = await this.files.removeMainDirectory(
      request.user.mainDirectory,
    )
    if (rmDir) {
      await this.prisma.user.delete({
        where: { id: request.user.id },
      })
      request['user'] = undefined
      return { status: 'Пользователь удален' }
    } else {
      return { status: 'Что-то пошло не так' }
    }
  }

  // Вспомогательная функция
  async getUserByEmail(email: string): Promise<User> {
    return this.prisma.user.findFirst({
      where: { email },
    })
  }

  // Хеширование пароля
  private hashPassword(password: string): string {
    return bcrypt.hashSync(password, genSaltSync(10))
  }
}
