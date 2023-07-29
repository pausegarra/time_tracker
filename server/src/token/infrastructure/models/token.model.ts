import {
  Column,
  Table,
  Model,
  DataType,
  ForeignKey,
  PrimaryKey,
  AutoIncrement,
  BelongsTo,
} from 'sequelize-typescript';
import { TokenEntity, TokenTypes } from 'src/token/domain/token.entity';
import { UserModel } from 'src/user/infrastructure/models/user.model';

@Table({
  tableName: 'tokens',
})
export class TokenModel extends Model implements TokenEntity {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column(DataType.STRING)
  token: string;

  @Column(DataType.STRING)
  type: TokenTypes;

  @ForeignKey(() => UserModel)
  @Column(DataType.INTEGER)
  userId: number;

  @Column(DataType.DATE)
  expiresAt: string;

  @BelongsTo(() => UserModel)
  user: UserModel;
}
