import { Repository, EntityRepository } from "typeorm";
import { Cart } from './cart.entity'

@EntityRepository(Cart)
export class CartRepository extends Repository<Cart> { }
