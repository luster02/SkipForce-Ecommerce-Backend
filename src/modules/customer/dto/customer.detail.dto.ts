import { InputType, Field } from "@nestjs/graphql"

@InputType()
export class CustomerDetailDto {
    @Field()
    phone: string

    @Field()
    status: string

    @Field()
    photoURL: string
}