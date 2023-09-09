import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class ProductUpdateDto {

    name?: string;
    description?: string;
    image?: string;
    price?: number
}