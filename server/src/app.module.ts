import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from './user/infrastructure/models/user.model';
import { TokenModel } from './token/infrastructure/models/token.model';
import { TestController } from './test.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TopicModel } from './topic/infrastructure/model/topic.model';
import { TopicModule } from './topic/topic.module';
import { Sequelize } from 'sequelize-typescript';
import { TopicHistoryModel } from './topic/infrastructure/model/topic-history.model';
import { ReportingModule } from './reporting/reporting.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        dialect: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        models: [UserModel, TokenModel, TopicModel, TopicHistoryModel],
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    TopicModule,
    ReportingModule,
  ],
  controllers: [TestController],
  providers: [],
})
export class AppModule {
  constructor(private sequelize: Sequelize) {
    this.sequelize.sync({ alter: true }); // Sincronizar los modelos
  }
}
