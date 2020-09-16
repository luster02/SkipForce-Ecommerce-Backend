import { GraphQLModule } from '@nestjs/graphql'
import { UserModule } from '../modules/user/user.module'
import { AuthModule } from '../modules/auth/user/auth.module'
import { ShopModule } from '../modules/shop/shop.module'
import { ProductModule } from '../modules/product/product.module'
import { OrderModule } from '../modules/order/order.module'
import { GalleryModule } from '../modules/gallery/gallery.module'
import { CustomerModule } from '../modules/customer/customer.module'
import { CartModule } from '../modules/cart/cart.module'
import { CustomerAuthModule } from '../modules/auth/customer-auth/customer.auth.module'
import { AddressModule } from '../modules/address/address.module'
import { AssetModule } from '../modules/asset/asset.module'
import { BannerModule } from '../modules/banner/banner.module'

export const graphQLProvider = [
    GraphQLModule.forRoot({
        autoSchemaFile: 'schema.gql',
        include: [
            UserModule,
            AuthModule,
            ShopModule,
            ProductModule,
            OrderModule,
            GalleryModule,
            CustomerModule,
            CartModule,
            CustomerAuthModule,
            AddressModule,
            AssetModule,
            BannerModule
        ],
        context: ({ req }) => ({ req })
    })
]