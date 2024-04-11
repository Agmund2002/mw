import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Movie } from '@prisma/client';
import { MoviesService } from './movies.service';
import { MovieCreateDto, MovieUpdateDto } from './movies.dto';
import { ErrorHandler } from 'src/helpers/error.cather';

@Controller('movies')
export class MoviesController extends ErrorHandler {
  constructor(private moviesService: MoviesService) {
    super();
  }

  @Get()
  getAll(): Promise<Movie[]> {
    return this.moviesService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: number): Promise<Movie> {
    const movie = await this.moviesService.getById(Number(id));
    if (!movie)
      throw new HttpException('Movie not found', HttpStatus.NOT_FOUND);

    return movie;
  }

  @Post()
  @HttpCode(201)
  async create(@Body() body: MovieCreateDto): Promise<Movie> {
    try {
      const movie = await this.moviesService.create(body);
      return movie;
    } catch (error) {
      this.giveCurrentResponse(error);
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() body: MovieUpdateDto,
  ): Promise<Movie> {
    try {
      const movie = await this.moviesService.update(Number(id), body);
      return movie;
    } catch (error) {
      this.giveCurrentResponse(error);
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: number): Promise<void> {
    try {
      await this.moviesService.delete(Number(id));
    } catch (error) {
      this.giveCurrentResponse(error);
    }
  }
}
