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
exports.ScriptsController = void 0;
const common_1 = require("@nestjs/common");
const scripts_service_1 = require("./scripts.service");
const passport_1 = require("@nestjs/passport");
const create_script_dto_1 = require("./dto/create-script.dto");
let ScriptsController = class ScriptsController {
    constructor(scriptsService) {
        this.scriptsService = scriptsService;
    }
    getAll() { return this.scriptsService.findAll(); }
    seed() { return this.scriptsService.seedGenres(); }
    getGenres() { return this.scriptsService.getAllGenres(); }
    addGenre(name) { return this.scriptsService.createGenre(name); }
    create(dto, req) {
        return this.scriptsService.create(dto, req.user.userId);
    }
    update(id, dto, req) {
        return this.scriptsService.update(id, dto, req.user.userId);
    }
    getMyScripts(req) {
        return this.scriptsService.findByWriter(req.user.userId);
    }
    deleteScript(id, req) {
        return this.scriptsService.remove(id, req.user.userId);
    }
};
exports.ScriptsController = ScriptsController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ScriptsController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)('seed'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ScriptsController.prototype, "seed", null);
__decorate([
    (0, common_1.Get)('genres'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ScriptsController.prototype, "getGenres", null);
__decorate([
    (0, common_1.Post)('genres'),
    __param(0, (0, common_1.Body)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ScriptsController.prototype, "addGenre", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_script_dto_1.CreateScriptDto, Object]),
    __metadata("design:returntype", void 0)
], ScriptsController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_script_dto_1.CreateScriptDto, Object]),
    __metadata("design:returntype", void 0)
], ScriptsController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Get)('my-scripts'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ScriptsController.prototype, "getMyScripts", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], ScriptsController.prototype, "deleteScript", null);
exports.ScriptsController = ScriptsController = __decorate([
    (0, common_1.Controller)('scripts'),
    __metadata("design:paramtypes", [scripts_service_1.ScriptsService])
], ScriptsController);
//# sourceMappingURL=scripts.controller.js.map