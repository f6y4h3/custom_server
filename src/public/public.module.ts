import { Module } from '@nestjs/common';
import { PublicController } from './public.controller';
import { PublicService } from './public.service';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
// diskStorage
// import { ServeStaticModule } from '@nestjs/serve-static';
import { extname, join } from 'path';

@Module({
  imports: [
    MulterModule.register({
      // 用于配置上传，这部分也可以写在路由上
      storage: diskStorage({
        // destination: join(__dirname, '../images'),
        destination: join('./static/uploaded'),
        filename: (_, file, callback) => {
          const fileName = `${
            new Date().getTime() + extname(file.originalname)
          }`;
          return callback(null, fileName);
        },
      }),
    }),
  ],
  controllers: [PublicController],
  providers: [PublicService],
})
export class PublicModule {}
