import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Movie } from '@prisma/client';
import { MovieCreateDto, MovieUpdateDto } from './movies.dto';

@Injectable()
export class MoviesService {
  constructor(private prisma: PrismaService) {}

  getAll(): Promise<Movie[]> {
    return this.prisma.movie.findMany();
  }

  getById(id: number): Promise<Movie | null> {
    return this.prisma.movie.findUnique({
      where: {
        id,
      },
    });
  }

  create(body: MovieCreateDto): Promise<Movie> {
    return this.prisma.movie.create({
      data: body,
    });
  }

  update(id: number, body: MovieUpdateDto): Promise<Movie> {
    return this.prisma.movie.update({
      where: {
        id,
      },
      data: body,
    });
  }

  delete(id: number): Promise<Movie> {
    return this.prisma.movie.delete({
      where: {
        id,
      },
    });
  }
}
