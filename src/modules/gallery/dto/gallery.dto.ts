import { IsNotEmpty } from 'class-validator'
import { InputType, Field } from '@nestjs/graphql'

@InputType()
export class GalleryDto {
    @Field()
    @IsNotEmpty()
    folder: string

    user: any

    assets: any
}