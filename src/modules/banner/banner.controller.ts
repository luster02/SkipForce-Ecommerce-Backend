import {
    Body, Controller, Get, Param,
    ParseIntPipe, Patch, Post,
    Delete, HttpCode, UseGuards
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { BannerService } from './banner.service'
import { Banner } from './banner.entity'
import { BannerDto } from './dto/banner.dto'
import { CustomResponse } from '../../interfaces/Response.interface';

@ApiTags('banner')
@Controller('banner')
export class BannerController {
    constructor(private readonly _bannerService: BannerService) { }

    @Get(':id')
    @HttpCode(200)
    async getBanner(@Param('id', ParseIntPipe) id: number): Promise<CustomResponse> {
        const banner: Banner = await this._bannerService.get(id)
        return { ok: true, data: banner }
    }

    @Get()
    @HttpCode(200)
    async getAllBanners(): Promise<CustomResponse> {
        const banners: Banner[] = await this._bannerService.getAll()
        return { ok: true, data: banners }
    }

    @UseGuards(AuthGuard('UserStrategy'))
    @Post()
    @HttpCode(201)
    async createBanner(@Body() bannerData: BannerDto): Promise<CustomResponse> {
        await this._bannerService.create(bannerData)
        return { ok: true, data: 'created' }
    }

    @UseGuards(AuthGuard('UserStrategy'))
    @Patch(':id')
    @HttpCode(200)
    async updateBanner(@Param('id', ParseIntPipe) id: number, @Body() bannerData: BannerDto): Promise<CustomResponse> {
        await this._bannerService.update(id, bannerData)
        return { ok: true, data: 'updated' }
    }

    @UseGuards(AuthGuard('UserStrategy'))
    @Patch(':id')
    @HttpCode(200)
    async addAsset(@Param('id', ParseIntPipe) id: number, @Body() asset: number): Promise<CustomResponse> {
        await this._bannerService.addAsset(id, asset)
        return { ok: true, data: 'asset added successfully' }
    }

    @UseGuards(AuthGuard('UserStrategy'))
    @Patch(':id')
    @HttpCode(200)
    async removeAsset(@Param('id', ParseIntPipe) id: number): Promise<CustomResponse> {
        await this._bannerService.removeAsset(id)
        return { ok: true, data: 'asset removed successfully' }
    }

    @UseGuards(AuthGuard('UserStrategy'))
    @Delete(':id')
    @HttpCode(200)
    async deleteBanner(@Param('id', ParseIntPipe) id: number): Promise<CustomResponse> {
        await this._bannerService.delete(id)
        return { ok: true, data: 'deleted' }
    }
}
