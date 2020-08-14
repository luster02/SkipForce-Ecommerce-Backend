import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthModule } from '../auth/auth.module';
import { RoleRepository } from '../role/role.repository';
import { UserResolver } from './user.resolver'

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository, RoleRepository]),
    AuthModule,
  ],
  providers: [UserService, UserResolver],
  controllers: [UserController],
})
export class UserModule { }
