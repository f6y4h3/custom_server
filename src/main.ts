import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

// import os  from 'os';
// import dns from 'dns';

// function getServerIp() {
//   const networkInterfaces = os.networkInterfaces();
//   for (const key in networkInterfaces) {
//     const addresses = networkInterfaces[key];
//     for (const addressInfo of addresses) {
//       if (!addressInfo.internal && addressInfo.family === 'IPv4') {
//         return addressInfo.address;
//       }
//     }
//   }
// }

// console.log(os);

// const serverIp = getServerIp();
// console.log("当前服务器的 IP 地址是：", serverIp);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const app = await NestFactory.create(AppModule,{ cors: true });
  // app.use
  // app.useStaticAssets('uploads', {
  //   prefix: '/api/uploads/'
  // });
  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    // .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(16000);
}
bootstrap();