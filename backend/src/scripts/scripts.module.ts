import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScriptsService } from './scripts.service';
import { ScriptsController } from './scripts.controller';
import { Script } from '../entities/script.entity';
import { Genre } from '../entities/genre.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Script, Genre])],
  controllers: [ScriptsController],
  providers: [ScriptsService],
})
export class ScriptsModule {}