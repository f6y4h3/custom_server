import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    // return 'Hello World!';
    return JSON.stringify({msg:'测试数据,111'});
  }
}
