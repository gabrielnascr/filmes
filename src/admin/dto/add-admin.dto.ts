import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class AddAdminDTO {
  @IsString()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNumber()
  @IsOptional()
  role: number;
}
