import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class IsEmptyBodyMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    const { length } = Object.keys(req.body);
    console.log(length);

    if (!length)
      throw new HttpException('Missing fields', HttpStatus.BAD_REQUEST);

    next();
  }
}
