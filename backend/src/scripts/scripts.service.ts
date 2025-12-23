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

  // --- SENARYO OLUŞTURMA ---
  async create(dto: CreateScriptDto, userId: number) {
    const genres = await this.genreRepo.findByIds(dto.genreIds); //1. Genre ID'leri buluyoruz.
    const script = this.scriptRepo.create({ // 2. Senaryo objesini hazırlıyoruz.
      ...dto,
      writer: { id: userId } as User,
      genres: genres,
    });
    // 3. Veritabanına return ediyoruz.
    return this.scriptRepo.save(script);
  }

  // GÜNCELLEME METODU
  async update(id: number, dto: CreateScriptDto, userId: number) {
      // 1. Önce güncellenecek senaryoyu ve yazarını buluyoruz.
    const script = await this.scriptRepo.findOne({ where: { id }, relations: ['writer'] });
    // 2. Senaryo yoksa 404 hatası
    if (!script) throw new NotFoundException('Senaryo bulunamadı');
    // 3. GÜVENLİK KONTROLÜ: İstek atan kişi, senaryonun sahibi mi?
    if (script.writer.id !== userId) throw new ForbiddenException('Bu senaryoyu düzenleme yetkiniz yok');

    // 4. Alanları yeni verilerle güncelle.
    script.title = dto.title;
    script.content = dto.content;
    script.price = dto.price;

    // 5. Türleri güncelle.
    if (dto.genreIds) {
      const genres = await this.genreRepo.findByIds(dto.genreIds);
      script.genres = genres;
    }

    // 6. Güncel halini return et.
    return this.scriptRepo.save(script);
  }

  // VİTRİN (Tüm seneryo)
  findAll() {
    return this.scriptRepo.find({ relations: ['genres', 'writer'] }); //yazar ve türü getiriyor.
  }

  //Yazarın kendi seneryoları
  findByWriter(userId: number) {
    return this.scriptRepo.find({
      where: { writer: { id: userId } },
      relations: ['genres'],
    });
  }

  //---SİLME---
  async remove(id: number, userId: number) {
    const script = await this.scriptRepo.findOne({ where: { id }, relations: ['writer'] });
    if (!script) throw new NotFoundException('Senaryo bulunamadı');
    //sahiplik kontrolü
    if (script.writer.id !== userId) throw new ForbiddenException('Yetkisiz işlem');
    return this.scriptRepo.remove(script);
  }

  //YARDIMCI METOTLAR
  async createGenre(name: string) {
    const genre = this.genreRepo.create({ name });
    return this.genreRepo.save(genre);
  }
  
  async getAllGenres() {
    return this.genreRepo.find();
  }

  // Veritabanı boşsa varsayılan türleri ekler (Seed)
  async seedGenres() {
    const count = await this.genreRepo.count();
    if (count === 0) {
        await this.genreRepo.save([{name: 'Dram'}, {name: 'Komedi'}, {name: 'Bilim Kurgu'}]);
    }
  }
}