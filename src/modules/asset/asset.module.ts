import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { AssetService } from './asset.service';
import { AssetController } from './asset.controller';
import { AssetRepository } from './asset.repository'
import { GalleryRepository } from '../gallery/gallery.repository'
import { CloudinaryModule } from '../../cloudinary/cloudinary.module'
import { AuthModule } from '../auth/user/auth.module'
import { AssetResolver } from './asset.resolver'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AssetRepository,
      GalleryRepository
    ]),
    CloudinaryModule,
    AuthModule
  ],
  providers: [AssetService, AssetResolver],
  controllers: [AssetController]
})
export class AssetModule { }
