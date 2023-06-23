import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TopicHistoryRepository } from 'src/topic/domain/topic-history.repository';
import { TopicHistoryModel } from '../model/topic-history.model';
import { TopicHistoryEntity } from 'src/topic/domain/topic-hisotory.entity';

@Injectable()
export class MysqlTopicHistoryRepository implements TopicHistoryRepository {
  constructor(
    @InjectModel(TopicHistoryModel)
    private readonly model: typeof TopicHistoryModel,
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

  async getActiveOfUser(userId: number): Promise<TopicHistoryEntity | null> {
    return this.model.findOne({
      where: {
        userId,
        closedAt: null,
      },
    });
  }

  async update(
    topicHistoryId: number,
    data: Record<string, string | number | Date>,
  ): Promise<void> {
    this.model.update(
      {
        ...data,
      },
      {
        where: {
          id: topicHistoryId,
        },
      },
    );
  }
}
