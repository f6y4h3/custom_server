import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  // 登录
  async signIn(account: string = '', pass: string = '') {
    const user = await this.usersService.findOneByAccount(account);
    if (user && user.password !== pass) {
      throw new UnauthorizedException('账号或密码不正确，请重试');
    }
    const payload = {
      userName: user.name,
      userId: user.id,
      account: user.account,
    };
    const access_token = await this.jwtService.signAsync(payload, {
      expiresIn: '60s',
    });
    const refresh_token = await this.jwtService.signAsync(payload, {
      expiresIn: '7d',
    });
    return {
      code: 200,
      data: {
        ...payload,
        access_token: access_token,
        refresh_token: refresh_token,
      },
      msg: '登录成功',
    };
  }

  // 刷新token
  async refreshToken(refreshToken: string) {
    try {
      const data = this.jwtService.verify(refreshToken);
      const userData = await this.usersService.findOneByAccount(data.account);
      const payload = {
        userName: userData.name,
        userId: userData.id,
        account: userData.account,
      };
      const access_token = await this.jwtService.signAsync(payload, {
        expiresIn: '60s',
      });
      const refresh_token = await this.jwtService.signAsync(payload, {
        expiresIn: '7d',
      });
      return {
        code: 200,
        data: {
          access_token,
          refresh_token,
        },
        msg: 'ok',
      };
    } catch {
      // throw new UnauthorizedException('登录失效，请重新登录')
      return {
        code: 401,
        data: {},
        msg: '登录已过期，请重新登录',
      };
    }
  }
}
