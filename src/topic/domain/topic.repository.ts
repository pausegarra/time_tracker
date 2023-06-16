import { TopicEntity } from './topic.entity';

export interface TopicRepository {
  findByUser(userId: number): Promise<TopicEntity[]>;
  createTopicForUser(
    topicData: Omit<TopicEntity, 'userId'>,
    userId: number,
  ): Promise<TopicEntity>;
}
