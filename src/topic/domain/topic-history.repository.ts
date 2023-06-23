import { TopicHistoryEntity } from './topic-hisotory.entity';

export interface TopicHistoryRepository {
  create(
    topicId: number,
    userId: number,
    startedAt: Date,
    closedAt: Date,
  ): Promise<void>;

  getActiveOfUser(userId: number): Promise<TopicHistoryEntity | null>;

  update(
    topicHistoryId: number,
    data: Record<string, string | number | Date>,
  ): Promise<void>;
}
