import {
  Controller, Get, Param,
  Delete, ParseIntPipe, UseGuards,
  Patch, Body, Post
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../role/decorators/role.decorator';
import { RoleGuard } from '../role/guards/role.guard';
import { UserDetailDto } from './dto/user.detail.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@UseGuards(AuthGuard())
@Controller('users')
export class UserController {
  constructor(private readonly _userService: UserService) { }

  @Get(':id')
  @Roles('ADMINISTRATOR')
  @UseGuards(AuthGuard(), RoleGuard)
  async getUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
    const user = await this._userService.get(id);
    return user;
  }

  @Get()
  async getUsers(): Promise<User[]> {
    const users = await this._userService.getAll();
    return users;
  }

  @Patch(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() userData: UserDetailDto
  ): Promise<boolean> {
    await this._userService.update(id, userData)
    return true
  }

  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<boolean> {
    await this._userService.delete(id);
    return true;
  }


  @Post('setRole/:userId/:roleId')
  async setRoleToUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('roleId', ParseIntPipe) roleId: number,
  ) {
    return this._userService.setRoleToUser(userId, roleId);
  }
}
