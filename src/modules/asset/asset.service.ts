import {
    Injectable, BadRequestException, NotFoundException,
    Inject, InternalServerErrorException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AssetRepository } from './asset.repository'
import { Asset } from './asset.entity';
import { CloudinaryService } from '../../cloudinary/cloudinary.service';
import { removeFile } from '../../shared/fs'
import { GalleryRepository } from '../gallery/gallery.repository';

@Injectable()
export class AssetService {
    constructor(
        @InjectRepository(AssetRepository)
        private readonly _assetRepository: AssetRepository,
        @InjectRepository(GalleryRepository)
        private readonly _galleryRepository: GalleryRepository,
        @Inject(CloudinaryService)
        private readonly _cloudinaryService: CloudinaryService
    ) { }

    async get(id: number): Promise<Asset> {
        if (!id) throw new BadRequestException('id must be sent');
        const asset: Asset = await this._assetRepository.findOne(id)
        if (!asset) throw new NotFoundException();
        return asset
    }

    async getAll(id: number): Promise<Asset[]> {
        const asset: Asset[] = await this._assetRepository.find({ where: { gallery: id } })
        if (!asset) throw new NotFoundException();
        return asset
    }

    async create(id: number, file: any): Promise<Asset> {
        var assetData: Asset = new Asset()
        if (!id) throw new BadRequestException('gallery id must be sent');
        const galleryExist = await this._galleryRepository.findOne(id)
        if (!galleryExist) throw new InternalServerErrorException('you need to create a folder to upload assets');
        assetData.gallery = galleryExist;
        const res = await this._cloudinaryService.upload(file, galleryExist.folder)
        if (!res) throw new InternalServerErrorException('internal server error');
        const res2 = await removeFile(file)
        if (!res2) throw new InternalServerErrorException('internal server error');
        assetData.url = res.secure_url
        assetData.public_id = res.public_id
        const asset: Asset = await this._assetRepository.save(assetData)
        if (!asset) throw new NotFoundException();
        return asset
    }

    async delete(id: number): Promise<void> {
        if (!id) throw new BadRequestException('asset id must be sent');
        const assetExist = await this._assetRepository.findOne(id)
        if (!assetExist) throw new NotFoundException();
        if (assetExist.public_id) this._cloudinaryService.destroy(assetExist.public_id);
        await this._assetRepository.delete(id)
    }
}
