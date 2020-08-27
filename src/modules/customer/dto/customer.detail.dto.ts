import { InputType, Field } from "@nestjs/graphql"
import { IsString } from "class-validator"

@InputType()
export class CustomerDetailDto {
    @Field()
    @IsString()
    phone: string

    @Field()
    @IsString()
    name:string
    
    @Field()
    @IsString()
    lastname:string
}