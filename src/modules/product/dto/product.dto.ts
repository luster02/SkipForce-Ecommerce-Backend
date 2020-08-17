import { IsNotEmpty, IsNumber } from 'class-validator'

export class ProductDto {
    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    description: string

    @IsNotEmpty()
    @IsNumber()
    price: number

    @IsNotEmpty()
    category: string

    shop: any

    assets: any
}