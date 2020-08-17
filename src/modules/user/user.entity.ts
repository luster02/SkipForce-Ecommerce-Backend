import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  JoinTable,
  ManyToMany,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql'
import { UserDetails } from './user.details.entity';
import { Role } from '../role/role.entity';
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

  @Field(type => UserDetails, { nullable: false })
  @OneToOne(type => UserDetails, { cascade: true, nullable: false, eager: true })
  @JoinColumn({ name: 'detail_id' })
  details: UserDetails;

  @Field(type => Role, { nullable: false })
  @ManyToMany(type => Role, role => role.users, { eager: true })
  @JoinTable({ name: 'user_roles' })
  roles: Role[];

  @OneToOne(type => Shop, shop => shop.user)
  shop: Shop

  @OneToOne(type=> Gallery, gallery => gallery.user, {eager: true, onDelete: 'CASCADE'})
  gallery: Gallery

  @Field()
  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}
