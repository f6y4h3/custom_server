import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PublicService } from './public.service';
import config from '../common/config';

@Controller('public')
export class PublicController {
  constructor(private readonly publicService: PublicService) {}
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile() file: Express.Multer.File) {
    const fileResult = {
      path: `${config.path}/static/${file.filename}`,
      name: file.filename,
      size: file.size,
    };
    return {
      code: 200,
      data: fileResult,
      msg: '',
    };
  }
}
