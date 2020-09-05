import {
    Controller, Get, HttpCode,
    Param, ParseIntPipe, Post,
    Body, UsePipes, ValidationPipe,
    Patch, Delete, UseGuards
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ProductService } from './product.service';
import { CustomResponse } from '../../interfaces/Response.interface';
import { ProductDto } from './dto/product.dto';
import { Product } from './product.entity';

@ApiTags('products')
@Controller('product')
export class ProductController {
    constructor(private readonly _productService: ProductService) { }

    @Get(':id')
    @HttpCode(200)
    async getProduct(@Param('id', ParseIntPipe) id: number): Promise<CustomResponse> {
        const product = await this._productService.get(id)
        return { ok: true, data: product }
    }

    @Get('/all/:id')
    @HttpCode(200)
    async getAllProducts(): Promise<CustomResponse> {
        const products = await this._productService.getAll()
        return { ok: true, data: products }
    }

    @UseGuards(AuthGuard('UserStrategy'))
    @Post(':id')
    @UsePipes(ValidationPipe)
    @HttpCode(201)
    async createProduct(@Param('id', ParseIntPipe) id: number, @Body() productDto: ProductDto): Promise<CustomResponse> {
        const product = await this._productService.create(id, productDto)
        return { ok: true, data: product }
    }

    @UseGuards(AuthGuard('UserStrategy'))
    @Patch(':id')
    @HttpCode(200)
    async editProduct(@Param('id', ParseIntPipe) id: number, @Body() productData: Product): Promise<CustomResponse> {
        await this._productService.update(id, productData)
        return { ok: true, data: 'updated' }
    }

    @UseGuards(AuthGuard('UserStrategy'))
    @Patch('/push/:id')
    @HttpCode(200)
    async pushAssets(@Param('id', ParseIntPipe) id: number, @Body() assets: any): Promise<CustomResponse> {
        await this._productService.pushAssets(id, assets)
        return { ok: true, data: 'pushed' }
    }

    @UseGuards(AuthGuard('UserStrategy'))
    @Patch('/pull/:id')
    @HttpCode(200)
    async pullAssets(@Param('id', ParseIntPipe) id: number, @Body() assets: any): Promise<CustomResponse> {
        await this._productService.pullAssets(id, assets)
        return { ok: true, data: 'pulled' }
    }

    @UseGuards(AuthGuard('UserStrategy'))
    @Delete(':id')
    @HttpCode(200)
    async deleteProduct(@Param('id', ParseIntPipe) id: number): Promise<CustomResponse> {
        await this._productService.delete(id)
        return { ok: true, data: 'deleted' }
    }
}
