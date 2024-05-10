import {
  Body,
  Query,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { NoAuth } from '../common/decorators/public.decorators';
import { AuthGuard } from './auth.guard';
// AuthGuard

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // @UseGuards(AuthGuard)
  @NoAuth()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    console.log(signInDto);
    
    return this.authService.signIn(signInDto.account, signInDto.password);
  }

  @NoAuth()
  @HttpCode(HttpStatus.OK)
  @Get('refresh')
  refreshToken(@Query('refresh_token') refresh_token: string) {
    return this.authService.refreshToken(refresh_token);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return {
      code: 200,
      data: req.user,
      msg: '',
    };
  }
}
