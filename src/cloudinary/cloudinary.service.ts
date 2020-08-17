import { Injectable, Inject } from '@nestjs/common';
import { Cloudinary } from './cloudinary.provider'
import { ConfigService } from '../config/config.service'
import { Configuration } from '../config/config.keys'

@Injectable()
export class CloudinaryService {
    private v2: any
    constructor(
        @Inject(Cloudinary)
        private cloudinary,
        @Inject(ConfigService)
        private readonly _config: ConfigService
    ) {
        this.cloudinary.v2.config({
            cloud_name: this._config.get(Configuration.CLOUD_NAME),
            api_key: this._config.get(Configuration.API_KEY),
            api_secret: this._config.get(Configuration.API_SECRET)
        })
        this.v2 = cloudinary.v2
    }

    async upload(file: any, folder: any) {
        return await this.v2.uploader.upload(file, { folder })
    }

    async destroy(publicId: string) {
        return await this.v2.uploader.destroy(publicId)
    }

    async create_folder(foler: string) {
        return await this.v2.api.create_folder(foler)
    }

    async delete_folder(foler: string) {
        return await this.v2.api.delete_folder(foler)
    }

    async sub_folders(foler: string) {
        return await this.v2.api.sub_folders(foler)
    }

    uploader() {
        return this.v2.uploader
    }

    api() {
        return this.v2.api
    }
}
