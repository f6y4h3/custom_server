import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { FriendService } from './friend.service';
import { Friend } from './friend.entity';
import { UserService } from 'src/user/user.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('friend')
export class FriendController {
  constructor(
    private friendService: FriendService,
    private userService: UserService,
  ) {}
  @Get('getFriends')
  @UseGuards(AuthGuard)
  async getFriends(@Request() req) {
    const list = await this.friendService.findAll(req.user.userId);
    const resultList = [];
    for (const item of list) {
      const userId =
        item.friend_id == req.user.userId ? item.user_id : item.friend_id;
      const data = await this.userService.findOneByUserId(userId);
      delete data.password;
      resultList.push(data);
    }
    return {
      code: 200,
      data: {
        list: resultList,
      },
      msg: '',
    };
  }
  @Post('addFriend')
  @UseGuards(AuthGuard)
  async addFriend(@Request() req, @Body('friendId') friend_id: number) {
    const friend = { friend_id, user_id: req.user.userId } as Friend;
    return await this.friendService.creat(friend);
  }
}
