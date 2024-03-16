import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { UsersModule } from './users/users.module'
import { join } from 'path'
import { AuthModule } from './auth/auth.module'
import { FilesModule } from './files/files.module'
import { UploadFileModule } from './upload/upload.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: false,
      path: 'api',
      buildSchemaOptions: {
        numberScalarMode: 'integer',
      },
    }),
    UsersModule,
    AuthModule,
    FilesModule,
    UploadFileModule,
  ],
})
export class AppModule {}
