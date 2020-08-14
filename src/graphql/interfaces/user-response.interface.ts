import { ObjectType, Field } from '@nestjs/graphql'
import { MutationResult } from './result.interface'

@ObjectType()
export class UserResponse extends MutationResult {
    @Field()
    token: string;
}