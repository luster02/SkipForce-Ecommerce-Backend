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
import { ObjectType, Field } from '@nestjs/graphql';
import { Asset } from '../asset/asset.entity';

@ObjectType()
@Entity('banner')
export class Banner extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Field()
    @Column({ type: 'varchar', length: '60', nullable: false })
    title: string

    @Field()
    @Column({ type: 'varchar', length: 150, nullable: false })
    description: string

    @Field()
    @Column({ type: 'varchar', nullable: true })
    redirect: string

    @Field(type => Asset, { nullable: true })
    @OneToOne(type => Asset, asset => asset.banner, { cascade: true, eager: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'asset_id' })
    asset: Asset

    @Field()
    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    createdAt: Date;

    @Field()
    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
    updatedAt: Date;
}