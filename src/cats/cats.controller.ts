import { Controller, Get, Req, Post, Param, Body } from '@nestjs/common';
import { Request } from 'express';
import { CreateCatDto } from './dto/create-cat.dto';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiOperation,
  // ApiBody,
} from '@nestjs/swagger';

@ApiTags('猫接口')
@ApiCreatedResponse({
  description: 'The record has been successfully created.',
})
@Controller('cats')
export class CatsController {
  @Get('')
  @ApiOperation({ summary: '查询所有猫' })
  findAll(@Req() request: Request): string {
    console.log(request);
    return 'This action returns all cats';
  }
  @Post()
  @ApiOperation({ summary: '创建猫' })
  // @ApiBody()
  // @ApiBody({
  //   type: CreateCatDto,
  //   schema: { nullable: true },
  //   examples: { name: 'chnegs' },
  // })
  create(@Body() createCatDto: CreateCatDto): string {
    console.log(createCatDto);
    return `This action adds a new cat`;
  }
  @Get(':id')
  findOne(@Param() params: any): string {
    console.log(params.id);
    return `This action returns a #${params.id} cat`;
  }
}
