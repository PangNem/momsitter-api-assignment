import { IsNotEmpty } from 'class-validator';

export default class LoginUserDto {
  @IsNotEmpty()
  user_id: string;

  @IsNotEmpty()
  password: string;
}
