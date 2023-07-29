import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth/infrastructure/guards/jwt-auth.guard';
import { Request } from 'express';

@Controller()
export class TestController {
  @Get('/test')
  @UseGuards(new JwtAuthGuard())
  test(@Req() req: Request) {
    return req.user;
  }
}
