import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressRepository } from './address.repository';
import { Address } from './address.entity';
import { AddressDto } from './dto/address.dto';

@Injectable()
export class AddressService {
    constructor(
        @InjectRepository(AddressRepository)
        private readonly _addressRepository: AddressRepository
    ) { }

    async get(id: number): Promise<Address> {
        if (!id) throw new BadRequestException('id must be sent')
        const address: Address = await this._addressRepository.findOne(id)
        if (!address) throw new NotFoundException()
        return address
    }

    async update(id: number, addressData: AddressDto): Promise<void> {
        if (!id) throw new BadRequestException('id must be sent')
        const addressToUpdate: Address = await this._addressRepository.findOne(id)
        if (!addressToUpdate) throw new NotFoundException()
        await this._addressRepository.update(id, addressData)
    }
}
