import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TopicHistoryRepository } from 'src/topic/domain/topic-history.repository';
import { TopicHistoryModel } from '../model/topic-history.model';
import { TopicHistoryEntity } from 'src/topic/domain/topic-hisotory.entity';
import { TopicModel } from '../model/topic.model';
import { TopicHistoryWithTopic } from 'src/topic/domain/topic-history-with-topic.entity';
import { Sequelize } from 'sequelize-typescript';

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

  getActiveOfUserWithTopic(userId: number): Promise<TopicHistoryWithTopic> {
    return this.model.findOne({
      where: {
        userId,
        closedAt: null,
      },
      include: [TopicModel],
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

  async getReportOfUserGroupedByTopic(userId: any): Promise<any> {
    return this.model.findAll({
      attributes: [
        'topicId',
        [
          Sequelize.fn(
            'SUM',
            Sequelize.literal(
              'TIMESTAMPDIFF(SECOND, startedAt, COALESCE(closedAt, CURRENT_TIMESTAMP)) * 1000',
            ),
          ),
          'total',
        ],
      ],
      where: {
        userId: userId,
      },
      group: ['topicId'],
      include: [TopicModel],
    });
  }
}
