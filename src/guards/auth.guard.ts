import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;
    if (!authorization)
      throw new HttpException(
        'Authorization headers not found',
        HttpStatus.UNAUTHORIZED,
      );

    const [bearer, token] = authorization.split(' ');
    if (bearer !== 'Bearer')
      throw new HttpException(
        'Authorization headers not a Bearer',
        HttpStatus.UNAUTHORIZED,
      );

    try {
      const { id } = this.authService.validateToken(token);
      const user = await this.usersService.find({ id });
      if (!user)
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);

      request.user = user;

      return true;
    } catch (error) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
  }
}
