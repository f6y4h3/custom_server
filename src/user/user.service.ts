import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  async creat(user: User):Promise<void> {
    await this.usersRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(account: string): Promise<User | null> {
    return await this.usersRepository.findOneBy({ account });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
