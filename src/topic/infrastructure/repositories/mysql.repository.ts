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

  findAllOfUser(userId: number) {
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

  async deleteTopic(topicId: number): Promise<void> {
    await this.topicModel.destroy({
      where: {
        id: topicId,
      },
    });
  }

  findOneOfUser(topicId: number, userId: number): Promise<TopicEntity> {
    return this.topicModel.findOne({
      where: {
        id: topicId,
        userId,
      },
    });
  }

  async updateTopic(
    topicId: number,
    name: string,
    color: string,
    icon: string,
  ): Promise<void> {
    await this.topicModel.update(
      {
        name,
        color,
        icon,
      },
      {
        where: {
          id: topicId,
        },
      },
    );
  }
}
