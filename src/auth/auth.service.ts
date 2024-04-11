import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  comparePassword(password: string, hashPassword: string) {
    return bcrypt.compare(password, hashPassword);
  }

  createToken(id: number) {
    return this.jwtService.sign({ id });
  }

  changeToken(id: number, token: string) {
    return this.prisma.user.update({
      where: {
        id,
      },
      data: {
        token,
      },
    });
  }
}
