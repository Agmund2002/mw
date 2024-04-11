import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ErrorHandler } from 'src/helpers/error.cather';
import { UsersService } from 'src/users/users.service';
import { UserCreateDto } from 'src/users/users.dto';
import { CurrentUser } from 'src/decorators/user.decorator';

@Controller('auth')
export class AuthController extends ErrorHandler {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {
    super();
  }

  @Post('singin')
  async singin(@Body() body: UserCreateDto) {
    const user = await this.usersService.find({ email: body.email });
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    const passwordIsValid = await this.authService.comparePassword(
      body.password,
      user.password,
    );
    if (!passwordIsValid)
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);

    const token = this.authService.createToken(user.id);
    await this.authService.changeToken(user.id, token);

    return {
      email: user.email,
      token,
    };
  }

  @Post('singup')
  @HttpCode(201)
  async singup(@Body() body: UserCreateDto) {
    try {
      const { password, token, ...user } = await this.usersService.create(body);
      return user;
    } catch (error) {
      this.giveCurrentResponse(error);
    }
  }

  @Post('logout')
  @HttpCode(204)
  logout(@CurrentUser('id') id: number) {
    this.authService.changeToken(id, '');
  }
}
