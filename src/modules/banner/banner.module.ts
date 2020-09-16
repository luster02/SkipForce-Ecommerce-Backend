import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BannerController } from './banner.controller';
import { BannerService } from './banner.service';
import { BannerRepository } from './banner.repository'
import { BannerResolver } from './banner.resolver'

@Module({
  imports: [TypeOrmModule.forFeature([BannerRepository])],
  controllers: [BannerController],
  providers: [BannerService, BannerResolver]
})
export class BannerModule { }
