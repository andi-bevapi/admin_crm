import { ClassSerializerInterceptor, Controller, Get, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { OrderService } from './order.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { HasPermission } from 'src/permission/has-permission.decorator';

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard)
@HasPermission('orders')
@Controller()
export class OrderController {

    constructor(private readonly orderService: OrderService) { }

    @Get('orders')
    public async getOrders(@Query('page') page = 1) {
        return this.orderService.getAll(['order_items'])
    }
}
