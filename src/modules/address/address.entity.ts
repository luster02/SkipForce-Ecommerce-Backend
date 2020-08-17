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
import { Customer } from '../customer/customer.entity';
import { Order } from '../order/order.entity';

@Entity('address')
export class Address extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', nullable: true })
    street: string;

    @Column({ type: 'numeric', nullable: true })
    number: number;

    @Column({ type: 'numeric', nullable: true })
    postalCode: number;

    @Column({ type: 'varchar', nullable: true })
    city: string;

    @OneToOne(type => Customer, customer => customer.address, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'customer_id' })
    customer: Customer

    @OneToOne(type => Order, order => order.address)
    order: Order

    @CreateDateColumn({ type: 'timestamp', name: 'created_at', nullable: true })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at', nullable: true })
    updatedAt: Date;
}
