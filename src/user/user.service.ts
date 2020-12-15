import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { SitterRepository } from '../sitter/sitter.repository';
import { Sitter } from '../sitter/sitter.entity';
import { MemberType } from './user.enum';
import { Parent } from '../parent/parent.entity';
import { ParentRepository } from '../parent/parent.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: UserRepository,
    @InjectRepository(Sitter) private sitterRepository: SitterRepository,
    @InjectRepository(Parent) private parentRepository: ParentRepository,
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
      profile = await this.userRepository.findSitter(user.id);
    } else if (this.isParentMember(user.member_type)) {
      profile = await this.userRepository.findParent(user.id);
    } else {
      profile = await this.userRepository.findAll(user.id);
    }
    console.log(profile);
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

    const sitterColumns = ['careable_baby_age', 'self_introduction'];
    const sitterData = this.filterObject(sitterColumns, updateProfileDto);
    if (this.isSitterMember(user.member_type)) {
      await this.sitterRepository.updateProfile(user.sitter_id, sitterData);
      return this.userRepository.findSitter(user.id);
    }

    const parentColumns = ['desired_baby_age', 'request_infomation'];
    const parentData = this.filterObject(parentColumns, updateProfileDto);
    if (this.isSitterMember(user.member_type)) {
      await this.parentRepository.updateProfile(user.parent_id, parentData);
      return this.userRepository.findParent(user.id);
    }
  }

  async additionalRegister(user, data) {
    if (user.member_type === MemberType.ALL) {
      throw new BadRequestException();
    }

    if (this.isSitterMember(user.member_type)) {
      const parent = await this.parentRepository.createUser(data);
      await this.userRepository.updateProfile(user.id, {
        parent: parent.id,
        member_type: MemberType.ALL,
      });
    }
    if (this.isParentMember(user.member_type)) {
      const sitter = await this.sitterRepository.createUser(data);
      await this.userRepository.updateProfile(user.id, {
        sitter: sitter.id,
        member_type: MemberType.ALL,
      });
    }
  }

  private isSitterMember(member_type) {
    return member_type === MemberType.SITTER;
  }

  private isParentMember(member_type) {
    return member_type === MemberType.PARENT;
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
