import { IsNotEmpty } from 'class-validator'

export class GalleryDto {
    @IsNotEmpty()
    folder: string

    user: any

    assets: any
}