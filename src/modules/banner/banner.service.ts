import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { BannerRepository } from './banner.repository'
import { BannerDto } from './dto/banner.dto'
import { Banner } from './banner.entity'

@Injectable()
export class BannerService {
    constructor(private readonly _bannerRepository: BannerRepository) { }

    async get(id: number): Promise<Banner> {
        if (!id) throw new BadRequestException('banner id must be sent')
        const banner: Banner = await this._bannerRepository.findOne(id)
        if (!banner) throw new NotFoundException()
        return banner
    }

    async getAll(): Promise<Banner[]> {
        const banners: Banner[] = await this._bannerRepository.find()
        if (!banners) throw new NotFoundException()
        return banners
    }

    async create(bannerData: BannerDto): Promise<Banner> {
        const { length = 0 } = await this._bannerRepository.find()
        if (length >= 6) throw new BadRequestException('banner limit reached')
        const banner: Banner = await this._bannerRepository.save(bannerData)
        if (!banner) throw new NotFoundException()
        return banner
    }

    async update(id: number, bannerData: BannerDto): Promise<void> {
        if (!id) throw new BadRequestException('banner id must be sent')
        const banner: Banner = await this._bannerRepository.findOne(id)
        if (!banner) throw new NotFoundException()
        await this._bannerRepository.update(id, bannerData)
    }

    async delete(id: number): Promise<void> {
        if (!id) throw new BadRequestException('banner id must be sent')
        const banner: Banner = await this._bannerRepository.findOne(id)
        if (!banner) throw new NotFoundException()
        await this._bannerRepository.delete(id)
    }

    async addAsset(id: number, asset: number): Promise<void> {
        if (!id) throw new BadRequestException('banner id must be sent')
        const banner: Banner = await this._bannerRepository.findOne(id)
        if (!banner) throw new NotFoundException()
        await this._bannerRepository.createQueryBuilder()
            .relation(Banner, 'asset').of(banner).add(asset)
    }

    async removeAsset(id: number): Promise<void> {
        if (!id) throw new BadRequestException('banner id must be sent')
        const banner: Banner = await this._bannerRepository.findOne(id)
        if (!banner) throw new NotFoundException()
        await this._bannerRepository.save({ ...banner, asset: null })
    }
}
