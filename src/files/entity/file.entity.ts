import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class FileEntity {
  @Field(() => Number)
  id: number

  @Field(() => String)
  fileName: string

  @Field(() => Number)
  fileSize: number

  @Field(() => Date)
  createdAt: Date

  @Field(() => String)
  path: string
}
