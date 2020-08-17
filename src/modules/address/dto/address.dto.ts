import { IsNotEmpty } from 'class-validator'
import { InputType, Field } from '@nestjs/graphql'

@InputType()
export class AddressDto {
    @Field()
    @IsNotEmpty()
    street: string

    @Field()
    @IsNotEmpty()
    number: number

    @Field()
    @IsNotEmpty()
    postalCode: number

    @Field()
    @IsNotEmpty()
    city: string
}