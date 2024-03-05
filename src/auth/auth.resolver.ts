import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CreateUserDto } from '../users/dto/create.dto'
import { AuthService } from './auth.service'
import { UserPayload } from './entity/user-payload.entity'

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly auth: AuthService) {}

  // Регистрация нового пользователя
  @Mutation(() => UserPayload, { name: 'RegisterUser' })
  async newUser(@Args('RegisterUserInput') dto: CreateUserDto) {
    return this.auth.registerNewUser(dto)
  }

  @Query(() => String)
  sayHello(): string {
    return 'Hello World!'
  }
}
