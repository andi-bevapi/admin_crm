import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { CommonModule } from 'src/common/common.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItem } from './models/order-item.entity';
import { Order } from './models/order.entity';

@Module({
  imports:[
    CommonModule,
    TypeOrmModule.forFeature([Order,OrderItem])
  ],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule {}
