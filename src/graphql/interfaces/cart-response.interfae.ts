import { ObjectType, Field } from '@nestjs/graphql'
import { MutationResult } from './result.interface'

@ObjectType()
export class CartResponse extends MutationResult {
    @Field()
    client_secret: string;
}