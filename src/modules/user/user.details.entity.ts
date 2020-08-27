import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql'
import { User } from './user.entity';

@ObjectType()
@Entity('user_details')
export class UserDetails extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 50, nullable: true })
  name: string;

  @Field({ nullable: true })
  @Column({ type: 'varchar', nullable: true })
  lastname: string;

  @Field(type => User, { nullable: false })
  @OneToOne(type => User, user => user.details, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User

  @Field()
  @CreateDateColumn({ type: 'timestamp', name: 'created_at', nullable: true })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at', nullable: true })
  updatedAt: Date;
}
