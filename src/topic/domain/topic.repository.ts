import { TopicEntity } from './topic.entity';

export interface TopicRepository {
  findByUser(userId: number): Promise<TopicEntity[]>;
}
