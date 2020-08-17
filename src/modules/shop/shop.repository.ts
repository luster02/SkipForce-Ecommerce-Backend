import { Repository, EntityRepository } from "typeorm";
import { Shop } from './shop.entity'

@EntityRepository(Shop)
export class ShopRepository extends Repository<Shop> { }