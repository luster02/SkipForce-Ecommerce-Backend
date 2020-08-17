import { Repository, EntityRepository } from "typeorm";
import { Gallery } from './gallery.entity'

@EntityRepository(Gallery)
export class GalleryRepository extends Repository<Gallery> { }
