import { Repository, EntityRepository } from "typeorm";
import { Asset } from './asset.entity'

@EntityRepository(Asset)
export class AssetRepository extends Repository<Asset> { }
