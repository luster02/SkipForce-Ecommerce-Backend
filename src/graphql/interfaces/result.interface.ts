import { ObjectType, Field } from '@nestjs/graphql'

@ObjectType()
export class MutationResult {
    @Field({ nullable: true })
    success?: boolean;

    @Field({ nullable: true })
    error?: boolean;
}