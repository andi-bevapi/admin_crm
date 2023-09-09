import { Module } from '@nestjs/common';
import { PermissionController } from './permission.controller';
import { PermissionService } from './permission.service';
import { Permission } from "./models/permission.entity";
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from 'src/common/common.module';
import { RoleModule } from 'src/role/role.module';
@Module({
  imports: [ 
    TypeOrmModule.forFeature([Permission]),
    CommonModule,
    RoleModule
  ],
  controllers: [PermissionController],
  providers: [PermissionService]
})
export class PermissionModule { }
