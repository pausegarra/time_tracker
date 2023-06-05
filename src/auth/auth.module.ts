import { Module } from '@nestjs/common';
import { LoginController } from './infrastructure/controllers/login.ctrl';
import { AuthService } from './application/auth.service';
import { UserModule } from 'src/user/user.module';
import { RegisterController } from './infrastructure/controllers/register.ctrl';
import { UserService } from 'src/user/application/user.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './infrastructure/strategies/jwt.strategy';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: 'random',
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [LoginController, RegisterController],
  providers: [AuthService, UserService, JwtStrategy],
})
export class AuthModule {}
