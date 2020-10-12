import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { ShopService } from './shop.service';
import { ShopRepository } from './shop.repository'
import { ShopResolver } from './shop.resolver'
import { AuthModule } from '../auth/user/auth.module'

@Module({
  imports: [TypeOrmModule.forFeature([ShopRepository]), AuthModule],
  providers: [ShopService, ShopResolver],
})
export class ShopModule { }
