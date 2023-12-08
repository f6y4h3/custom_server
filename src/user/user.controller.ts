import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get()
  findUser() {
    return this.userService.findAll();
  }
  @Post('register')
  async registerUser(@Body() user: User) {
    await this.userService.creat(user);
  }
}
