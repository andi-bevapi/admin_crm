import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { PermissionService } from "./permission.service";
import { Permission } from "./models/permission.entity";
import { AuthGuard } from "../auth/guards/auth.guard";
import { HasPermission } from './has-permission.decorator';

@UseGuards(AuthGuard)
@Controller('permission')
export class PermissionController {
    constructor(private readonly permissionService: PermissionService) { }

    @Get()
    @HasPermission('view_permissions')
    public async getAllPermission(): Promise<Permission[]> {
        const result = await this.permissionService.getAllPermission();
        return result
    }

    @Post()
    public async autoLoadPermission(): Promise<Permission[]> {
        const result = await this.permissionService.createAllPermissions();
        return result
    }
}
