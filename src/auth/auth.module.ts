import { Module } from '@nestjs/common';
import { LoginController } from './infrastructure/controllers/login.ctrl';
import { UserModule } from 'src/user/user.module';
import { RegisterController } from './infrastructure/controllers/register.ctrl';
import { UserService } from 'src/user/application/user.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './infrastructure/strategies/jwt.strategy';
import { TokenService } from 'src/token/application/token.service';
import { TokenModule } from 'src/token/token.module';
import { LoginService } from './application/login.service';
import { RegisterService } from './application/register.service';

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
  providers: [
    LoginService,
    RegisterService,
    UserService,
    JwtStrategy,
    TokenService,
  ],
})
export class AuthModule {}
