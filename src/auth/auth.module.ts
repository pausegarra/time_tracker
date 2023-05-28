import { Module } from '@nestjs/common';
import { LoginController } from './infrastructure/controllers/login.ctrl';
import { AuthService } from './application/auth.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule],
  controllers: [LoginController],
  providers: [AuthService],
})
export class AuthModule {}
