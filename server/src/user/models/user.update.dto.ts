import { IsString, IsNotEmpty } from "class-validator"

export class UserUpdateDto {
    @IsString()
    first_name?: string;

    @IsString()
    last_name?: string;

    @IsString()
    email?: string;

    roles_id?: number
}