import { IsDateString, IsString } from 'class-validator';

export class UpdateAdminDTO {
  @IsString()
  name?: string;

  @IsString()
  password?: string;

  @IsDateString()
  lastLoginDate?: string;
}
