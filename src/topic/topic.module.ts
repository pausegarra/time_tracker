import { Module } from '@nestjs/common';
import { CreateTopicController } from './infrastructure/controllers/create-topic.ctrl';
import { MysqlTopicRepository } from './infrastructure/repositories/mysql-topic.repository';
import { TopicModel } from './infrastructure/model/topic.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { GetTopicsController } from './infrastructure/controllers/get-topics.ctrl';
import { DeleteTopicController } from './infrastructure/controllers/delete-topic.ctrl';
import { TopicService } from './application/topic.service';
import { UpdateTopicController } from './infrastructure/controllers/update-topic.ctrl';
import { ActivateTopicController } from './infrastructure/controllers/activate-topic.ctrl';
import { MysqlTopicHistoryRepository } from './infrastructure/repositories/mysql-topichistory.repository';
import { TopicHistorySerivce } from './application/topic-history.service';
import { TopicHistoryModel } from './infrastructure/model/topic-history.model';
import { GetCurrentTopicController } from './infrastructure/controllers/get-current.ctrl';

@Module({
  imports: [SequelizeModule.forFeature([TopicModel, TopicHistoryModel])],
  providers: [
    {
      provide: 'TopicRepository',
      useClass: MysqlTopicRepository,
    },
    {
      provide: 'TopicHistoryRepository',
      useClass: MysqlTopicHistoryRepository,
    },
    TopicService,
    TopicHistorySerivce,
  ],
  exports: ['TopicHistoryRepository'],
  controllers: [
    CreateTopicController,
    GetTopicsController,
    DeleteTopicController,
    UpdateTopicController,
    ActivateTopicController,
    GetCurrentTopicController,
  ],
})
export class TopicModule {}
