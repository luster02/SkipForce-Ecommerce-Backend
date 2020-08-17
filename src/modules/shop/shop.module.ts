import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { ShopService } from './shop.service';
import { ShopController } from './shop.controller';
import { ShopRepository } from './shop.repository'

@Module({
  imports: [TypeOrmModule.forFeature([ShopRepository])],
  providers: [ShopService],
  controllers: [ShopController]
})
export class ShopModule { }
