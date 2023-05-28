import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from './user/infrastructure/models/user.model';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'time_tracker',
      models: [UserModel],
    }),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
