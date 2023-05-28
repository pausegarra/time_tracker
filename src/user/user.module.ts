import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from './infrastructure/models/user.model';

@Module({
  imports: [SequelizeModule.forFeature([UserModel])],
  exports: [],
  controllers: [],
})
export class UserModule {}
