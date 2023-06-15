import { Module } from '@nestjs/common';
import { CreateTopicController } from './infrastructure/controllers/create-topic.ctrl';
import { MysqlRepository } from './infrastructure/repositories/mysql.repository';
import { TopicModel } from './infrastructure/model/topic.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { CreateTopicService } from './services/create-topic.service';

@Module({
  imports: [SequelizeModule.forFeature([TopicModel])],
  providers: [
    {
      provide: 'TopicRepository',
      useClass: MysqlRepository,
    },
    CreateTopicService,
  ],
  controllers: [CreateTopicController],
})
export class TopicModule {}
