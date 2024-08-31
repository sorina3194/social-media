import { IsEmail, MaxLength, MinLength } from 'class-validator';

export class SignUpDto {
  @MinLength(3)
  @MaxLength(16)
  username: string;

  @IsEmail()
  email: string;

  @MinLength(5)
  @MaxLength(50)
  password: string;
}
