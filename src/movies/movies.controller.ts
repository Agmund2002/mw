import { Controller, Get } from '@nestjs/common';

@Controller('movies')
export class MoviesController {
  @Get()
  log() {
    return {
      message: 'Hello world',
    };
  }
}
