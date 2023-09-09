import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserModule } from "../user/user.module";
import { CommonModule } from "../common/common.module";
import { AuthService } from './auth.service';

@Module({
  imports: [
    forwardRef(() => { return UserModule} ),
    CommonModule
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule { }
