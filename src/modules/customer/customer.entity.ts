import {
    BaseEntity,
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm'
import { ObjectType, Field } from '@nestjs/graphql'
import { CustomerDetail } from './customer.detail.entity'
import { Cart } from '../cart/cart.entity'
import { Order } from '../order/order.entity';
import { Address } from '../address/address.entity';

@ObjectType()
@Entity('customer')
export class Customer extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Field()
    @Column({ type: 'varchar', nullable: false })
    username: string;

    @Field()
    @Column({ type: 'varchar', nullable: false })
    email: string;

    @Field()
    @Column({ type: 'varchar', nullable: false })
    password: string;

    @Field(type => CustomerDetail)
    @OneToOne(type => CustomerDetail, customerDetails => customerDetails.customer, { cascade: true, nullable: false, eager: true, onDelete: 'CASCADE' })
    details: CustomerDetail;

    @Field(type => Cart)
    @OneToOne(type => Cart, cart => cart.customer, { cascade: true, eager: true, onDelete: 'CASCADE' })
    cart: Cart

    @Field(type => [Order], { nullable: true })
    @OneToOne(type => Order, order => order.customer, { cascade: true, eager: true, onDelete: 'CASCADE' })
    orders: Order[]

    @Field(type => Address)
    @OneToOne(type => Address, address => address.customer, { cascade: true, eager: true, onDelete: 'CASCADE' })
    address: Address

    @Field()
    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    createdAt: Date;

    @Field()
    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
    updatedAt: Date;
}
