import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class SignUpDTO {
  @IsEmail()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
