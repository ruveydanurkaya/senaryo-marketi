import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ScriptsModule } from './scripts/scripts.module';
import { User } from './entities/user.entity';
import { Script } from './entities/script.entity';
import { Genre } from './entities/genre.entity';
import { Order } from './entities/order.entity';

// --- AYARLARI BURADA HAZIRLIYORUZ ---
const dbConfig: TypeOrmModuleOptions = process.env.DATABASE_URL
  ? {
      // CANLI ORTAM (PostgreSQL)
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true,
      ssl: {
        rejectUnauthorized: false,
      },
    }
  : {
      // LOKAL ORTAM (SQLite)
      type: 'sqlite',
      database: 'db.sqlite',
      autoLoadEntities: true,
      synchronize: true,
    };

@Module({
  imports: [
    // Hazırladığımız ayarı buraya veriyoruz
    TypeOrmModule.forRoot(dbConfig),
    AuthModule,
    ScriptsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}