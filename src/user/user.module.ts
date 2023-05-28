import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from './infrastructure/models/user.model';
import { MysqlRepository } from './infrastructure/repositories/mysql.repository';
import { UserService } from './application/user.service';

@Module({
  imports: [SequelizeModule.forFeature([UserModel])],
  exports: ['UserRepository', UserService],
  controllers: [],
  providers: [
    {
      provide: 'UserRepository',
      useClass: MysqlRepository,
    },
    UserService,
  ],
})
export class UserModule {}
