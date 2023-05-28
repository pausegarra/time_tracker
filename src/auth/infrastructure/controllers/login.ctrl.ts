import { Controller, Post } from '@nestjs/common';

@Controller('/api/auth/login')
export class LoginController {
  @Post()
  login() {
    return 'hello';
  }
}
