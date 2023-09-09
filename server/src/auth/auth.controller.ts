import { Body, Controller, Get, HttpStatus, Param, Post, Req, Res, UseGuards, UseInterceptors, UsePipes } from '@nestjs/common';
import { UsersService } from "../user/users.service";
import { User } from "../user/models/user.entity";
import { RegisterDto } from "./models/register.dto";
import { Login } from "./models/login.dto";
import { JwtService } from "@nestjs/jwt";
import { Response, Request } from 'express';
import { AuthInterceptor } from "./interceptors/auth.interceptor";
import { AuthGuard } from "./guards/auth.guard";

import { AuthErrors } from "./errors/auth.erros";
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';

@UseInterceptors(AuthInterceptor)
@Controller()
export class AuthController {
    constructor(
        private readonly usersService: UsersService,
        private jwtService: JwtService,
        private readonly authService: AuthService
    ) { }

    @Post('register')
    public async register(@Body() bodyParam: RegisterDto): Promise<User> {

        if (bodyParam.password !== bodyParam.passwrod_confirm) {
            throw new AuthErrors("passwords does not match", HttpStatus.BAD_REQUEST);
        }

        const hashedPassword = await bcrypt.hash(bodyParam?.password, 10);
        return this.usersService.registerUser(
            {
                first_name: bodyParam.first_name,
                last_name: bodyParam.last_name,
                email: bodyParam.email,
                password: hashedPassword,
                role: { id: 1 }
            }
        );
    }

    //httpOnly cohen vetem nga fronti por nuk aksesohen nga fronti per arsye sigurie sepse nese e kan bejne cte duan me TOKEN
    //duhet qe te marrim cookie nga Fronti per ne backend dhe kjo behete me passthrough: true
    @Post('login')
    public async login(
        @Body() bodyParam: Login,
        @Res({ passthrough: true }) response: Response
    ) {
        const user = await this.usersService.findByEmail(bodyParam.email);
        if (!user) {
            throw new AuthErrors("user with this email was not found", HttpStatus.NOT_FOUND)
        }
        const password = await bcrypt.compare(bodyParam.password, user?.password)
        if (!password) {
            throw new AuthErrors("user with this password was not found", HttpStatus.NOT_FOUND)
        }

        const jwt = await this.jwtService.signAsync({ id: user.id });

        response.cookie('jwt', jwt, { httpOnly: true });

        return user;
    }


    @Get('user')
    @UseGuards(AuthGuard)
    public async getUser(
        @Req() request: Request,
    ): Promise<User> {
        // const cookie = request.cookies?.jwt;
        // const { id } = await this.jwtService.verifyAsync(cookie);
        const id = await this.authService.authUserId(request); 
        const result = await this.usersService.findOne(id);
        return result;
    }


    @Post('logout')
    //fshijme cookie sepse fronti nuk ka akses ti fshije
    public logout(@Res({ passthrough: true }) response: Response) {
        response.clearCookie('jwt');
        return { "message": "success", "status": 200 }
    }

}
