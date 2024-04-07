import { HttpException, HttpStatus } from '@nestjs/common';
import { Prisma } from '@prisma/client';

export class ErrorHandler {
  giveCurrentResponse(error: Error): void {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2025'
    )
      throw new HttpException('Entity not found', HttpStatus.NOT_FOUND);

    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002'
    )
      throw new HttpException(
        'Duplication of a unique value',
        HttpStatus.CONFLICT,
      );
  }
}
