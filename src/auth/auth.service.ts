import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sitter } from 'src/sitter/sitter.entity';
import { SitterRepository } from 'src/sitter/sitter.repository';
import { User } from 'src/user/user.entity';
import { UserRepository } from 'src/user/user.repository';
import CreateUserDto from './dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: UserRepository,
    @InjectRepository(Sitter) private sitterRepository: SitterRepository,
  ) {}

  async signup(createUserDto: CreateUserDto) {
    const { member_type } = createUserDto;

    if (this.isSitterMember(member_type)) {
      const { careable_baby_age, self_introduction, ...result } = createUserDto;

      const sitterUserData = await this.sitterRepository.createSitterUser({
        careable_baby_age,
        self_introduction,
      });
      const userData = await this.userRepository.createUser({
        ...result,
        sitter: sitterUserData.id,
      });

      return Object.assign(sitterUserData, userData);
    }
  }

  private isSitterMember(member_type: string): boolean {
    return member_type === 'SITTER';
  }
}
