import { IsEmail, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';

enum memberType {
  SITTER = 'SITTER',
  PARENT = 'PARENT',
}

export default class CreateUserDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  birth: number;

  @IsNotEmpty()
  gender: string;

  @IsNotEmpty()
  user_id: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsEnum(memberType)
  member_type: memberType;

  @IsOptional()
  careable_baby_age: number;

  @IsOptional()
  self_introduction: string;

  @IsOptional()
  desired_baby_age: number;

  @IsOptional()
  request_infomation: string;
}
