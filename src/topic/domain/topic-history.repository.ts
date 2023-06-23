export interface TopicHistoryRepository {
  create(
    topicId: number,
    userId: number,
    startedAt: Date,
    closedAt: Date,
  ): Promise<void>;
}
