import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CreateUserDto } from '../users/dto/create.dto'
import { AuthService } from './auth.service'
import { AccessToken } from './entity/token.entity'
import { User } from '../users/entity/user.entity'
import { ValidationPipe } from '../exeptions/validation.exeption'
import { UsePipes } from '@nestjs/common'

@Resolver()
export class AuthResolver {
  constructor(private readonly auth: AuthService) {}

  // Регистрация нового пользователя
  @UsePipes(new ValidationPipe())
  @Mutation(() => User, { name: 'RegisterUser' })
  async newUser(@Args('RegisterUserInput') dto: CreateUserDto): Promise<User> {
    return this.auth.registerNewUser(dto)
  }

  // Логин
  @UsePipes(new ValidationPipe())
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
