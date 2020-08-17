import { Repository, EntityRepository } from 'typeorm'
import { Address } from './address.entity'

@EntityRepository(Address)
export class AddressRepository extends Repository<Address> { }
