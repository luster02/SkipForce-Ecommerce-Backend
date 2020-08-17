import { Controller, Get, HttpCode, Param, ParseIntPipe, Patch, Body, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CartService } from './cart.service'
import { CustomResponse } from '../../interfaces/Response.interface';

@ApiTags('cart')
@Controller('cart')
export class CartController {
    constructor(private readonly _cartService: CartService) { }

    @Get(':id')
    @HttpCode(200)
    async getCart(@Param('id', ParseIntPipe) id: number): Promise<CustomResponse> {
        const cart = await this._cartService.get(id)
        return { ok: true, data: cart }
    }

    @Patch('/add/:id')
    @HttpCode(200)
    async addProduct(@Param('id', ParseIntPipe) id: number, @Body() productId: number): Promise<CustomResponse> {
        await this._cartService.addProduct(id, productId)
        return { ok: true, data: 'updated' }
    }

    @Patch('/remove/:id')
    @HttpCode(200)
    async pullProduct(@Param('id', ParseIntPipe) id: number, @Body() productId: number): Promise<CustomResponse> {
        await this._cartService.pullProduct(id, productId)
        return { ok: true, data: 'updated' }
    }

    @Post('/pay/:id')
    @HttpCode(200)
    async payCart(@Param('id', ParseIntPipe) id: number): Promise<CustomResponse> {
        const { client_secret } = await this._cartService.pay(id)
        return { ok: true, data: client_secret }
    }
}
