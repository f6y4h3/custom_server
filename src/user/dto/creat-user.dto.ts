import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: '名字', minimum: 1, default: 2 ,name:'name'})
  name: string;
  @ApiProperty({ description: '账号', name:'account'})
  account: string;
  @ApiProperty({ description: '密码', name:'password'})
  password: string;

  sex:number
}
