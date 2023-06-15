import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TopicRepository } from 'src/topic/domain/topic.repository';
import { TopicModel } from '../model/topic.model';

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
}
