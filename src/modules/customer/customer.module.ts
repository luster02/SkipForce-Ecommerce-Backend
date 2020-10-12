import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { CustomerService } from './customer.service';
import { CustomerRepository } from './repositories/customer.repository'
import { CustomerDetailRepository } from './repositories/customer.detail.repository'
import { CustomerAuthModule } from '../auth/customer-auth/customer.auth.module'
import { CustomerResolver } from './customer.resolver'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CustomerRepository,
      CustomerDetailRepository
    ]),
    CustomerAuthModule
  ],
  providers: [CustomerService, CustomerResolver],
})
export class CustomerModule { }
