import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Script } from './entities/script.entity';
import { Genre } from './entities/genre.entity';
import { User } from './entities/user.entity';

@Injectable()
export class ScriptsService {
  constructor(
    @InjectRepository(Script)
    private scriptRepository: Repository<Script>,
    @InjectRepository(Genre)
    private genreRepository: Repository<Genre>,
  ) {}

  async createScript(createScriptDto: any, writer: User) {
    const { title, content, price, genreIds } = createScriptDto;

    const genres = await this.genreRepository.findByIds(genreIds);

    const newScript = this.scriptRepository.create({
      title,
      content,
      price,
      writer: writer,
      genres: genres,
    });


    return await this.scriptRepository.save(newScript);
  }

  async findAll() {
    return await this.scriptRepository.find({
      relations: ['genres', 'writer'],
    });
  }
}