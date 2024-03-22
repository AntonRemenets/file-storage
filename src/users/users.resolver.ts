import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UsersService } from './users.service'
import { DeleteUserEntity } from './entity/deleteUser.entity'
import { User } from './entity/user.entity'
import { RequestPayload } from '../middleware/request.interface'
import { DeleteUserDto } from './dto/delete.dto'
import { UnauthorizedException, UsePipes, ValidationPipe } from '@nestjs/common'

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  // Удаление пользователя
  @UsePipes(new ValidationPipe())
  @Mutation(() => DeleteUserEntity, { name: 'DeleteUser' })
  async deleteUser(
    @Args('PasswordInput') dto: DeleteUserDto,
    @Context('req') request: RequestPayload,
  ): Promise<DeleteUserEntity> {
    if (!request.user) {
      throw new UnauthorizedException()
    }
    return this.usersService.deleteUser(request, dto.password)
  }

  // Информация о пользователе
  @Query(() => User)
  async getInformationAboutMe(@Context('req') request: RequestPayload) {
    if (!request.user) {
      throw new UnauthorizedException()
    }
    return this.usersService.aboutMe(request.user.id)
  }
}
