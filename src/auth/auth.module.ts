import { Module } from '@nestjs/common';
import { LoginController } from './infrastructure/controllers/login.ctrl';
import { UserModule } from 'src/user/user.module';
import { RegisterController } from './infrastructure/controllers/register.ctrl';
import { JwtModule } from '@nestjs/jwt';
import { TokenModule } from 'src/token/token.module';
import { LoginService } from './application/login.service';
import { RegisterService } from './application/register.service';
import { AuthenticatedStrategy } from './infrastructure/strategies/jwt.strategy';

@Module({
  imports: [
    UserModule,
    TokenModule,
    JwtModule.register({
      secret: 'random',
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [LoginController, RegisterController],
  providers: [LoginService, RegisterService, AuthenticatedStrategy],
})
export class AuthModule {}
