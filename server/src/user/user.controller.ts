import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, ParseIntPipe, UseInterceptors, Req, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from "./users.service";
import { User } from "./models/user.entity";
import { UserCreateDto } from "./models/user.create.dto";
import { UserUpdateDto } from "./models/user.update.dto";
import { AuthGuard } from "../auth/guards/auth.guard";
import { AuthInterceptor } from 'src/auth/interceptors/auth.interceptor';
import { AuthService } from "../auth/auth.service";
import { Request } from 'express';
import { AuthErrors } from 'src/auth/errors/auth.erros';
import { HasPermission } from 'src/permission/has-permission.decorator';

@UseGuards(AuthGuard)
@UseInterceptors(AuthInterceptor)
@Controller('users')
export class UserController {
    constructor(private readonly usersService: UsersService, private readonly authService: AuthService) { }

    @Get()
    @HasPermission('users')
    public async getAllUsers(): Promise<User[]> {
        const result = await this.usersService.getAll();
        return result
    }

    @Post()
    @HasPermission('users')
    public async create(@Body() bodyParam: UserCreateDto): Promise<User> {
        const hashedPassword = await bcrypt.hash('123', 10);

        const result = await this.usersService.create({
            first_name: bodyParam.first_name,
            last_name: bodyParam.last_name,
            email: bodyParam.email,
            password: hashedPassword,
            role: { id: bodyParam.role }
        });
        return result
    }

    @Get(':id')
    @HasPermission('users')
    public async getById(@Param('id') id: number): Promise<User> {
        const result = await this.usersService.findOne(id);
        return result;
    }

    @Put('info')
    public async updateInfo(
        @Req() request: Request,
        @Body() bodyParam: UserUpdateDto
    ): Promise<any> {
        const user_id = await this.authService.authUserId(request)
        const result = await this.usersService.update(user_id, bodyParam)
        return result;
    }


    @Put('update/password')
    public async updatePassword(
        @Req() request: Request,
        @Body() bodyParam

    ) {
        if (bodyParam.password !== bodyParam.passwrod_confirm) {
            throw new AuthErrors("passwords does not match", HttpStatus.BAD_REQUEST);
        }
        const hashedPassword = await bcrypt.hash(bodyParam.password, 10);

        // console.log(hashedPassword)
        const user_id = await this.authService.authUserId(request);
        const result = await this.usersService.update(user_id, { password: hashedPassword });
        return result;
    }


    @Put(':id')
    @HasPermission('users')
    public async updateById(
        @Param('id') id: number,
        @Body() bodyParam: UserUpdateDto): Promise<any> {
        await this.usersService.update(id, bodyParam);
        const result = await this.usersService.findOne(id);
        return result;
    }

    @Delete(":id")
    public async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<any> {
        const result = await this.usersService.delete(id);
        return result;
    }

    @Get('/paginate/user')
    @HasPermission('users')
    public paginate(@Query('page') page: number): Promise<User[]> {
        const result = this.usersService.paginate(page);
        return result;
    }

}
