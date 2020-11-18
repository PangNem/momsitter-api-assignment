import { Module } from '@nestjs/common';
import { SitterRepository } from 'src/sitter/sitter.repository';
import { SitterService } from 'src/sitter/sitter.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
  imports: [],
  providers: [UserService, UserRepository, SitterService, SitterRepository],
  controllers: [UserController],
})
export class UserModule {}
