import { Repository, EntityRepository } from 'typeorm';
import { UserDetails } from '../user.details.entity';

@EntityRepository(UserDetails)
export class UserDetailRepository extends Repository<UserDetails> { }