import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql'
import { User } from '../user/user.entity';

@ObjectType()
@Entity('roles')
export class Role extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Field()
  @Column({ type: 'varchar', length: 20, nullable: false })
  name: string;

  @Field()
  @Column({ type: 'text', nullable: false })
  description: string;

  @Field(type => User, { nullable: false })
  @ManyToMany(type => User, user => user.roles)
  @JoinColumn()
  users: User[];

  @Field()
  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}
