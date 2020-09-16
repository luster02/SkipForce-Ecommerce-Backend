import { Field, InputType } from '@nestjs/graphql'
import { IsString, IsNotEmpty } from 'class-validator'

@InputType()
export class BannerDto {
    @Field()
    @IsString()
    @IsNotEmpty()
    title: string

    @Field()
    @IsString()
    @IsNotEmpty()
    description: string

    @Field()
    @IsString()
    redirect: string
}