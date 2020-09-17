import {
    Controller, Get, HttpCode,
    Param, ParseIntPipe, Post,
    Patch, Body, UseGuards
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { OrderService } from './order.service';
import { CustomResponse } from '../../interfaces/Response.interface';

@ApiTags('order')
@Controller('order')
export class OrderController {
    constructor(private readonly _orderService: OrderService) { }

    @UseGuards(AuthGuard('CustomerStrategy'))
    @Get(':id')
    @HttpCode(200)
    async getOrder(@Param('id', ParseIntPipe) id: number): Promise<CustomResponse> {
        const order = await this._orderService.get(id)
        return { ok: true, data: order }
    }

    @UseGuards(AuthGuard('UserStrategy'))
    @Get('/admin/:id')
    @HttpCode(200)
    async getOrderFromAdmin(@Param('id', ParseIntPipe) id: number): Promise<CustomResponse> {
        const order = await this._orderService.get(id)
        return { ok: true, data: order }
    }

    @UseGuards(AuthGuard('CustomerStrategy'))
    @Get()
    @HttpCode(200)
    async getAll(): Promise<CustomResponse> {
        const oreders = await this._orderService.getAll()
        return { ok: true, data: oreders }
    }

    @UseGuards(AuthGuard('UserStrategy'))
    @Get()
    @HttpCode(200)
    async getAllFromAdmin(): Promise<CustomResponse> {
        const oreders = await this._orderService.getAll()
        return { ok: true, data: oreders }
    }

    @UseGuards(AuthGuard('CustomerStrategy'))
    @Post(':id')
    @HttpCode(201)
    async createOrder(@Param('id', ParseIntPipe) id: number): Promise<CustomResponse> {
        await this._orderService.create(id)
        return { ok: true, data: 'created' }
    }

    @UseGuards(AuthGuard('UserStrategy'))
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
