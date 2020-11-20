import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SitterRepository } from 'src/sitter/sitter.repository';
import { UserService } from 'src/user/user.service';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt/dist/jwt.module';
import { jwtConstants } from './auth.constants';
import { JwtStrategy } from './jwt.strategy';
import { UserRepository } from 'src/user/user.repository';
import { ParentRepository } from 'src/parent/parent.repository';

@Module({
  controllers: [AuthController],
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '300000s' },
    }),
  ],
  providers: [
    AuthService,
    UserService,
    UserRepository,
    SitterRepository,
    ParentRepository,
    LocalStrategy,
    JwtStrategy,
  ],
})
export class AuthModule {}
