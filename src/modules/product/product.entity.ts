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
import { Shop } from '../shop/shop.entity';
import { Asset } from '../asset/asset.entity';
import { Cart } from '../cart/cart.entity';
import { Order } from '../order/order.entity'

@Entity('products')
export class Product extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', length: 30, nullable: false })
    name: string

    @Column({ type: 'varchar', nullable: false })
    description: string

    @Column({ type: 'integer', nullable: false })
    price: number

    @Column({ type: 'varchar', nullable: false })
    category: string

    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
    updatedAt: Date;

    @ManyToOne(type => Shop, shop => shop.products, { onDelete: 'CASCADE' })
    shop: Shop

    @ManyToMany(type => Asset, asset => asset.product, { onDelete: 'CASCADE', eager: true, cascade: true })
    @JoinTable({ name: 'product_assets' })
    assets: Asset[]

    @ManyToMany(type => Cart, cart => cart.products, { onDelete: 'CASCADE' })
    cart: Cart

    @ManyToMany(type => Order, order => order.products, { onDelete: 'CASCADE' })
    order: Order
}