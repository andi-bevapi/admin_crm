import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { Products } from "./models/product.entitny";
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from 'src/common/common.module';
import { UploadController } from './upload.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Products]),
    CommonModule
  ],
  controllers: [ProductController, UploadController],
  providers: [ProductService]
})
export class ProductModule { }
