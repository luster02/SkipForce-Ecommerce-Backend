import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ShopRepository } from './shop.repository'
import { Shop } from './shop.entity';
import { ShopDto } from './dto/shop.dto';

@Injectable()
export class ShopService {
    constructor(
        @InjectRepository(ShopRepository)
        private readonly _shopRepository: ShopRepository
    ) { }

    async get(): Promise<Shop> {
        const shops: Shop[] = await this._shopRepository.find()
        if (!shops) throw new NotFoundException();
        const shop = shops[0]
        return shop
    }

    async update(id: number, shopData: ShopDto): Promise<void> {
        const shop: Shop = await this._shopRepository.findOne(id)
        if (!shop) throw new NotFoundException();
        await this._shopRepository.update(id, shopData)
    }

    async delete(id: number): Promise<void> {
        const shopExist = await this._shopRepository.findOne(id)
        if (!shopExist) throw new NotFoundException();
        await this._shopRepository.delete(id)
    }
}
