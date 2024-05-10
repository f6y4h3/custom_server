import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { FriendController } from './friend.controller';
import { FriendService } from './friend.service';
import { Friend } from './friend.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Friend]),UserModule],
  controllers: [FriendController],
  providers: [FriendService]
})
export class FriendModule {}
