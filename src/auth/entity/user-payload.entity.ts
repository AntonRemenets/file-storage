import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class UserPayload {
  @Field(() => ID)
  id: number

  @Field(() => String)
  email: string

  @Field(() => String)
  password: string

  @Field(() => [String])
  roles: string[]

  @Field(() => String, { nullable: true })
  accessToken?: string
}
