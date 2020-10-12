import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { GalleryService } from './gallery.service';
import { GalleryRepository } from './gallery.repository'
import { CloudinaryModule } from '../../cloudinary/cloudinary.module'
import { GalleryResolver } from './gallery.resolver'
import { AuthModule } from '../auth/user/auth.module'

@Module({
  imports: [TypeOrmModule.forFeature([GalleryRepository]), CloudinaryModule, AuthModule],
  providers: [GalleryService, GalleryResolver],
})
export class GalleryModule { }
