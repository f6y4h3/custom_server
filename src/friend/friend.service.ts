import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Friend } from './friend.entity';

@Injectable()
export class FriendService {
  constructor(
    @InjectRepository(Friend)
    private FriendsRepository: Repository<Friend>,
  ) {}
  async creat(friend: Friend): Promise<Friend> {
    const isFriend = await this.FriendsRepository.findOneBy(friend);
    if (isFriend && isFriend.friend_id) return null;
    console.log(friend, 'friendfriendfriend');

    return await this.FriendsRepository.save(friend);
  }
  findAll(user_id: number): Promise<Friend[]> {
    return this.FriendsRepository.findBy({ user_id: user_id });
    // const oneList = await this.FriendsRepository.findBy({ user_id: user_id });
    // const twoList = await this.FriendsRepository.findBy({ friend_id: user_id });
    // return [...oneList, ...twoList];
  }
}
