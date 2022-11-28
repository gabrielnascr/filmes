import { IsString } from 'class-validator';

export class UpdateMovieDTO {
  @IsString()
  title?: string;

  @IsString()
  description?: string;

  @IsString()
  genre?: string;
}
