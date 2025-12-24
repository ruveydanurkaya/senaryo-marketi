import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ScriptsModule } from './scripts/scripts.module';
import { User } from './entities/user.entity';
import { Script } from './entities/script.entity';
import { Genre } from './entities/genre.entity';
import { Order } from './entities/order.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
        type: 'postgres', // 1. Türü değiştirdik
        url: process.env.DATABASE_URL, // 2. Bağlantıyı ortam değişkeninden alacak
        autoLoadEntities: true,
        synchronize: true, // Tabloları otomatik oluşturur (Proje ödevi için ideal)
        ssl: {
            rejectUnauthorized: false, // 3. Render/Cloud veritabanları için bu SSL ayarı ŞART
            },
        entities: [User, Script, Category, Order],
    }),
    AuthModule,
    ScriptsModule,
  ],
})
export class AppModule {}