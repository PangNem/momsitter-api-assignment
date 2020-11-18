import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SitterService } from 'src/sitter/sitter.service';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { memberType } from './user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: UserRepository) {}
  async createUser(user) {
    return this.userRepository.create(user);
  }

  async findUser(user) {
    const username = user.username;
    return this.userRepository.findOneQuery(username);
  }

  async getUserProfile(user) {
    if (user.member_type === memberType.SITTER) {
      return this.userRepository.findSitter(user.sitter_id);
    }
  }
}
