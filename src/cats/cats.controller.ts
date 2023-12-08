import {
  Controller,
  Get,
  Req,
  Post,
  Param,
  Body,
  UseFilters,
} from '@nestjs/common';
import { Request } from 'express';
import { CreateCatDto } from './dto/create-cat.dto';
import {
  ApiTags,
  // ApiCreatedResponse,
  ApiOperation,
  // ApiBody,
} from '@nestjs/swagger';
import { HttpExceptionFilter } from '../common/exceptionFilter/http-exception.filter';

@ApiTags('猫接口')
// @ApiCreatedResponse({
//   description: 'The record has been successfully created.',
// })
@Controller('cats')
export class CatsController {
  @Get('')
  @ApiOperation({ summary: '查询所有猫' })
  findAll(@Req() request: Request): string {
    // console.log(request.ip);
    return `This action returns all cats ${request.ip}`;
  }

  @Post()
  @ApiOperation({ summary: '创建所有猫' })
  @UseFilters(new HttpExceptionFilter())
  // @ApiBody({type:CreateCatDto,required:true})
  create(@Body() createCatDto: CreateCatDto): string {
    console.log(createCatDto);
    return `This action adds a new cat`;
  }
  @Get(':id')
  @ApiOperation({ summary: '查询某只猫' })
  findOne(@Param() params: any): string {
    console.log(params.id);
    return `This action returns a #${params.id} cat`;
  }
}
