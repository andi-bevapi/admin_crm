import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbsctractService } from 'src/common/absctract.service';
import { Repository } from 'typeorm';
import { Products } from "./models/product.entitny";

@Injectable()
export class ProductService  extends AbsctractService{
    constructor(@InjectRepository(Products) private readonly productRepository: Repository<Products>) { 
        super(productRepository)
    }
}
