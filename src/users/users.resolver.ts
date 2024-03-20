import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UsersService } from './users.service'
import { DeleteUserDto } from './dto/delete.dto'
import { DeleteUserEntity } from './entity/deleteUser.entity'
import { Me } from '../decorators/me.decorator'
import { User } from './entity/user.entity'

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  // Удаление пользователя
  @Mutation(() => DeleteUserEntity, { name: 'DeleteUser' })
  async deleteUser(
    @Args('DeleteUserInput') dto: DeleteUserDto,
  ): Promise<DeleteUserEntity> {
    return this.usersService.deleteUser(dto)
  }

  // Информация о пользователе
  @Query(() => User)
  async aboutMe(@Me() id: number): Promise<User> {
    return this.usersService.aboutMe(id)
  }
}
