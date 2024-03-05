import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

@Resolver('Auth')
export class AuthResolver {
  constructor() {}

  // Регистрация нового пользователя
  @Mutation(() => User, { name: 'RegisterUser' })
  async newUser(@Args('RegisterUserInput') dto: CreateUserDto) {
    return 'OK'
  }

  @Query(() => String)
  sayHello(): string {
    return 'Hello World!'
  }
}
