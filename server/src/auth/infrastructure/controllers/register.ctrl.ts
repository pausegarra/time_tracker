import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { RegisterDto } from '../dtos/register.dto';
import { UserService } from 'src/user/application/user.service';
import { EmailAlreadyExistsError } from 'src/user/application/exceptions/email-exists.error';
import { TokenService } from 'src/token/application/token.service';
import { RegisterService } from 'src/auth/application/register.service';
import { UserDTO } from 'src/user/infrastructure/dtos/user.dto';
import { Response } from 'express';

@Controller('/api/auth/register')
export class RegisterController {
  constructor(
    private readonly registerService: RegisterService,
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  @Post()
  async register(@Body() body: RegisterDto, @Res() res: Response) {
    try {
      await this.userService.ensureUserEmailNotexists(body.email);
      const user = await this.registerService.register(body);

      const payload = { id: user.id };
      const token = this.tokenService.generateToken(payload);
      await this.tokenService.saveUserSessionToken(token, user.id);

      res.cookie(
        this.tokenService.getCookieName(),
        token,
        this.tokenService.getCookieOptions(),
      );
      res.json({
        user: UserDTO.toResponse(user),
        token,
      });
    } catch (err) {
      if (err instanceof EmailAlreadyExistsError)
        throw new HttpException('email_exists', HttpStatus.BAD_REQUEST);

      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
