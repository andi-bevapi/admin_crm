import { Injectable } from '@nestjs/common';
import { Permission } from "./models/permission.entity";
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AbsctractService } from "../common/absctract.service";

@Injectable()
export class PermissionService extends AbsctractService {
    constructor(@InjectRepository(Permission) private readonly permissionRepository: Repository<Permission>) { 
        super(permissionRepository)
    }

    public async getAllPermission(): Promise<Permission[]> {
        const result = await this.permissionRepository.find();
        return result
    }

    public async createAllPermissions(): Promise<Permission[]> {

        const permission = [
            { name: 'view_users' },
            { name: 'edit_users' },
            { name: 'view_roles' },
            { name: 'edit_roles' },
            { name: 'view_products' },
            { name: 'edit_products' },
            { name: 'view_orders' },
            { name: 'edit_orders' }
        ];
        const result = await this.permissionRepository.save(permission);
        return result;

    }
}
