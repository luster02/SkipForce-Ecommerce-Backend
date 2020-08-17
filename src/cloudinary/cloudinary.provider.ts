import { Provider } from '@nestjs/common';
import * as CloudinaryLib from 'cloudinary'

export const Cloudinary = 'lib:cloudinary'

export const CloudinaryProvider: Provider = {
    provide: Cloudinary,
    useValue: CloudinaryLib
}