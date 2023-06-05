import { Module } from '@nestjs/common';
import { MysqlRepository } from './infrastructure/repositories/mysql.repository';
import { TokenService } from './application/token.service';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { TokenModel } from './infrastructure/models/token.model';

@Module({
  imports: [
    SequelizeModule.forFeature([TokenModel]),
    JwtModule.register({
      secret: 'random',
      signOptions: { expiresIn: '24h' },
    }),
  ],
  exports: ['TokenRepository', TokenService],
  providers: [
    {
      provide: 'TokenRepository',
      useClass: MysqlRepository,
    },
    TokenService,
  ],
})
export class TokenModule {}
