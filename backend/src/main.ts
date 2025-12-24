import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. CORS AYARI: Frontend'in (Vercel) bağlanabilmesi için izin veriyoruz
  app.enableCors({
    origin: true, // Gelen isteğin kaynağına (Vercel) güven
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // 2. PORT AYARI: Koyeb'in uygulamayı görebilmesi için '0.0.0.0' ŞARTTIR!
  // Bunu yazmazsak uygulama sadece kendine çalışır, Koyeb "No active service" der.
  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0');

  console.log(`Backend ${port} portunda ve 0.0.0.0 adresinde yayında!`);
}
bootstrap();