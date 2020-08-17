import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { AssetService } from './asset.service';
import { AssetController } from './asset.controller';
import { AssetRepository } from './asset.repository'
import { GalleryRepository } from '../gallery/gallery.repository'
import { CloudinaryModule } from '../../cloudinary/cloudinary.module'

@Module({
  imports: [TypeOrmModule.forFeature([AssetRepository, GalleryRepository]), CloudinaryModule],
  providers: [AssetService],
  controllers: [AssetController]
})
export class AssetModule { }
