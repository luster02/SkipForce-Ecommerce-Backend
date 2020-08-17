import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { CustomerRepository } from './customer.repository'
import { CustomerDetailRepository } from './customer.detail.repository'
import { CustomerAuthModule } from '../auth/customer-auth/customer.auth.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CustomerRepository,
      CustomerDetailRepository
    ]),
    CustomerAuthModule
  ],
  providers: [CustomerService],
  controllers: [CustomerController]
})
export class CustomerModule { }
