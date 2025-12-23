import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScriptsService } from './scripts.service';
import { ScriptsController } from './scripts.controller';
import { Script } from '../entities/script.entity';
import { Genre } from '../entities/genre.entity';

@Module({
    //Bu modül içinde Script ve Genre tablolarını kullanacağımızı belirtiyoruz.
    // Entity'leri buraya tanıtmazsak hata verir
  imports: [TypeOrmModule.forFeature([Script, Genre])],
  controllers: [ScriptsController],
  providers: [ScriptsService],
})
export class ScriptsModule {}