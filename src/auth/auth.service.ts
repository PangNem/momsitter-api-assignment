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
import { AllowedCreateMemberType } from '../user/user.enum';

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

    switch (member_type) {
      case AllowedCreateMemberType.SITTER:
        await this.sitterSignup(createUserDto);
        break;
      case AllowedCreateMemberType.PARENT:
        await this.parentSignup(createUserDto);
        break;
    }
  }

  async sitterSignup(createUserDto: CreateUserDto) {
    const { careable_baby_age, self_introduction, ...result } = createUserDto;
    const password = this.getHashedPassword(createUserDto.password);

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

  async parentSignup(createUserDto: CreateUserDto) {
    const { desired_baby_age, request_infomation, ...result } = createUserDto;
    const password = this.getHashedPassword(createUserDto.password);

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

  getHashedPassword(password) {
    const SALT_ROUND = 10;
    return bcrypt.hash(password, SALT_ROUND);
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne(username);

    const isMatch = await bcrypt.compare(password, user.password);
    if (user && isMatch) {
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
}
