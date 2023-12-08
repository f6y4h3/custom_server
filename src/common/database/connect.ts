import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../user/user.entity';

export default {
  connect: TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '5214fyh',
    database: 'custom',
    // 要为此连接加载的实体。接受需要加载From实体的实体类和目录。目录支持全局模式。
    entities: [User],
    synchronize: true,
  }),
};
