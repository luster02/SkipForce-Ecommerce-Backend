import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    ManyToMany,
    JoinColumn,
    OneToOne
} from 'typeorm'
import { ObjectType, Field } from '@nestjs/graphql';
import { Gallery } from '../gallery/gallery.entity'
import { Product } from '../product/product.entity';
import { Shop } from '../shop/shop.entity';

@ObjectType()
@Entity('assets')
export class Asset extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Field()
    @Column({ type: 'varchar', nullable: false })
    url: string

    @Field()
    @Column({ type: 'varchar', nullable: false })
    public_id: string

    @Field()
    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    createdAt: Date;

    @Field()
    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
    updatedAt: Date;

    @Field(type => Gallery)
    @ManyToOne(type => Gallery, gallery => gallery.assets)
    gallery: Gallery

    @Field(type => Product, { nullable: true })
    @ManyToMany(type => Product, product => product.assets)
    product: Product

    @Field(type => Shop, { nullable: true })
    @OneToOne(type => Shop, shop => shop.logo, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'shop_id' })
    shop: Shop
} 