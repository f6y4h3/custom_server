import {
  Controller,
  Get,
  Req,
  Post,
  Param,
  Body,
  UseFilters,
  Query,
} from '@nestjs/common';
// import { Request } from 'express';
import { CreateCatDto } from './dto/create-cat.dto';
import {
  ApiTags,
  // ApiCreatedResponse,
  ApiOperation,
  // ApiBody,
} from '@nestjs/swagger';
import { HttpExceptionFilter } from '../common/exceptionFilter/http-exception.filter';
import { NoAuth } from '../common/decorators/public.decorators';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserService } from 'src/user/user.service';

@ApiTags('猫接口')
// @ApiCreatedResponse({
//   description: 'The record has been successfully created.',
// })
@Controller('cats')
export class CatsController {
  constructor(private userService:UserService){}
  @Get('all')
  @NoAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: '查询所有猫' })
  async findAll(@Req() request: any, @Query() query: any) {
    console.log(request.account);
    
    const data = {
      userName:(await this.userService.findOneByAccount(request.account)).name
    }
    return {
      code: 200,
      data,
      msg: query.msg,
    };
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
