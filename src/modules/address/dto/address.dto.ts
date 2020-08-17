import { IsNotEmpty } from 'class-validator'

export class AddressDto {
    @IsNotEmpty()
    street: string

    @IsNotEmpty()
    number: number

    @IsNotEmpty()
    postalCode: number

    @IsNotEmpty()
    city: string
}