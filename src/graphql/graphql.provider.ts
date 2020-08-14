import { GraphQLModule } from '@nestjs/graphql'
import { UserModule } from '../modules/user/user.module'
import { RoleModule } from '../modules/role/role.module';
import { AuthModule } from '../modules/auth/auth.module'

export const graphQLProvider = [
    GraphQLModule.forRoot({
        autoSchemaFile: 'schema.gql',
        include: [UserModule, RoleModule, AuthModule],
        context: ({ req }) => ({ req })
    })
]