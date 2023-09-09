import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        JwtModule.register({
            global: true,
            secret: "secret",
            signOptions: { expiresIn: "3600s" }
        })
    ],
    exports: [
        JwtModule
    ]
})
export class CommonModule { }
