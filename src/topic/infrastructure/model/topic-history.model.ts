import {
  AutoIncrement,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { TopicHistoryEntity } from 'src/topic/domain/topic-hisotory.entity';
import { TopicModel } from './topic.model';
import { UserModel } from 'src/user/infrastructure/models/user.model';

@Table({
  tableName: 'topic_history',
})
export class TopicHistoryModel extends Model implements TopicHistoryEntity {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ForeignKey(() => TopicModel)
  @Column(DataType.INTEGER)
  topicId: number;

  @ForeignKey(() => UserModel)
  @Column(DataType.INTEGER)
  userId: number;

  @Column(DataType.DATE)
  startedAt: Date;

  @Column(DataType.DATE)
  closedAt: Date;
}
