import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SitterService } from 'src/sitter/sitter.service';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { memberType } from './user.entity';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { SitterRepository } from 'src/sitter/sitter.repository';
import { Sitter } from 'src/sitter/sitter.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: UserRepository,
    @InjectRepository(Sitter) private sitterRepository: SitterRepository,
  ) {}
  async createUser(user) {
    return this.userRepository.create(user);
  }

  async findUser(user) {
    const username = user.username;
    return this.userRepository.findOneQuery(username);
  }

  async getUserProfile(user) {
    let profile;
    if (this.isSitterMember(user.member_type)) {
      profile = await this.userRepository.findSitter(user.sitter_id);
    }
    return profile;
  }

  async updateProfile(user: any, updateProfileDto: UpdateProfileDto) {
    const userColumns = [
      'name',
      'birth',
      'gender',
      'username',
      'password',
      'email',
    ];
    const userData = this.filterObject(userColumns, updateProfileDto);
    await this.userRepository.updateProfile(user.id, userData);

    if (this.isSitterMember(user.member_type)) {
      const sitterColumns = ['careable_baby_age', 'self_introduction'];
      const sitterData = this.filterObject(sitterColumns, updateProfileDto);

      await this.sitterRepository.updateProfile(user.sitter_id, sitterData);
    }

    return this.getUserProfile(user);
  }
  private isSitterMember(member_type) {
    return member_type === memberType.SITTER;
  }

  private filterObject(keys, from) {
    return Object.keys(from)
      .filter((key) => keys.includes(key))
      .reduce((obj, key) => {
        obj[key] = from[key];
        return obj;
      }, {});
  }
}
