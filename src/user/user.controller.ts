import { Controller, Get, Post, Body, HttpCode } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { NoAuth } from 'src/common/decorators/public.decorators';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get()
  findUser() {
    return this.userService.findAll();
  }
  @NoAuth()
  @Post('register')
  @HttpCode(200)
  async registerUser(@Body() user: User) {
    const userData = await this.userService.findOne(user.account);
    if (userData) {
      return {
        code: 400,
        data: {
          isRegister: false,
          userData
        },
        msg: '该账号已注册',
      };
    }
    await this.userService.creat(user);
    return {
      code: 200,
      data: {
        isRegister: true,
      },
      msg: 'ok',
    };
  }
}
