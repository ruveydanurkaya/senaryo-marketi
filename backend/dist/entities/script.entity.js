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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Script = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const genre_entity_1 = require("./genre.entity");
let Script = class Script {
};
exports.Script = Script;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Script.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Script.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Script.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)('real'),
    __metadata("design:type", Number)
], Script.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.scripts),
    __metadata("design:type", user_entity_1.User)
], Script.prototype, "writer", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => genre_entity_1.Genre, (genre) => genre.scripts, { cascade: true }),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Script.prototype, "genres", void 0);
exports.Script = Script = __decorate([
    (0, typeorm_1.Entity)()
], Script);
//# sourceMappingURL=script.entity.js.map