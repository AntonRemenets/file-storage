import { Field, ID, ObjectType } from '@nestjs/graphql'

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

@ObjectType()
export class User {
  @Field(() => ID)
  id: number

  @Field(() => String)
  email: string

  @Field(() => String)
  password: string

  @Field(() => [String])
  roles: string[]

  @Field(() => String)
  mainDirectory: string

  @Field(() => String, { nullable: true })
  accessToken?: string
}
