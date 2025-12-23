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

  // Senaryo Oluşturma (Frontend'den gelen tür ID'leri ile)
  async createScript(createScriptDto: any, writer: User) {
    const { title, content, price, genreIds } = createScriptDto;

    // 1. Frontend'den gelen ID'lere göre türleri bul
    // Örn: Frontend [1, 3] yollar (Dram, Komedi)
    const genres = await this.genreRepository.findByIds(genreIds);

    // 2. Yeni senaryo nesnesini oluştur
    const newScript = this.scriptRepository.create({
      title,
      content,
      price,
      writer: writer, // Şu an giriş yapmış olan kullanıcı (Senarist)
      genres: genres, // M:N ilişki burada kuruluyor
    });

    // 3. Veritabanına kaydet
    return await this.scriptRepository.save(newScript);
  }

  // Tüm senaryoları getir (Marketplace için)
  async findAll() {
    return await this.scriptRepository.find({
      relations: ['genres', 'writer'], // İlişkili verileri de getir
    });
  }
}