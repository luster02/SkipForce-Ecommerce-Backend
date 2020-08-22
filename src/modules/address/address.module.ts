import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { AddressRepository } from './address.repository'
import { AddressResolver } from './address.resolver'
import { CustomerAuthModule } from '../auth/customer-auth/customer.auth.module'

@Module({
  imports: [TypeOrmModule.forFeature([AddressRepository]), CustomerAuthModule],
  providers: [AddressService, AddressResolver],
  controllers: [AddressController]
})
export class AddressModule { }
