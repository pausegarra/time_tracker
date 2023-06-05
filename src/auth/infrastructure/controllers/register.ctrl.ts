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
import { TokenService } from 'src/token/application/token.service';

@Controller('/api/auth/register')
export class RegisterController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  @Post()
  async register(@Body() body: RegisterDto) {
    try {
      await this.userService.ensureUserEmailNotexists(body.email);
      const user = await this.authService.register(body);
      const payload = { id: user.id };
      const token = this.tokenService.generateToken(payload);
      await this.tokenService.saveUserSessionToken(token, user.id);

      return {
        user,
        token,
      };
    } catch (err) {
      if (err instanceof EmailAlreadyExistsError)
        throw new HttpException('email_exists', HttpStatus.BAD_REQUEST);

      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
