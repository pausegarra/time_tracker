import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from './infrastructure/models/user.model';
import { MysqlRepository } from './infrastructure/repositories/mysql.repository';

@Module({
  imports: [SequelizeModule.forFeature([UserModel])],
  exports: ['UserRepository'],
  controllers: [],
  providers: [
    {
      provide: 'UserRepository',
      useClass: MysqlRepository,
    },
  ],
})
export class UserModule {}
