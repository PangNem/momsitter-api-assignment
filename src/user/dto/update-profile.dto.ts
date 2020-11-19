import { IsEmail, IsOptional } from 'class-validator';

export class UpdateProfileDto {
  @IsOptional()
  name: string;

  @IsOptional()
  birth: number;

  @IsOptional()
  gender: string;

  @IsOptional()
  username: string;

  @IsOptional()
  password: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  careable_baby_age: number;

  @IsOptional()
  self_introduction: string;

  @IsOptional()
  desired_baby_age: number;

  @IsOptional()
  request_infomation: string;
}
