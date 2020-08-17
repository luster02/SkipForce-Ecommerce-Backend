import {
    BaseEntity,
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    ManyToMany,
    JoinTable,
} from 'typeorm'
import { ObjectType, Field } from '@nestjs/graphql';
import { Shop } from '../shop/shop.entity';
import { Asset } from '../asset/asset.entity';
import { Cart } from '../cart/cart.entity';
import { Order } from '../order/order.entity'

@ObjectType()
@Entity('products')
export class Product extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Field()
    @Column({ type: 'varchar', length: 30, nullable: false })
    name: string

    @Field()
    @Column({ type: 'varchar', nullable: false })
    description: string

    @Field()
    @Column({ type: 'integer', nullable: false })
    price: number

    @Field()
    @Column({ type: 'varchar', nullable: false })
    category: string

    @Field()
    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    createdAt: Date;

    @Field()
    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
    updatedAt: Date;

    @Field(type => Shop)
    @ManyToOne(type => Shop, shop => shop.products, { onDelete: 'CASCADE' })
    shop: Shop

    @Field(type => [Asset])
    @ManyToMany(type => Asset, asset => asset.product, { onDelete: 'CASCADE', eager: true, cascade: true })
    @JoinTable({ name: 'product_assets' })
    assets: Asset[]

    @Field(type => Cart)
    @ManyToMany(type => Cart, cart => cart.products, { onDelete: 'CASCADE' })
    cart: Cart

    @Field(type => Order)
    @ManyToMany(type => Order, order => order.products, { onDelete: 'CASCADE' })
    order: Order
}