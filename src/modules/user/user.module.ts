import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthModule } from '../auth/user/auth.module';
import { RoleRepository } from '../role/role.repository';
import { UserResolver } from './user.resolver'
import { UserDetailRepository } from './user.detail.repository'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserRepository,
      RoleRepository,
      UserDetailRepository
    ]),
    AuthModule,
  ],
  providers: [UserService, UserResolver],
  controllers: [UserController],
})
export class UserModule { }
