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
    const { id, member_type } = user;

    switch (member_type) {
      case MemberType.SITTER:
        return this.userRepository.findSitter(id);
      case MemberType.PARENT:
        return this.userRepository.findParent(id);
      case MemberType.ALL:
        return this.userRepository.findAll(id);
      default:
        throw new BadRequestException('올바르지 않은 멤버입니다.');
    }
  }

  async updateProfile(user: any, updateProfileDto: UpdateProfileDto) {
    const { member_type } = user;
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

    switch (member_type) {
      case MemberType.SITTER:
        await this.sitterUserProfileUpdate(user, updateProfileDto);
        break;
      case MemberType.PARENT:
        await this.parentUserProfileUpdate(user, updateProfileDto);
        break;
      case MemberType.ALL:
        await this.allUserProfileUpdate(user, updateProfileDto);
        break;
    }

    return this.getUserProfile(user);
  }

  async sitterUserProfileUpdate(user, updateProfileDto) {
    const { sitter_id } = user;
    const sitterColumns = ['careable_baby_age', 'self_introduction'];
    const sitterData = this.filterObject(sitterColumns, updateProfileDto);

    await this.sitterRepository.updateProfile(sitter_id, sitterData);
  }
  async parentUserProfileUpdate(user, updateProfileDto) {
    const { parent_id } = user;
    const parentColumns = ['desired_baby_age', 'request_infomation'];
    const parentData = this.filterObject(parentColumns, updateProfileDto);

    await this.parentRepository.updateProfile(parent_id, parentData);
  }
  async allUserProfileUpdate(user, updateProfileDto) {}

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

abstract class UserProfile {
  protected profileUpdate() {}

  abstract profileUpdateByMemberType();

  protected getUserProfile() {}

  public() {
    this.profileUpdate();
    this.profileUpdateByMemberType();
    this.getUserProfile();
  }
}
