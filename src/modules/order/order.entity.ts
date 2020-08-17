import {
    BaseEntity,
    Entity,
    PrimaryGeneratedColumn,
    OneToOne,
    JoinColumn,
    ManyToMany,
    JoinTable,
    Column,
    CreateDateColumn
} from 'typeorm'
import { Product } from '../product/product.entity'
import { Customer } from '../customer/customer.entity';
import { Address } from '../address/address.entity';

@Entity('orders')
export class Order extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'numeric', nullable: true, default: 0 })
    totlaPrice: number;

    @Column({ type: 'varchar', nullable: true, default: 'incomplete' })
    status: string

    @OneToOne(type => Address, address => address.order, { eager: true, cascade: true })
    @JoinColumn({ name: 'address_id' })
    address: Address

    @ManyToMany(type => Product, product => product.order, { eager: true, cascade: true })
    @JoinTable({ name: 'product_order' })
    products: Product[]


    @OneToOne(type => Customer, customer => customer.orders, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'customer_id' })
    customer: Customer

    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    createdAt: Date;
}
