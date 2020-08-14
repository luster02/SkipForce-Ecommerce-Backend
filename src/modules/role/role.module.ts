import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleRepository } from './role.repository';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { RoleResolver } from './role.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([RoleRepository])],
  providers: [RoleService, RoleResolver],
  controllers: [RoleController],
})
export class RoleModule { }
