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
import { ObjectType, Field } from '@nestjs/graphql';
import { Product } from '../product/product.entity'
import { Customer } from '../customer/customer.entity';
import { Address } from '../address/address.entity';

@ObjectType()
@Entity('orders')
export class Order extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Field()
    @Column({ type: 'numeric', nullable: true, default: 0 })
    totlaPrice: number;

    @Field()
    @Column({ type: 'varchar', nullable: true, default: 'incomplete' })
    status: string

    @Field()
    @OneToOne(type => Address, address => address.order, { eager: true, cascade: true })
    @JoinColumn({ name: 'address_id' })
    address: Address

    @Field(type => [Product])
    @ManyToMany(type => Product, product => product.order, { eager: true, cascade: true })
    @JoinTable({ name: 'product_order' })
    products: Product[]

    @Field(type => Customer)
    @OneToOne(type => Customer, customer => customer.orders, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'customer_id' })
    customer: Customer

    @Field()
    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    createdAt: Date;
}
