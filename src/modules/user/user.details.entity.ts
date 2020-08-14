import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql'
import { User } from './user.entity';

@ObjectType()
@Entity('user_details')
export class UserDetails extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Field()
  @Column({ type: 'varchar', length: 50, nullable: true })
  name: string;

  @Field()
  @Column({ type: 'varchar', nullable: true })
  lastname: string;

  @Field(type => User, { nullable: false })
  @OneToOne(type => UserDetails, { onDelete: 'CASCADE' })
  user: User

  @Field()
  @CreateDateColumn({ type: 'timestamp', name: 'created_at', nullable: true })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at', nullable: true })
  updatedAt: Date;
}
