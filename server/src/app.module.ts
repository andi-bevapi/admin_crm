import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from "./user/models/user.entity";
import { Role } from "./role/models/role.entity";
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
import { Permission } from "./permission/models/permission.entity";
import { ProductModule } from './product/product.module';
import { Products } from "./product/models/product.entitny";
import { OrderModule } from './order/order.module';
import { Order } from './order/models/order.entity';
import { OrderItem } from './order/models/order-item.entity';
import { APP_GUARD } from '@nestjs/core';
import { PermissionGuard } from './permission/permission.guard';

@Module({
  imports: [
    UserModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'andi',
      database: 'admin_app',
      entities: [User, Role, Permission, Products, Order, OrderItem],
      synchronize: true,
      autoLoadEntities: true,
    }),
    RoleModule,
    PermissionModule,
    ProductModule,
    OrderModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: PermissionGuard
    }
  ],
})
export class AppModule { }
