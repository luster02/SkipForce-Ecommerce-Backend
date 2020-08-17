import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { CartRepository } from './cart.repository'
import { ProductRepository } from '../product/product.repository'
import { CartResolver } from './cart.resolver'

@Module({
  imports: [TypeOrmModule.forFeature([CartRepository, ProductRepository])],
  providers: [CartService, CartResolver],
  controllers: [CartController],
  exports: [CartService]
})
export class CartModule { }
