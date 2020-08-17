import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    OneToOne,
    JoinColumn,
    OneToMany,
    Column
} from 'typeorm'
import { User } from '../user/user.entity';
import { Asset } from '../asset/asset.entity'

@Entity('gallery')
export class Gallery extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', nullable: true })
    folder: string

    @OneToOne(type => User, user => user.gallery, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User

    @OneToMany(type => Asset, asset => asset.gallery)
    assets: Asset[]
}