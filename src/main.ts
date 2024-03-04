import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from './exeptions/validation.exeption'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const PORT: number = parseInt(process.env.PORT)

  app.useGlobalPipes(new ValidationPipe())

  await app.listen(PORT, () => console.log(`Server ready at port ${PORT}`))
}

bootstrap()
