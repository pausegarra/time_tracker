import { TokenEntity, TokenTypes } from './token.entity';

export interface TokenRepository {
  create(token: string, userId: number, type: TokenTypes): Promise<TokenEntity>;
}
