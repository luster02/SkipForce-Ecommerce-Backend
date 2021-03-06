import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repositories/user.repository';
import { UserService } from './user.service';
import { AuthModule } from '../auth/user/auth.module';
import { UserResolver } from './user.resolver'
import { UserDetailRepository } from './repositories/user.detail.repository'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserRepository,
      UserDetailRepository
    ]),
    AuthModule,
  ],
  providers: [UserService, UserResolver],
})
export class UserModule { }
