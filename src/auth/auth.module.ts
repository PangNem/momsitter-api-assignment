import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserRepository } from 'src/user/user.repository';
import { SitterRepository } from 'src/sitter/sitter.repository';
import { UserService } from 'src/user/user.service';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';

@Module({
  controllers: [AuthController],
  imports: [UserModule, PassportModule],
  providers: [
    AuthService,
    UserRepository,
    SitterRepository,
    UserService,
    LocalStrategy,
  ],
})
export class AuthModule {}
