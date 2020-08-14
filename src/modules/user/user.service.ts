import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { RoleRepository } from '../role/role.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly _userRepository: UserRepository,
    @InjectRepository(RoleRepository)
    private readonly _roleRepository: RoleRepository,
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

  async update(id: number, user: User): Promise<void> {
    await this._userRepository.update(id, user);
  }

  async delete(id: number): Promise<void> {
    const userExist = await this._userRepository.findOne(id);
    if (!userExist) throw new NotFoundException();
    await this._userRepository.delete(id);
  }

  async setRoleToUser(userId: number, roleId: number) {
    const userExist = await this._userRepository.findOne(userId);
    if (!userExist) throw new NotFoundException();
    const roleExist = await this._roleRepository.findOne(roleId);
    if (!roleExist) throw new NotFoundException('Role does not exist');
    userExist.roles.push(roleExist);
    await this._userRepository.save(userExist);
    return true;
  }
}
