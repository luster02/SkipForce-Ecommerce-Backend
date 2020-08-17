import {
    Controller, Get, HttpCode,
    Param, ParseIntPipe, Post,
    Patch, Body
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CustomResponse } from '../../interfaces/Response.interface';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('order')
@Controller('order')
export class OrderController {
    constructor(private readonly _orderService: OrderService) { }

    @Get(':id')
    @HttpCode(200)
    async getOrder(@Param('id', ParseIntPipe) id: number): Promise<CustomResponse> {
        const order = await this._orderService.get(id)
        return { ok: true, data: order }
    }

    @Get()
    @HttpCode(200)
    async getAll(): Promise<CustomResponse> {
        const oreders = await this._orderService.getAll()
        return { ok: true, data: oreders }
    }

    @Post(':id')
    @HttpCode(201)
    async createOrder(@Param('id', ParseIntPipe) id: number): Promise<CustomResponse> {
        await this._orderService.create(id)
        return { ok: true, data: 'created' }
    }

    @Patch(':id')
    @HttpCode(200)
    async updateStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body() status: string
    ): Promise<CustomResponse> {
        await this._orderService.update(id, status)
        return { ok: true, data: 'updated' }
    }
}
