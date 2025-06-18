"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudyGroupModule = void 0;
const common_1 = require("@nestjs/common");
const StudyGroup_controller_1 = require("./StudyGroup.controller");
const StudyGroup_service_1 = require("./StudyGroup.service");
const typeorm_1 = require("@nestjs/typeorm");
const StudyGroup_entity_1 = require("./StudyGroup.entity");
const user_module_1 = require("../../tempUser/user.module");
let StudyGroupModule = class StudyGroupModule {
};
exports.StudyGroupModule = StudyGroupModule;
exports.StudyGroupModule = StudyGroupModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([StudyGroup_entity_1.StudyGroup]), user_module_1.UserModule],
        controllers: [StudyGroup_controller_1.StudyGroupController],
        providers: [StudyGroup_service_1.StudyGroupService],
    })
], StudyGroupModule);
//# sourceMappingURL=StudyGroup.module.js.map