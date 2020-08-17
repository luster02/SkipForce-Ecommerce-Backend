import { Repository, EntityRepository } from "typeorm";
import { Product } from './product.entity'

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> { }