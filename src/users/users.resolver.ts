import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UsersService } from './users.service'
import { User } from './user.entity'
import { CreateUserDto } from './dto/create.dto'

@Resolver('Users')
export class UsersResolver {
  constructor(private readonly users: UsersService) {}

  @Mutation(() => User, { name: 'RegisterUser' })
  async newUser(@Args('registerUserInput') dto: CreateUserDto) {
    return await this.users.registerNewUser(dto)
  }

  @Query(() => String)
  sayHello(): string {
    return 'Hello World!'
  }
}
