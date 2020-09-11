import { IsNotEmpty } from 'class-validator'
import { InputType, Field } from '@nestjs/graphql'

@InputType()
export class ShopDto {
    @Field()
    @IsNotEmpty()
    name: string

    @Field()
    @IsNotEmpty()
    description: string
}