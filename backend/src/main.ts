// Dosya: src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // --- CORS AYARI (Hatanın Çözümü) ---
  app.enableCors({
    origin: '*', // Yıldız (*) demek: "Kim gelirse gelsin kabul et" demektir.
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept, Authorization',
  });

  // Gelen verileri kontrol et
  app.useGlobalPipes(new ValidationPipe());

  // --- PORT AYARI (Bulut Uyumluluğu İçin) ---
  // Koyeb veya Render kendi portunu atamak ister (process.env.PORT).
  // Eğer bulamazsa 3000'i kullanır.
  await app.listen(process.env.PORT || 3000);
  console.log(`Backend çalışıyor!`);
}
bootstrap();