import { Field, InputType } from '@nestjs/graphql'
import { IsNotEmpty, IsString } from 'class-validator'

@InputType()
export class DeleteUserDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  password: string
}
