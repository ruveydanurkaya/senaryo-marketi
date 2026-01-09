import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Script } from '../entities/script.entity';
import { Genre } from '../entities/genre.entity';
import { User } from '../entities/user.entity';
import { CreateScriptDto } from './dto/create-script.dto';

@Injectable()
export class ScriptsService {
  constructor(
    @InjectRepository(Script) private scriptRepo: Repository<Script>,
    @InjectRepository(Genre) private genreRepo: Repository<Genre>,
  ) {}

  async create(dto: CreateScriptDto, userId: number) {
    const genres = await this.genreRepo.findByIds(dto.genreIds);
    const script = this.scriptRepo.create({
      ...dto,
      writer: { id: userId } as User,
      genres: genres,
    });
    return this.scriptRepo.save(script);
  }

  async update(id: number, dto: CreateScriptDto, userId: number) {
    const script = await this.scriptRepo.findOne({ where: { id }, relations: ['writer'] });
    if (!script) throw new NotFoundException('Senaryo bulunamadı');
    if (script.writer.id !== userId) throw new ForbiddenException('Bu senaryoyu düzenleme yetkiniz yok');

    script.title = dto.title;
    script.content = dto.content;
    script.price = dto.price;

    if (dto.genreIds) {
      const genres = await this.genreRepo.findByIds(dto.genreIds);
      script.genres = genres;
    }

    return this.scriptRepo.save(script);
  }


  findAll() {
    return this.scriptRepo.find({ relations: ['genres', 'writer'] });
  }

  findByWriter(userId: number) {
    return this.scriptRepo.find({
      where: { writer: { id: userId } },
      relations: ['genres'],
    });
  }

  async remove(id: number, userId: number) {
    const script = await this.scriptRepo.findOne({ where: { id }, relations: ['writer'] });
    if (!script) throw new NotFoundException('Senaryo bulunamadı');
    if (script.writer.id !== userId) throw new ForbiddenException('Yetkisiz işlem');
    return this.scriptRepo.remove(script);
  }

  async createGenre(name: string) {
    const genre = this.genreRepo.create({ name });
    return this.genreRepo.save(genre);
  }
  
  async getAllGenres() {
    return this.genreRepo.find();
  }

  async seedGenres() {
    const count = await this.genreRepo.count();
    if (count === 0) {
        await this.genreRepo.save([{name: 'Dram'}, {name: 'Komedi'}, {name: 'Bilim Kurgu'}]);
    }
  }
}