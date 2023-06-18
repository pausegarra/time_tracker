import { Module } from '@nestjs/common';
import { CreateTopicController } from './infrastructure/controllers/create-topic.ctrl';
import { MysqlRepository } from './infrastructure/repositories/mysql.repository';
import { TopicModel } from './infrastructure/model/topic.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { GetTopicsController } from './infrastructure/controllers/get-topics.ctrl';
import { DeleteTopicController } from './infrastructure/controllers/delete-topic.ctrl';
import { TopicService } from './services/topic.service';
import { UpdateTopicController } from './infrastructure/controllers/update-topic.ctrl';

@Module({
  imports: [SequelizeModule.forFeature([TopicModel])],
  providers: [
    {
      provide: 'TopicRepository',
      useClass: MysqlRepository,
    },
    TopicService,
  ],
  controllers: [
    CreateTopicController,
    GetTopicsController,
    DeleteTopicController,
    UpdateTopicController,
  ],
})
export class TopicModule {}
