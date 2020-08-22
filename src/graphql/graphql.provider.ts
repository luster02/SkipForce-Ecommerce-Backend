import { GraphQLModule } from '@nestjs/graphql'
import { UserModule } from '../modules/user/user.module'
import { RoleModule } from '../modules/role/role.module';
import { AuthModule } from '../modules/auth/user/auth.module'
import { ShopModule } from '../modules/shop/shop.module'
import { ProductModule } from '../modules/product/product.module'
import { OrderRepository } from '../modules/order/order.repository'
import { GalleryModule } from '../modules/gallery/gallery.module'
import { CustomerResolver } from '../modules/customer/customer.resolver'
import { CartModule } from '../modules/cart/cart.module'
import { CustomerAuthModule } from '../modules/auth/customer-auth/customer.auth.module'
import { AddressModule } from '../modules/address/address.module'
import { AssetModule } from '../modules/asset/asset.module'

export const graphQLProvider = [
    GraphQLModule.forRoot({
        autoSchemaFile: 'schema.gql',
        include: [
            UserModule, RoleModule,
            AuthModule, ShopModule,
            ProductModule, OrderRepository,
            GalleryModule, CustomerResolver,
            CartModule, CustomerAuthModule,
            AddressModule, AssetModule
        ],
        context: ({ req }) => ({ req })
    })
]