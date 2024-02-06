// import {
//   Controller,
//   Post,
//   UseInterceptors,
//   UploadedFile,
//   BadRequestException
// } from '@nestjs/common';

// import { FileInterceptor } from '@nestjs/platform-express';
// import { Express } from 'express';
// import * as path from 'path';
// import { fileStorage } from '../utils/file-storage';

// @Controller('public')
// export class PublicController {
//   @Post('upload')
//   @UseInterceptors(
//     FileInterceptor('picture', {
//       dest: 'uploads',
//       storage: fileStorage,
//       // 限制图片大小
//       limits: {
//         fileSize: 1024 * 1024 * 10 // 10M
//       },
//       // 限制图片格式
//       fileFilter(req, file, callback) {
//         const extname = path.extname(file.originalname);
//         console.log(extname,'extname');
//         if (['.png', '.jpg', '.gif', '.jpeg'].includes(extname)) {
//           console.log('000000');

//           callback(null, true);
//         } else {
//           console.log('只能上传图片！');

//           callback(new BadRequestException('只能上传图片！'), false);
//         }
//       }
//     })
//   )
//   uploadPicture(@UploadedFile() file: Express.Multer.File) {
//     console.log(file,'uploadPicture');
//     return file;
//   }
// }
import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PublicService } from './public.service';
// import { diskStorage } from 'multer';
// import { extname } from 'path';
@Controller('public')
export class PublicController {
  constructor(private readonly publicService: PublicService) {}
  @Post('upload') // @UseInterceptors(
  //   FileInterceptor('file', {
  //     storage: diskStorage({
  //       destination: './public/uploaded',
  //       filename: (_, file, callback) => {
  //         const fileName = `${
  //           new Date().getTime() + extname(file.originalname)
  //         }`;
  //         return callback(null, fileName);
  //       },
  //     }),
  //   }),
  // )
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile() file: Express.Multer.File) {
    // console.log('upload', file); // return this.uploadService.upload();
    // file.path
    const fileResult = {
      path: `http://localhost:16000/static/${file.filename}`,
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
