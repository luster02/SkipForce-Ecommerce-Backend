import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    ManyToMany
} from 'typeorm'
import { Gallery } from '../gallery/gallery.entity'
import { Product } from '../product/product.entity';

@Entity('assets')
export class Asset extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', nullable: false })
    url: string

    @Column({ type: 'varchar', nullable: false })
    public_id: string

    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
    updatedAt: Date;

    @ManyToOne(type => Gallery, gallery => gallery.assets)
    gallery: Gallery

    @ManyToMany(type => Product, product => product.assets)
    product: Product
} 