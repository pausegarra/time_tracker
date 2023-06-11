import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { LoginDto } from '../dtos/login.dto';
import { LoginService } from 'src/auth/application/login.service';
import { UserService } from 'src/user/application/user.service';
import { UserNotFoundException } from 'src/user/application/exceptions/user-not-found.error';
import { PasswordsNotMatchException } from 'src/auth/application/exceptions/passwords-not-match.error';
import { TokenService } from 'src/token/application/token.service';
import { UserDTO } from 'src/user/infrastructure/dtos/user.dto';
import { Response } from 'express';

@Controller('/api/auth/login')
export class LoginController {
  constructor(
    private readonly loginService: LoginService,
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  @Post()
  @HttpCode(200)
  async login(@Body() body: LoginDto, @Res() res: Response) {
    try {
      const { email, password } = body;
      const user = await this.userService.getUserByEmail(email);
      await this.loginService.comparePasswords(password, user.password);

      const payload = { id: user.id };
      const token = this.tokenService.generateToken(payload);
      await this.tokenService.saveUserSessionToken(token, user.id);

      res.cookie('token', token, this.tokenService.getCookieOptions());
      res.json({
        user: UserDTO.toResponse(user),
        token,
      });
    } catch (err) {
      if (
        err instanceof UserNotFoundException ||
        err instanceof PasswordsNotMatchException
      )
        throw new HttpException('invalid_credentials', HttpStatus.UNAUTHORIZED);

      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
