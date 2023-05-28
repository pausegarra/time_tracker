import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from 'src/auth/application/auth.service';
import { RegisterDto } from '../dtos/register.dto';

@Controller('/api/auth/register')
export class RegisterController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  register(@Body() body: RegisterDto) {
    return this.authService.register(body);
  }
}
