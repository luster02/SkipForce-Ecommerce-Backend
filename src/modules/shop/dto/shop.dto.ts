import { IsNotEmpty } from 'class-validator'

export class ShopDto {
    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    description: string

    @IsNotEmpty()
    status: string
}