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
      type: 'sqlite', // Veri tabanı tipi sqlite
      database: 'market.db', // Oluşacak veritabanı dosyasının adı
      entities: [User, Script, Genre, Order],
      synchronize: true, // Tabloları otomatik oluşturur
    }),
    AuthModule,
    ScriptsModule,
  ],
})
export class AppModule {}