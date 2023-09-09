import { Injectable } from '@nestjs/common';
import { Role } from "./models/role.entity";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AbsctractService } from "../common/absctract.service";

@Injectable()
export class RoleService extends AbsctractService {
    constructor(@InjectRepository(Role) private readonly roleRepository: Repository<Role>) {
        super(roleRepository);
    }
}
