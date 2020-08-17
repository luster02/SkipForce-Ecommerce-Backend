import { Injectable, BadRequestException, NotFoundException, Inject, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GalleryRepository } from './gallery.repository'
import { Gallery } from './gallery.entity';
import { GalleryDto } from './dto/gallery.dto';
import { CloudinaryService } from '../../cloudinary/cloudinary.service';

@Injectable()
export class GalleryService {
    constructor(
        @InjectRepository(GalleryRepository)
        private readonly _galleryRepository: GalleryRepository,
        @Inject(CloudinaryService)
        private readonly _cloudinaryService: CloudinaryService
    ) { }

    async get(id: number): Promise<Gallery> {
        if (!id) throw new BadRequestException('id must be sent');
        const gallery: Gallery = await this._galleryRepository.findOne(id)
        if (!gallery) throw new NotFoundException();
        return gallery
    }

    async delete(id: number): Promise<void> {
        if (!id) throw new BadRequestException('gallery id must be sent');
        const galleryExist = await this._galleryRepository.findOne(id)
        if (!galleryExist) throw new NotFoundException();
        const res = await this._cloudinaryService.delete_folder(galleryExist.folder)
        if (!res.deleted) throw new InternalServerErrorException('internal server error')
        await this._galleryRepository.delete(id)
    }

    async createFoler(id: number, galleryData: GalleryDto): Promise<void> {
        if (!id) throw new BadRequestException('gallery id must be sent');
        const galleryExist = await this._galleryRepository.findOne(id)
        if (!galleryExist) throw new NotFoundException();
        if (galleryExist.folder) throw new InternalServerErrorException('this gallery already has a folder');
        const res = await this._cloudinaryService.create_folder(`/${galleryData.folder}`)
        if (!res.success) throw new InternalServerErrorException('internal server error')
        galleryData.folder = res.path
        await this._galleryRepository.update(id, galleryData)
    }
}
