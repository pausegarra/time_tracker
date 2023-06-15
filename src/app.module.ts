import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from './user/infrastructure/models/user.model';
import { TokenModel } from './token/infrastructure/models/token.model';
import { TestController } from './test.controller';
import { ConfigModule } from '@nestjs/config';
import { TopicModel } from './topic/infrastructure/model/topic.model';
import { TopicModule } from './topic/topic.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'time_tracker',
      models: [UserModel, TokenModel, TopicModel],
    }),
    AuthModule,
    TopicModule,
  ],
  controllers: [TestController],
  providers: [],
})
export class AppModule {}
