import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
import { UserCreateDto } from './users.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  find(where: Prisma.UserWhereUniqueInput) {
    return this.prisma.user.findUnique({ where });
  }

  async create(body: UserCreateDto) {
    const password = await bcrypt.hash(body.password, 10);

    return this.prisma.user.create({
      data: {
        ...body,
        password,
      },
    });
  }
}
