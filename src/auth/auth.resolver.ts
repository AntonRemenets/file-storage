import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CreateUserDto } from '../users/dto/create.dto'
import { AuthService } from './auth.service'
import { AccessToken } from './entity/token.entity'
import { User } from '../users/entity/user.entity'

@Resolver()
export class AuthResolver {
  constructor(private readonly auth: AuthService) {}

  // Регистрация нового пользователя
  @Mutation(() => User, { name: 'RegisterUser' })
  async newUser(@Args('RegisterUserInput') dto: CreateUserDto): Promise<User> {
    return this.auth.registerNewUser(dto)
  }

  // Логин
  @Mutation(() => AccessToken, { name: 'LoginUser' })
  async login(
    @Args('LoginUserInput') dto: CreateUserDto,
  ): Promise<AccessToken> {
    return this.auth.loginUser(dto)
  }

  @Query(() => String)
  sayHello(): string {
    return 'Hello World!'
  }
}
