import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TopicHistoryRepository } from 'src/topic/domain/topic-history.repository';
import { TopicHistoryModel } from '../model/topic-history.model';
import { TopicHistoryEntity } from 'src/topic/domain/topic-hisotory.entity';
import { TopicModel } from '../model/topic.model';
import { TopicHistoryWithTopic } from 'src/topic/domain/topic-history-with-topic.entity';
import { Sequelize } from 'sequelize-typescript';
import { Op } from 'sequelize';
import sequelize from 'sequelize';

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

  async updateWhereIn(
    topicHistoryIds: number[],
    data: Record<string, string | number | Date>,
  ): Promise<void> {
    this.model.update(
      {
        ...data,
      },
      {
        where: {
          id: {
            [Op.in]: topicHistoryIds,
          },
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
              'TIMESTAMPDIFF(SECOND, startedAt, COALESCE(closedAt, CURRENT_TIMESTAMP))',
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

  getAllActiveTopics(): Promise<TopicHistoryEntity[]> {
    return this.model.findAll({
      where: {
        closedAt: null,
      },
    });
  }

  getReportOfTodayUser(userId: any): Promise<any> {
    return this.model.findAll({
      attributes: [
        'topicId',
        [
          sequelize.literal(
            `SUM(TIMESTAMPDIFF(SECOND, GREATEST(CURDATE(), startedAt), LEAST(DATE_ADD(CURDATE(), INTERVAL 1 DAY), IFNULL(closedAt, CURRENT_TIMESTAMP()))))`,
          ),
          'total',
        ],
      ],
      where: {
        userId,
        startedAt: {
          [sequelize.Op.lt]: sequelize.literal(
            `DATE_ADD(CURDATE(), INTERVAL 1 DAY)`,
          ),
        },
        [sequelize.Op.or]: [
          {
            closedAt: {
              [sequelize.Op.gt]: sequelize.literal(`CURDATE()`),
            },
          },
          {
            closedAt: null,
            startedAt: {
              [sequelize.Op.lt]: sequelize.literal(
                `DATE_ADD(CURDATE(), INTERVAL 1 DAY)`,
              ),
            },
          },
        ],
      },
      group: ['topicId'],
      include: [TopicModel],
    });
  }
}
