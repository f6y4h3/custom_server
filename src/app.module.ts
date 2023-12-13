import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { CatsModule } from './cats/cats.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import connect from './common/database/connect';
import { AuthGuard } from './auth/auth.guard';
import { APP_GUARD } from '@nestjs/core';


@Module({
  imports: [CatsModule, connect.connect, UserModule, AuthModule],
  providers:[
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ]
})  
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
