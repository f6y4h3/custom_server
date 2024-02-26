import { HttpException, HttpStatus } from '@nestjs/common';
export class UnauthorizedException extends HttpException {
  constructor() {
    super({code:401}, HttpStatus.OK);
  }
}
