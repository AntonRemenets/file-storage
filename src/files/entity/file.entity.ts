import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class FileEntity {
  @Field(() => String)
  fileName: string

  @Field(() => Number)
  fileSize: number

  @Field(() => Date)
  uploadedAt: Date

  @Field(() => String)
  path: string
}
