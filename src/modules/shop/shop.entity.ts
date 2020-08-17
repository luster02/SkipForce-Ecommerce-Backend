import {
    BaseEntity,
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    JoinColumn,
    OneToMany
} from 'typeorm'
import { User } from '../user/user.entity';
import { Product } from '../product/product.entity';

@Entity('shops')
export class Shop extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', length: 30, nullable: true })
    name: string

    @Column({ type: 'varchar', nullable: true })
    description: string

    @Column({ type: 'varchar', default: 'INACTIVE', nullable: true })
    status: string

    @OneToMany(type => Product, product => product.shop, { onDelete: 'CASCADE' })
    products: Product[]

    @OneToOne(type => User, user => user.shop, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User
}
