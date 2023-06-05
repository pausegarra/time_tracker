import { Column, Table, Model } from 'sequelize-typescript';
import { TokenEntity, TokenTypes } from 'src/token/domain/token.entity';

@Table({
  tableName: 'Tokens',
})
export class TokenModel extends Model implements TokenEntity {
  @Column
  token: string;

  @Column
  type: TokenTypes;

  @Column
  userId: number;

  @Column
  expiresAt: string;
}
