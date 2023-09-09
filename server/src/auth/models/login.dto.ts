import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class Login {

    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @IsString()
    password: string

}