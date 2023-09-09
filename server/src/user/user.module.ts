import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { User } from "./models/user.entity";
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { CommonModule } from "../common/common.module";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    AuthModule, 
    CommonModule
  ],
  controllers: [UserController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UserModule { }
