import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { UsersModule } from './users/users.module'
import { join } from 'path'
import { AuthModule } from './auth/auth.module'
import { FilesModule } from './files/files.module'
import { UploadFileModule } from './upload/upload.module'
import { JwtModule } from '@nestjs/jwt'
import { RequestMiddleware } from './middleware/request.middleware'
import { DownloadFileModule } from './download/download.module'
import { ServeStaticModule } from '@nestjs/serve-static'

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/',
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: false,
      path: 'api',
      context: ({ req, res }) => ({ req, res }),
      buildSchemaOptions: {
        numberScalarMode: 'integer',
      },
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.EXPIRES_IN },
    }),
    UsersModule,
    AuthModule,
    FilesModule,
    UploadFileModule,
    DownloadFileModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestMiddleware).forRoutes('*')
  }
}
