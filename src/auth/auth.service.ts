import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { UserRepository } from 'src/user/user.repository';
import CreateUserDto from './dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private userRepository: UserRepository) {}

  async signup(createUserDto: CreateUserDto) {
    const { member_type } = createUserDto;

    if (this.isSitterMember(member_type)) {
      const { careable_baby_age, self_introduction, ...result } = createUserDto;
      const userData = await this.userRepository.createUser(result);
      return {
        userData,
      };
    }
  }

  private isSitterMember(member_type: string): boolean {
    return member_type === 'SITTER';
  }
}
