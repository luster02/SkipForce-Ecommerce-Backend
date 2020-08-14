import { Module } from '@nestjs/common';
import { graphQLProvider } from './graphql.provider'

@Module({
    imports: [...graphQLProvider],
    exports: [...graphQLProvider]
})
export class GraphqlModule { }
