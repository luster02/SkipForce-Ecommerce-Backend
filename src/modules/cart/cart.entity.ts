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
import { ObjectType, Field } from '@nestjs/graphql'
import { Customer } from '../customer/customer.entity'
import { Product } from '../product/product.entity'

@ObjectType()
@Entity('cart')
export class Cart extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Field()
    @Column({ type: 'numeric', nullable: true, default: 0 })
    totlaPrice: number

    @Field(type => Customer)
    @OneToOne(type => Customer, customer => customer.cart, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'customer_id' })
    customer: Customer

    @Field(type => [Product])
    @ManyToMany(type => Product, product => product.cart, { onDelete: 'CASCADE', eager: true, cascade: true })
    @JoinTable({ name: 'product_cart' })
    products: Product[]

}