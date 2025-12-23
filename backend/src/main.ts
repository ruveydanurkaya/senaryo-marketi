// Sunucuda (Server) çalışır. -Backend-
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Frontend'den gelen isteklere izin ver (CORS)
  app.enableCors();

  // Gelen verileri kontrol et (DTO doğrulama)
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
  console.log(`Backend 3000 portunda çalışıyor!`);
}
bootstrap();