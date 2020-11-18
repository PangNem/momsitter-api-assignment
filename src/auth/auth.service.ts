import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import CreateUserDto from './dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async signup(createUserDto: CreateUserDto) {
    const { member_type } = createUserDto;

    if (this.isSitterMember(member_type)) {
      const user = new User();
      const { careable_baby_age, self_introduction, ...result } = createUserDto;

      Object.assign(user, result);
      await user.save();
      return user;
    }
  }

  private isSitterMember(type) {
    return type === 'SITTER';
  }
}
