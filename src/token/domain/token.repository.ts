import { TokenEntity } from './token.entity';

export interface TokenRepository {
  create(data: TokenEntity): Promise<TokenEntity>;
}
