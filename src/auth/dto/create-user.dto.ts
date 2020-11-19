import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  Matches,
} from 'class-validator';
import { AllowedCreateMemberType } from 'src/user/user.enum';

export default class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  birth: number;

  @IsNotEmpty()
  gender: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @Matches(/^[A-Za-z0-9]{6,12}$/)
  password: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsEnum(AllowedCreateMemberType)
  member_type: AllowedCreateMemberType;

  @IsOptional()
  careable_baby_age: number;

  @IsOptional()
  self_introduction: string;

  @IsOptional()
  desired_baby_age: number;

  @IsOptional()
  request_infomation: string;
}
