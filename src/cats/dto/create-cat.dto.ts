import { ApiProperty } from '@nestjs/swagger';

export class CreateCatDto {
  @ApiProperty({ description: '名字', minimum: 1, default: 2 })
  name: string;
  @ApiProperty({ description: '年龄', })
  age: number;
  @ApiProperty({ description: '产生', })
  breed: string;
}
