import { InjectModel } from '@nestjs/sequelize';
import { TokenRepository } from 'src/token/domain/token.repository';
import { TokenModel } from '../models/token.model';
import { Injectable } from '@nestjs/common';
import { TokenTypes } from 'src/token/domain/token.entity';

@Injectable()
export class MysqlRepository implements TokenRepository {
  constructor(
    @InjectModel(TokenModel) private readonly model: typeof TokenModel,
  ) {}

  async create(token: string, userId: number, type: TokenTypes) {
    const createdToken = await this.model.create({
      token,
      userId,
      type,
    });
    return createdToken;
  }
}
