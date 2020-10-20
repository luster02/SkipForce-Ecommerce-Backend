import {
    Controller, HttpCode, Param,
    ParseIntPipe, Post, UsePipes, ValidationPipe,
    UseInterceptors, UploadedFile, UseGuards
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express'
import { AuthGuard } from '@nestjs/passport';
import { AssetService } from './asset.service';
import { CustomResponse } from '../../interfaces/Response.interface';
import { multerOptions } from '../../shared/multer.storage'


@UseGuards(AuthGuard('UserStrategy'))
@Controller('asset')
export class AssetController {
    constructor(private readonly _assetService: AssetService) { }

    @Post(':id')
    @UseInterceptors(FileInterceptor('file', multerOptions))
    @UsePipes(ValidationPipe)
    @HttpCode(201)
    async uploadFile(
        @Param('id', ParseIntPipe) id: number,
        @UploadedFile() file
    ): Promise<CustomResponse> {
        const asset = await this._assetService.create(id, file.path)
        return { ok: true, data: asset }
    }
}
