import { Repository, EntityRepository } from "typeorm";
import { CustomerDetail } from '../customer.detail.entity'

@EntityRepository(CustomerDetail)
export class CustomerDetailRepository extends Repository<CustomerDetail> { }