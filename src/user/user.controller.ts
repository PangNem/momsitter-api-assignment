import {
  Controller,
  Get,
  UseGuards,
  Request,
  Patch,
  Body,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getUserProfile(@Request() request) {
    return this.userService.getUserProfile(request.user);
  }

  @Patch('profile')
  @UseGuards(JwtAuthGuard)
  async updateProfile(
    @Request() request,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    return this.userService.updateProfile(request.user, updateProfileDto);
  }
}
