import { Controller, HttpCode, Post, Res, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { Response } from 'express';
import { TokenService } from 'src/token/application/token.service';

@Controller('/api/auth/logout')
export class LogoutController {
  constructor(private readonly tokenService: TokenService) {}

  @Post()
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  logout(@Res() res: Response) {
    return res
      .status(200)
      .clearCookie(this.tokenService.getCookieName())
      .json({});
  }
}
