import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OrderRepository } from './order.repository'
import { CartModule } from '../cart/cart.module'

@Module({
  imports: [TypeOrmModule.forFeature([OrderRepository]), CartModule],
  providers: [OrderService],
  controllers: [OrderController]
})
export class OrderModule { }
