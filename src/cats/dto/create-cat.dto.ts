import { ApiProperty } from '@nestjs/swagger';

export class CreateCatDto {
  @ApiProperty({ description: '名字', minimum: 1, default: 2 ,name:'name'})
  name: string;
  @ApiProperty({ description: '年龄', name:'age'})
  age: number;
  @ApiProperty({ description: '种类', name:'breed'})
  breed: string;
}
