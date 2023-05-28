import { Module } from '@nestjs/common';
import { LoginController } from './infrastructure/controllers/login.ctrl';

@Module({
  imports: [],
  controllers: [LoginController],
  providers: [],
})
export class AuthModule {}
