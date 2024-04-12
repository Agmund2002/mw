import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { IsEmptyBodyMiddleware } from './middlewares/is-empty-body.middleware';
import { UsersModule } from './users/users.module';

@Module({
  imports: [ConfigModule.forRoot(), MoviesModule, AuthModule, UsersModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(IsEmptyBodyMiddleware)
      .exclude(
        { path: 'movies', method: RequestMethod.GET },
        { path: 'movies/:id', method: RequestMethod.GET },
        { path: 'movies/:id', method: RequestMethod.DELETE },
        { path: 'auth/logout', method: RequestMethod.POST },
      )
      .forRoutes('*');
  }
}
