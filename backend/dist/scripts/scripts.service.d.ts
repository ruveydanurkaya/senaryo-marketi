import { Repository } from 'typeorm';
import { Script } from '../entities/script.entity';
import { Genre } from '../entities/genre.entity';
import { CreateScriptDto } from './dto/create-script.dto';
export declare class ScriptsService {
    private scriptRepo;
    private genreRepo;
    constructor(scriptRepo: Repository<Script>, genreRepo: Repository<Genre>);
    create(dto: CreateScriptDto, userId: number): Promise<Script>;
    update(id: number, dto: CreateScriptDto, userId: number): Promise<Script>;
    findAll(): Promise<Script[]>;
    findByWriter(userId: number): Promise<Script[]>;
    remove(id: number, userId: number): Promise<Script>;
    createGenre(name: string): Promise<Genre>;
    getAllGenres(): Promise<Genre[]>;
    seedGenres(): Promise<void>;
}
