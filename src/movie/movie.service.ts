import { Injectable, NotFoundException, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMovieDTO } from './dto/create-movie.dto';
import { UpdateMovieDTO } from './dto/update-movie.dto';
import { Movie } from './movie.entity';

enum ErrorMessages {
  NOT_FOUND = 'This movie is not found',
  NOT_FOUND_SEARCH = 'Movies with this text not found',
}

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie) private movieRepository: Repository<Movie>,
  ) {}

  async findAll(): Promise<Movie[]> {
    return this.movieRepository.find();
  }

  async findAllByUser(ownerId: number): Promise<Movie[]> {
    return this.movieRepository.findBy({ ownerId });
  }

  async findAllSearch(title: string) {
    const results: Movie[] = await this.movieRepository.query(`
      SELECT * FROM movie WHERE title LIKE '%${title}%'
    `);

    if (results.length === 0) {
      throw new NotFoundException(ErrorMessages.NOT_FOUND_SEARCH);
    }

    return results;
  }

  async findOneById(id: number): Promise<Movie> {
    const movie = await this.movieRepository.findOneBy({ id });

    if (!movie) {
      throw new NotFoundException(ErrorMessages.NOT_FOUND);
    }

    return movie;
  }

  async store(
    loggerUserId: number,
    createMovieDTO: CreateMovieDTO,
  ): Promise<Movie> {
    return this.movieRepository.save({
      ...createMovieDTO,
      ownerId: loggerUserId,
    });
  }

  async update(id: number, updateMovieDTO: UpdateMovieDTO) {
    const movieExits = await this.movieRepository.findOneBy({ id });

    if (!movieExits) {
      throw new NotFoundException(ErrorMessages.NOT_FOUND);
    }

    await this.movieRepository.update(id, updateMovieDTO);
  }

  async delete(id: number) {
    const movieExits = await this.movieRepository.findOneBy({ id });

    if (!movieExits) {
      throw new NotFoundException(ErrorMessages.NOT_FOUND);
    }

    await this.movieRepository.delete(id);
  }
}
