import { Controller, Get, Post, Body, Param, ParseIntPipe, Delete, Put, UseGuards } from '@nestjs/common';
import { RoleService } from "./role.service";
import { Role } from "./models/role.entity";
import { RoleDto } from "./models/role.dto";
import { AuthGuard } from "../auth/guards/auth.guard";
import { HasPermission } from 'src/permission/has-permission.decorator';

@UseGuards(AuthGuard)
@HasPermission('roles')
@Controller('roles')
export class RoleController {

    constructor(private roleService: RoleService) { }

    @Get()
    public async getAllRole(): Promise<Role[]> {
        const result = await this.roleService.getAll();
        return result;
    }

    @Post()
    public async createRole(
        @Body() bodyParam: RoleDto,
        @Body('permissions') ids: number[]
    ) {

        const result = await this.roleService.create({
            name: bodyParam,
            permissions: ids.map((id) => { return { id } })
        });
        return result;
    }

    @Get(':id')
    public async findOne(@Param('id', ParseIntPipe) id: number): Promise<Role> {
        const result = await this.roleService.findOne(id, ['permissions']);
        return result;
    }

    @Put(':id')
    public async updateById(
        @Param('id', ParseIntPipe) id: number,
        @Body('name') name: string,
        @Body('permissions') ids: number[]
    ): Promise<Role> {

        await this.roleService.update(id, { name });

        const roles = await this.roleService.findOne(id);
        return this.roleService.create({
            ...roles,
            permissions: ids.map((id) => { return { id } })
        })
    }

    @Delete('id')
    public async deleteById(@Param('id', ParseIntPipe) id: number) {
        const result = await this.roleService.delete(id);
        return result;
    }

}
