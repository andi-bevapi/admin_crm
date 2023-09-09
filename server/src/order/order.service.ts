import { Injectable } from '@nestjs/common';
import { AbsctractService } from "../common/absctract.service";
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './models/order.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService extends AbsctractService {
    constructor(@InjectRepository(Order) private readonly orderRepository: Repository<Order>) {
        super(orderRepository)
    }


    public async paginate(page: number): Promise<any> {
        const { data, meta } = await super.paginate(page)

        return {
            data: data.map((order: Order, index) => ({
                id: order.id,
                name: order.name,
                email: order.email,
                total: order.totall,
                created_at: order.created_at,
                order_items: order.order_items


            })),
            meta
        }
    }
}
