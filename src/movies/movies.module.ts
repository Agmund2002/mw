import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { LoggerMiddleware } from 'src/middlewares/logger.middleware';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { PrismaService } from 'src/prisma.service';
import { IsEmptyBodyMiddleware } from 'src/middlewares/is-empty-body.middleware';

@Module({
  controllers: [MoviesController],
  providers: [MoviesService, PrismaService],
})
export class MoviesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
    consumer
      .apply(IsEmptyBodyMiddleware)
      .exclude(
        { path: 'movies', method: RequestMethod.GET },
        { path: 'movies/:id', method: RequestMethod.GET },
        { path: 'movies/:id', method: RequestMethod.DELETE },
      )
      .forRoutes(MoviesController);
  }
}
