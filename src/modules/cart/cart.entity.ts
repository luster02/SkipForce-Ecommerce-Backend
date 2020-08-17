import {
    BaseEntity,
    Entity,
    PrimaryGeneratedColumn,
    OneToOne,
    JoinColumn,
    ManyToMany,
    JoinTable,
    Column
} from 'typeorm'
import { Customer } from '../customer/customer.entity'
import { Product } from '../product/product.entity'

@Entity('cart')
export class Cart extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'numeric', nullable: true, default: 0 })
    totlaPrice: number

    @OneToOne(type => Customer, customer => customer.cart, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'customer_id' })
    customer: Customer

    @ManyToMany(type => Product, product => product.cart, { onDelete: 'CASCADE', eager: true, cascade: true })
    @JoinTable({ name: 'product_cart' })
    products: Product[]

}