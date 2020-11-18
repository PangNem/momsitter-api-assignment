import { Module } from '@nestjs/common';
import { SitterModule } from '../sitter/sitter.module';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
  imports: [SitterModule],
  providers: [UserService, UserRepository],
})
export class UserModule {}
