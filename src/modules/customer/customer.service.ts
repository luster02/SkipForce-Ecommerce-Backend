import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerRepository } from './customer.repository';
import { CustomerDetailRepository } from './customer.detail.repository';
import { Customer } from './customer.entity';
import { CustomerDetail } from './customer.detail.entity';

@Injectable()
export class CustomerService {
    constructor(
        @InjectRepository(CustomerRepository)
        private readonly _customerRepository: CustomerRepository,
        @InjectRepository(CustomerDetailRepository)
        private readonly _customerDetailRepository: CustomerDetailRepository
    ) { }

    async get(id: number): Promise<Customer> {
        if (!id) throw new BadRequestException('id must be sent');
        const customer: Customer = await this._customerRepository.findOne(id)
        if (!customer) throw new NotFoundException();
        return customer
    }

    async getAll(): Promise<Customer[]> {
        const customers: Customer[] = await this._customerRepository.find()
        if (!customers) throw new NotFoundException();
        return customers
    }

    async update(id: number, userData: CustomerDetail): Promise<void> {
        const details: CustomerDetail = await this._customerDetailRepository.findOne(id)
        if (!details) throw new NotFoundException();
        await this._customerDetailRepository.update(id, userData)
    }

    async delete(id: number): Promise<void> {
        const customerExist = await this._customerRepository.findOne(id)
        if (!customerExist) throw new NotFoundException();
        await this._customerRepository.delete(id)
    }
}
