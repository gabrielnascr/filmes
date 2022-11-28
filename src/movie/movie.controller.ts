import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './movie.entity';
import { MovieService } from './movie.service';
import { UpdateMovieDTO } from './dto/update-movie.dto';
import { AuthGuard } from '@nestjs/passport';
import { CreateMovieDTO } from './dto/create-movie.dto';

@Controller('movie')
@UseGuards(AuthGuard('jwt'))
export class MovieController {
  constructor(
    @InjectRepository(Movie) private movieRepository: Repository<Movie>,
    private readonly movieService: MovieService,
  ) {}

  @Get()
  async findAll(@Query('search') search: string) {
    if (search) {
      return this.movieService.findAllSearch(search);
    }

    return this.movieService.findAll();
  }

  @Get(':id')
  async findOneById(@Param('id') id: number) {
    return this.movieService.findOneById(id);
  }

  @Get('user/:id')
  async findByUser(@Param('id') id: number) {
    return this.movieService.findAllByUser(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async store(@Body() movieCreateDTO: CreateMovieDTO, @Request() req) {
    return this.movieService.store(req.user.sub, movieCreateDTO);
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  async update(
    @Param('id') id: number,
    @Body() movieUpdateDTO: UpdateMovieDTO,
  ) {
    return this.movieService.update(id, movieUpdateDTO);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.movieService.delete(id);
  }
}
