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
import { Customer } from './customer.entity'

@ObjectType()
@Entity('customer_details')
export class CustomerDetail extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Field({ nullable: true })
    @Column({ type: 'varchar', nullable: true })
    name: string

    @Field({ nullable: true })
    @Column({ type: 'varchar', nullable: true })
    lastname: string

    @Field({ nullable: true })
    @Column({ type: 'varchar', nullable: true })
    phone: string;

    @Field(type => Customer)
    @OneToOne(type => Customer, customer => customer.details, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'customer_id' })
    customer: Customer

    @Field()
    @CreateDateColumn({ type: 'timestamp', name: 'created_at', nullable: true })
    createdAt: Date;

    @Field()
    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at', nullable: true })
    updatedAt: Date;
}
