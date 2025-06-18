"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BulletinModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const BulletinBoard_entity_1 = require("./BulletinBoard.entity");
const BulletinBoard_service_1 = require("./BulletinBoard.service");
const BulletinBoard_controller_1 = require("./BulletinBoard.controller");
const user_module_1 = require("../../tempUser/user.module");
let BulletinModule = class BulletinModule {
};
exports.BulletinModule = BulletinModule;
exports.BulletinModule = BulletinModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([BulletinBoard_entity_1.BulletinBoard]), user_module_1.UserModule],
        providers: [BulletinBoard_service_1.BulletinService],
        controllers: [BulletinBoard_controller_1.BulletinController],
    })
], BulletinModule);
//# sourceMappingURL=BulletinBoard.module.js.map