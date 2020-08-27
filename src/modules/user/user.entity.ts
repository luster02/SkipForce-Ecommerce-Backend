import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql'
import { UserDetails } from './user.details.entity';
import { Shop } from '../shop/shop.entity'
import { Gallery } from '../gallery/gallery.entity'

@ObjectType()
@Entity('users')
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Field()
  @Column({ type: 'varchar', unique: true, length: 25, nullable: false })
  username: string;

  @Field()
  @Column({ type: 'varchar', nullable: false })
  email: string;

  @Field()
  @Column({ type: 'varchar', nullable: false })
  password: string;

  @Field(type => UserDetails)
  @OneToOne(type => UserDetails, userDetails => userDetails.user, { cascade: true, nullable: false, eager: true })
  details: UserDetails;

  @Field(type => Shop)
  @OneToOne(type => Shop, shop => shop.user, { cascade: true, nullable: false, eager: true })
  shop: Shop

  @Field(type => Gallery, { nullable: true })
  @OneToOne(type => Gallery, gallery => gallery.user, { eager: true, nullable: false, onDelete: 'CASCADE' })
  gallery: Gallery

  @Field()
  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}
