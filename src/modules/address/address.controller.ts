import { Controller, Get, HttpCode, Param, ParseIntPipe, Patch, Body } from '@nestjs/common';
import { AddressService } from './address.service';
import { CustomResponse } from '../../interfaces/Response.interface';
import { AddressDto } from './dto/address.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('address')
@Controller('address')
export class AddressController {
    constructor(private readonly _addressService: AddressService) { }

    @Get(':id')
    @HttpCode(200)
    async getAddress(@Param('id', ParseIntPipe) id: number): Promise<CustomResponse> {
        const address = await this._addressService.get(id)
        return { ok: true, data: address }
    }

    @Patch(':id')
    @HttpCode(200)
    async updateAddress(
        @Param('id', ParseIntPipe) id: number,
        @Body() addressData: AddressDto
    ): Promise<CustomResponse> {
        await this._addressService.update(id, addressData)
        return { ok: true, data: 'updated' }
    }
}
