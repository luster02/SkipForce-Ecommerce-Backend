import {
    Controller, Get, HttpCode,
    Param, Patch, Delete, Body,
    ParseIntPipe, UseGuards
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomResponse } from '../../interfaces/Response.interface'
import { CustomerDetail } from './customer.detail.entity';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('customer')
@Controller('customer')
export class CustomerController {
    constructor(private readonly _customerService: CustomerService) { }

    @UseGuards(AuthGuard())
    @Get(':id')
    @HttpCode(200)
    async getCustomer(@Param('id', ParseIntPipe) id: number): Promise<CustomResponse> {
        const customer = await this._customerService.get(id)
        return { ok: true, data: customer }
    }

    @Get()
    @HttpCode(200)
    async getAllCustomers(): Promise<CustomResponse> {
        const customers = await this._customerService.getAll()
        return { ok: true, data: customers }
    }

    @Patch(':id')
    @HttpCode(200)
    async editUser(@Param('id', ParseIntPipe) id: number, @Body() body: CustomerDetail): Promise<CustomResponse> {
        await this._customerService.update(id, body)
        return { ok: true, data: 'updated' }
    }

    @Delete(':id')
    @HttpCode(200)
    async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<CustomResponse> {
        await this._customerService.delete(id)
        return { ok: true, data: 'deleted' }
    }
}
