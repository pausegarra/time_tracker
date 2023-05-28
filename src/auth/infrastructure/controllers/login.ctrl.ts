import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from 'src/auth/application/auth.service';
import { LoginDto } from '../dtos/login.dto';

@Controller('/api/auth/login')
export class LoginController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @HttpCode(200)
  login(@Body() body: LoginDto) {
    const { email, password } = body;
    return this.authService.login(email, password);
  }
}
