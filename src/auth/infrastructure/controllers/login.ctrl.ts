import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { LoginDto } from '../dtos/login.dto';
import { LoginService } from 'src/auth/application/login.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('/api/auth/login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  login(@Body() body: LoginDto) {
    const { email, password } = body;
    return this.loginService.login(email, password);
  }
}
