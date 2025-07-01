import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  findAll() {
    return this.userRepo.find();
  }

  create(data: Partial<User>) {
    const user = this.userRepo.create(data);
    return this.userRepo.save(user);
  }

  async update(id: number, data: Partial<User>) {
    await this.userRepo.update(id, data);
    return this.userRepo.findOneBy({ id });
  }

  delete(id: number) {
    return this.userRepo.delete(id);
  }
}
