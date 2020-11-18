import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Sitter } from 'src/sitter/sitter.entity';
import { SitterRepository } from 'src/sitter/sitter.repository';
import { User } from 'src/user/user.entity';
import { UserRepository } from 'src/user/user.repository';
import { UserService } from 'src/user/user.service';

import CreateUserDto from './dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: UserRepository,
    @InjectRepository(Sitter) private sitterRepository: SitterRepository,

    private userSerivce: UserService,
    private jwtService: JwtService,
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

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userSerivce.findOne(username);
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  private isSitterMember(member_type: string): boolean {
    return member_type === 'SITTER';
  }
}
