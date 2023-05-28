import { Module } from '@nestjs/common';
import { LoginController } from './infrastructure/controllers/login.ctrl';
import { AuthService } from './application/auth.service';
import { UserModule } from 'src/user/user.module';
import { RegisterController } from './infrastructure/controllers/register.ctrl';
import { UserService } from 'src/user/application/user.service';

@Module({
  imports: [UserModule],
  controllers: [LoginController, RegisterController],
  providers: [AuthService, UserService],
})
export class AuthModule {}
