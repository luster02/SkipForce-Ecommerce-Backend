import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { ShopService } from './shop.service';
import { ShopController } from './shop.controller';
import { ShopRepository } from './shop.repository'
import { ShopResolver } from './shop.resolver'
import { AuthModule } from '../auth/user/auth.module'

@Module({
  imports: [TypeOrmModule.forFeature([ShopRepository]), AuthModule],
  providers: [ShopService, ShopResolver],
  controllers: [ShopController]
})
export class ShopModule { }
