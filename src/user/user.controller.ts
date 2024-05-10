import { Controller, Get, Post, Body, HttpCode, Query } from '@nestjs/common';
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
    if (user && user.account == '') {
      return {
        code: 400,
        data: {
          isRegister: false,
        },
        msg: '账号不能为空',
      };
    }
    const userData = await this.userService.findOneByAccount(user.account);
    if (userData) {
      return {
        code: 400,
        data: {
          isRegister: false,
          userData,
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
  @Get('searchUser')
  async findUserByAccount(@Query('account') account: string) {
    return {
      code: 200,
      data: await this.userService.findOneByAccount(account),
      msg: '',
    };
  }
}
