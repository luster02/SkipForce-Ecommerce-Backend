import {
    BaseEntity,
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
    JoinColumn
} from 'typeorm'
import { ObjectType, Field } from '@nestjs/graphql'
import { Customer } from '../customer/customer.entity';
import { Order } from '../order/order.entity';

@ObjectType()
@Entity('address')
export class Address extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Field()
    @Column({ type: 'varchar', nullable: true })
    street: string;

    @Field()
    @Column({ type: 'numeric', nullable: true })
    number: number;

    @Field()
    @Column({ type: 'numeric', nullable: true })
    postalCode: number;

    @Field()
    @Column({ type: 'varchar', nullable: true })
    city: string;

    @Field(type => Customer)
    @OneToOne(type => Customer, customer => customer.address, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'customer_id' })
    customer: Customer

    @Field(type => Order)
    @OneToOne(type => Order, order => order.address)
    order: Order

    @Field()
    @CreateDateColumn({ type: 'timestamp', name: 'created_at', nullable: true })
    createdAt: Date;

    @Field()
    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at', nullable: true })
    updatedAt: Date;
}
