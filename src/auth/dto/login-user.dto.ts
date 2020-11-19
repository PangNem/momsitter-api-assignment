import { IsNotEmpty, Matches } from 'class-validator';

export default class LoginUserDto {
  @IsNotEmpty()
  user_id: string;

  @IsNotEmpty()
  @Matches(/^[A-Za-z0-9]{6,12}$/)
  password: string;
}
