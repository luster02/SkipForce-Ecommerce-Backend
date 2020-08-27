import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    OneToOne,
    JoinColumn,
    OneToMany,
    Column
} from 'typeorm'
import { ObjectType, Field } from '@nestjs/graphql';
import { User } from '../user/user.entity';
import { Asset } from '../asset/asset.entity'

@ObjectType()
@Entity('gallery')
export class Gallery extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Field({nullable: true})
    @Column({ type: 'varchar', nullable: true })
    folder: string

    @Field(type => User)
    @OneToOne(type => User, user => user.gallery, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User

    @Field(type => [Asset])
    @OneToMany(type => Asset, asset => asset.gallery)
    assets: Asset[]
}