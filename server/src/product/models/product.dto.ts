import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class ProductDto {
    @IsString()
    @IsNotEmpty()
    name: string;


    description: string;

    @IsString()
    @IsNotEmpty()
    image: string;

    @IsNotEmpty()
    price: number
}