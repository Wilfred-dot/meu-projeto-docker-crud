import { Controller, Get, Post, Put, Body, Delete, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Post()
  create(@Body() body: Partial<User>) {
    return this.usersService.create(body);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: Partial<User>) {
    return this.usersService.update(Number(id), body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.delete(Number(id));
  }
}
