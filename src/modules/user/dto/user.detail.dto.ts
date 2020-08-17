import { InputType, Field } from "@nestjs/graphql";
import { IsString } from "class-validator";

@InputType()
export class UserDetailDto {
    @Field()
    @IsString()
    name: string;

    @Field()
    @IsString()
    lastname: string;

}