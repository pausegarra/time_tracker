import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from 'src/auth/application/auth.service';
import { RegisterDto } from '../dtos/register.dto';
import { UserService } from 'src/user/application/user.service';
import { EmailAlreadyExistsError } from 'src/user/application/exceptions/emailExists.error';

@Controller('/api/auth/register')
export class RegisterController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post()
  async register(@Body() body: RegisterDto) {
    try {
      await this.userService.ensureUserEmailNotexists(body.email);
      return this.authService.register(body);
    } catch (err) {
      if (err instanceof EmailAlreadyExistsError)
        throw new HttpException('email_exists', HttpStatus.BAD_REQUEST);
    }
  }
}
