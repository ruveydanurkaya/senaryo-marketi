import { ScriptsService } from './scripts.service';
import { CreateScriptDto } from './dto/create-script.dto';
export declare class ScriptsController {
    private scriptsService;
    constructor(scriptsService: ScriptsService);
    getAll(): Promise<import("../entities/script.entity").Script[]>;
    seed(): Promise<void>;
    getGenres(): Promise<import("../entities/genre.entity").Genre[]>;
    addGenre(name: string): Promise<import("../entities/genre.entity").Genre>;
    create(dto: CreateScriptDto, req: any): Promise<import("../entities/script.entity").Script>;
    update(id: number, dto: CreateScriptDto, req: any): Promise<import("../entities/script.entity").Script>;
    getMyScripts(req: any): Promise<import("../entities/script.entity").Script[]>;
    deleteScript(id: number, req: any): Promise<import("../entities/script.entity").Script>;
}
