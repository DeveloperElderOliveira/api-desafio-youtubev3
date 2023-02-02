import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const fileUpload = require("express-fileupload");

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(fileUpload());
  await app.listen(3003);
}
bootstrap();
