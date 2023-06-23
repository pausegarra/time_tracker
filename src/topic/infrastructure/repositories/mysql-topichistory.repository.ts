import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TopicHistoryRepository } from 'src/topic/domain/topic-history.repository';
import { TopicHistoryModel } from '../model/topic-history.model';
import { TopicModel } from '../model/topic.model';

@Injectable()
export class MysqlTopicHistoryRepository implements TopicHistoryRepository {
  constructor(
    @InjectModel(TopicHistoryModel) private readonly model: typeof TopicModel,
  ) {}

  async create(
    topicId: number,
    userId: number,
    startedAt: Date,
    closedAt: Date,
  ): Promise<void> {
    this.model.create({
      topicId,
      userId,
      startedAt,
      closedAt,
    });
  }
}
