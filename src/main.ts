import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{ abortOnError: false });
  await app.listen(3000);
  console.log('服务开启');
}
bootstrap();
