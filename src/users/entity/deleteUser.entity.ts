import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class DeleteUserEntity {
  @Field()
  status: string
}
