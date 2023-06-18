import { Module } from '@nestjs/common';
import { CreateTopicController } from './infrastructure/controllers/create-topic.ctrl';
import { MysqlRepository } from './infrastructure/repositories/mysql.repository';
import { TopicModel } from './infrastructure/model/topic.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { CreateTopicService } from './services/create-topic.service';
import { GetTopicsController } from './infrastructure/controllers/get-topics.ctrl';
import { GetTopicService } from './services/get-topics.service';
import { DeleteTopicController } from './infrastructure/controllers/delete-topic.ctrl';
import { DeleteTopicService } from './services/delete-topic.service';
import { TopicService } from './services/topic.service';

@Module({
  imports: [SequelizeModule.forFeature([TopicModel])],
  providers: [
    {
      provide: 'TopicRepository',
      useClass: MysqlRepository,
    },
    CreateTopicService,
    GetTopicService,
    DeleteTopicService,
    TopicService,
  ],
  controllers: [
    CreateTopicController,
    GetTopicsController,
    DeleteTopicController,
  ],
})
export class TopicModule {}
