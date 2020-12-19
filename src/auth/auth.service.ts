import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Parent } from '../parent/parent.entity';
import { ParentRepository } from '../parent/parent.repository';
import { Sitter } from '../sitter/sitter.entity';
import { SitterRepository } from '../sitter/sitter.repository';
import { User } from '../user/user.entity';
import { UserRepository } from '../user/user.repository';
import CreateUserDto from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: UserRepository,
    @InjectRepository(Sitter) private sitterRepository: SitterRepository,
    @InjectRepository(Parent) private parentRepository: ParentRepository,

    private jwtService: JwtService,
  ) {}

  async signup(createUserDto: CreateUserDto) {
    const { member_type } = createUserDto;

    const SALT_ROUND = 10;
    const password = await bcrypt.hash(createUserDto.password, SALT_ROUND);

    if (this.isSitterMember(member_type)) {
      const { careable_baby_age, self_introduction, ...result } = createUserDto;

      const sitter = await this.sitterRepository.createUser({
        careable_baby_age,
        self_introduction,
      });
      await this.userRepository.createUser({
        ...result,
        sitter: sitter.id,
        password,
      });
    }
    if (this.isParentMember(member_type)) {
      const { desired_baby_age, request_infomation, ...result } = createUserDto;

      const parent = await this.parentRepository.createUser({
        desired_baby_age,
        request_infomation,
      });
      await this.userRepository.createUser({
        ...result,
        parent: parent.id,
        password,
      });
    }
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne(username);

    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    console.log(payload);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  private isSitterMember(member_type: string): boolean {
    return member_type === 'SITTER';
  }
  private isParentMember(member_type: string): boolean {
    return member_type === 'PARENT';
  }
}
