import { NestFactory } from '@nestjs/core';
import * as helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //app.enableCors()
  //app.use(helmet())
  await app.listen(AppModule.port);
}
bootstrap();
