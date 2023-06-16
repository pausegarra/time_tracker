import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TopicRepository } from 'src/topic/domain/topic.repository';
import { TopicModel } from '../model/topic.model';
import { TopicEntity } from 'src/topic/domain/topic.entity';

@Injectable()
export class MysqlRepository implements TopicRepository {
  constructor(
    @InjectModel(TopicModel) private readonly topicModel: typeof TopicModel,
  ) {}

  findByUser(userId: number) {
    return this.topicModel.findAll({
      where: {
        userId,
      },
    });
  }

  createTopicForUser(
    name: string,
    userId: number,
    color: string,
    icon: string,
  ): Promise<TopicEntity> {
    return this.topicModel.create({
      name,
      userId,
      color,
      icon,
    });
  }
}
