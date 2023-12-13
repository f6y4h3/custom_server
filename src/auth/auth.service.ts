import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(account: string, pass: string) {
    const user = await this.usersService.findOne(account);   
    if (user && user.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { username: user.name, id: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}