import { Controller, Get, Post, Body, Param, Put, Delete, Query, UseGuards } from '@nestjs/common';
import { ProductService } from "./product.service";
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { ProductDto } from './models/product.dto';
import { ProductUpdateDto } from "./models/productUpdate.dto";

@UseGuards(AuthGuard)
@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Get(":page")
    public async all(@Query('page') page = 1) {
        return this.productService.paginate(page);
    }


    @Post()
    public async create(@Body() body: ProductDto) {
        return this.productService.create(body)
    }

    @Get(":id")
    public async get(@Param('id') id: number) {
        return this.productService.findOne(id);
    }


    @Put(":id")
    public async update(
        @Param('id') id: number,
        @Body() body: ProductUpdateDto
    ) {
        await this.productService.update(id, body);
        const result = await this.productService.findOne(id);
        return result
    }


    @Delete(":id")
    public async delete(@Param('id') id: number) {
        const result = await this.productService.delete(id);
        return result
    }


}
