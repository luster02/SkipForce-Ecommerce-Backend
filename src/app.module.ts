import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { Configuration } from './config/config.keys';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/user/auth.module';
import { GraphqlModule } from './graphql/graphql.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { ShopModule } from './modules/shop/shop.module';
import { ProductModule } from './modules/product/product.module';
import { GalleryModule } from './modules/gallery/gallery.module';
import { AssetModule } from './modules/asset/asset.module';
import { CustomerModule } from './modules/customer/customer.module';
import { StripeModule } from './payments/stripe/stripe.module';
import { CustomerAuthModule } from './modules/auth/customer-auth/customer.auth.module';
import { CartModule } from './modules/cart/cart.module';
import { OrderModule } from './modules/order/order.module';
import { AddressModule } from './modules/address/address.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    ConfigModule,
    DatabaseModule,
    UserModule,
    AuthModule,
    GraphqlModule,
    CloudinaryModule,
    ShopModule,
    ProductModule,
    GalleryModule,
    AssetModule,
    CustomerModule,
    StripeModule,
    CustomerAuthModule,
    CartModule,
    OrderModule,
    AddressModule
  ],
})
export class AppModule {
  static port: number | string;

  constructor(private readonly _configService: ConfigService) {
    AppModule.port = this._configService.get(Configuration.PORT);
  }
}
