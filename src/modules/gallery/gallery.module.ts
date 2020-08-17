import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { GalleryService } from './gallery.service';
import { GalleryController } from './gallery.controller';
import { GalleryRepository } from './gallery.repository'
import { CloudinaryModule } from '../../cloudinary/cloudinary.module'

@Module({
  imports: [TypeOrmModule.forFeature([GalleryRepository]), CloudinaryModule],
  providers: [GalleryService],
  controllers: [GalleryController]
})
export class GalleryModule { }
