import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserDetailRepository } from './repositories/user.detail.repository'
import { UserDetailDto } from './dto/user.detail.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly _userRepository: UserRepository,
    @InjectRepository(UserDetailRepository)
    private readonly _userDetailRepository: UserDetailRepository
  ) { }

  async get(id: number): Promise<User> {
    if (!id) throw new BadRequestException('id must be sent');
    const user: User = await this._userRepository.findOne(id);
    if (!user) throw new NotFoundException();
    return user;
  }

  async getAll(): Promise<User[]> {
    const users: User[] = await this._userRepository.find();
    return users;
  }

  async update(id: number, userData: UserDetailDto): Promise<void> {
    const details: UserDetailDto = await this._userDetailRepository.findOne(id)
    if (!details) throw new NotFoundException();
    await this._userDetailRepository.update(id, userData)
  }

  async delete(id: number): Promise<void> {
    const userExist = await this._userRepository.findOne(id);
    if (!userExist) throw new NotFoundException();
    await this._userRepository.delete(id);
  }

}
