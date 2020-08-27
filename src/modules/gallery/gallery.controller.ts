import {
    Controller, Get, Delete,
    HttpCode, Param, ParseIntPipe,
    Body, ValidationPipe, UsePipes, Post, UseGuards
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GalleryService } from './gallery.service'
import { CustomResponse } from '../../interfaces/Response.interface';
import { GalleryDto } from './dto/gallery.dto';
import { UserAuthGuard } from '../auth/guards/jwt.guard'

@ApiTags('gallery')
@UseGuards(UserAuthGuard)
@Controller('gallery')
export class GalleryController {
    constructor(private readonly _galleryService: GalleryService) { }

    @Get(':id')
    @HttpCode(200)
    async getOneGallery(@Param('id', ParseIntPipe) id: number): Promise<CustomResponse> {
        const gallery = await this._galleryService.get(id)
        return { ok: true, data: gallery }
    }

    @Delete(':id')
    @HttpCode(200)
    async deleteGallery(@Param('id', ParseIntPipe) id: number): Promise<CustomResponse> {
        await this._galleryService.delete(id)
        return { ok: true, data: 'deleted' }
    }

    @Post(':id')
    @UsePipes(ValidationPipe)
    @HttpCode(200)
    async createFoler(@Param('id', ParseIntPipe) id: number, @Body() gallerData: GalleryDto): Promise<CustomResponse> {
        await this._galleryService.createFoler(id, gallerData)
        return { ok: true, data: 'updated' }
    }
}
