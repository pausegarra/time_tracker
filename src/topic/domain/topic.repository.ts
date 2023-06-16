import { TopicEntity } from './topic.entity';

export interface TopicRepository {
  findByUser(userId: number): Promise<TopicEntity[]>;
  createTopicForUser(
    name: string,
    userId: number,
    color: string,
    icon: string,
  ): Promise<TopicEntity>;
}
