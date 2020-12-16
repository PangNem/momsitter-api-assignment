import {
  Controller,
  Get,
  UseGuards,
  Request,
  Patch,
  Body,
  Post,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
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

  @Post('additional-register')
  @UseGuards(JwtAuthGuard)
  async additionalRegister(@Request() request, @Body() data) {
    return this.userService.additionalRegister(request.user, data);
  }
}
