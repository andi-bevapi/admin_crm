import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class RegisterDto {

    @IsString()
    @IsNotEmpty()
    first_name: string;

    @IsString()
    @IsNotEmpty()
    last_name: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string

    @IsString()
    @IsNotEmpty()
    passwrod_confirm: string

    @IsNotEmpty()
    roles_id: number
}