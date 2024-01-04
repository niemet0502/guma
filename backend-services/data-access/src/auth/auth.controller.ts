import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { User } from '../users/entities/user.entity';
import { UserDecorator } from '../users/user.decorator';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @Post('login')
  @ApiCreatedResponse({ type: User })
  async login(@Body() loginDto: LoginDto) {
    const user = await this.userService.find(loginDto);

    if (!user) {
      throw new HttpException(
        'Invalid Email or Password',
        HttpStatus.NOT_FOUND,
      );
    }

    delete user.password;

    const session = await this.authService.createSession(user);

    return { user, session };
  }

  @Post('logout')
  @HttpCode(204)
  async logout(@UserDecorator('token') token: string) {
    const session = await this.authService.findOne(token);

    if (!session) {
      const errors = { session: 'session not found' };
      throw new BadRequestException({ errors });
    }

    return await this.authService.remove(session);
  }
}
