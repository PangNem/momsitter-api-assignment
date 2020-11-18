import { Injectable, NotFoundException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(user_id: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(user_id, password);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }
}
