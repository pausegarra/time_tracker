import {
  Column,
  Table,
  Model,
  DataType,
  ForeignKey,
  AutoIncrement,
  PrimaryKey,
} from 'sequelize-typescript';
import { TopicEntity } from 'src/topic/domain/topic.entity';
import { UserModel } from 'src/user/infrastructure/models/user.model';

@Table({
  tableName: 'Topics',
})
export class TopicModel extends Model implements TopicEntity {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column(DataType.STRING)
  name: string;

  @Column(DataType.STRING)
  color: string;

  @Column(DataType.STRING)
  icon: string;

  @ForeignKey(() => UserModel)
  @Column(DataType.INTEGER)
  userId: number;
}
