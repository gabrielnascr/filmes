import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMovieDTO {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  genre: string;
}
