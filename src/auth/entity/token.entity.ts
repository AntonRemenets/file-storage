import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class AccessToken {
  @Field(() => String)
  accessToken: string
}
