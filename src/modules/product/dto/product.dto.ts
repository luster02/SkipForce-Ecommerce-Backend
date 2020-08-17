import { IsNotEmpty, IsNumber } from 'class-validator'
import { InputType, Field } from '@nestjs/graphql'

@InputType()
export class ProductDto {
    @Field()
    @IsNotEmpty()
    name: string

    @Field()
    @IsNotEmpty()
    description: string

    @Field()
    @IsNotEmpty()
    @IsNumber()
    price: number

    @Field()
    @IsNotEmpty()
    category: string

    shop: any

    assets: any
}