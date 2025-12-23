"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScriptsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const script_entity_1 = require("../entities/script.entity");
const genre_entity_1 = require("../entities/genre.entity");
let ScriptsService = class ScriptsService {
    constructor(scriptRepo, genreRepo) {
        this.scriptRepo = scriptRepo;
        this.genreRepo = genreRepo;
    }
    async create(dto, userId) {
        const genres = await this.genreRepo.findByIds(dto.genreIds);
        const script = this.scriptRepo.create(Object.assign(Object.assign({}, dto), { writer: { id: userId }, genres: genres }));
        return this.scriptRepo.save(script);
    }
    async update(id, dto, userId) {
        const script = await this.scriptRepo.findOne({ where: { id }, relations: ['writer'] });
        if (!script)
            throw new common_1.NotFoundException('Senaryo bulunamadı');
        if (script.writer.id !== userId)
            throw new common_1.ForbiddenException('Bu senaryoyu düzenleme yetkiniz yok');
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
    findByWriter(userId) {
        return this.scriptRepo.find({
            where: { writer: { id: userId } },
            relations: ['genres'],
        });
    }
    async remove(id, userId) {
        const script = await this.scriptRepo.findOne({ where: { id }, relations: ['writer'] });
        if (!script)
            throw new common_1.NotFoundException('Senaryo bulunamadı');
        if (script.writer.id !== userId)
            throw new common_1.ForbiddenException('Yetkisiz işlem');
        return this.scriptRepo.remove(script);
    }
    async createGenre(name) {
        const genre = this.genreRepo.create({ name });
        return this.genreRepo.save(genre);
    }
    async getAllGenres() {
        return this.genreRepo.find();
    }
    async seedGenres() {
        const count = await this.genreRepo.count();
        if (count === 0) {
            await this.genreRepo.save([{ name: 'Dram' }, { name: 'Komedi' }, { name: 'Bilim Kurgu' }]);
        }
    }
};
exports.ScriptsService = ScriptsService;
exports.ScriptsService = ScriptsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(script_entity_1.Script)),
    __param(1, (0, typeorm_1.InjectRepository)(genre_entity_1.Genre)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ScriptsService);
//# sourceMappingURL=scripts.service.js.map