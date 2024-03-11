import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { UsersService } from './users.service'
import { DeleteUserDto } from './dto/delete.dto'
import { DeleteUserEntity } from './entity/deleteUser.entity'

@Resolver('users')
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  // Удаление пользователя
  @Mutation(() => DeleteUserEntity, { name: 'DeleteUser' })
  async deleteUser(@Args('DeleteUserInput') dto: DeleteUserDto) {
    return this.usersService.deleteUser(dto)
  }
}
