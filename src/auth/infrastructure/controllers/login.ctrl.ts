import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { LoginDto } from '../dtos/login.dto';
import { LoginService } from 'src/auth/application/login.service';

@Controller('/api/auth/login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  @HttpCode(200)
  login(@Body() body: LoginDto) {
    const { email, password } = body;
    return this.loginService.login(email, password);
  }
}
