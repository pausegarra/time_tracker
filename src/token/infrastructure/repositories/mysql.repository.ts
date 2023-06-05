import { InjectModel } from '@nestjs/sequelize';
import { TokenRepository } from 'src/token/domain/token.repository';
import { TokenModel } from '../models/token.model';
import { Injectable } from '@nestjs/common';
import { TokenEntity } from 'src/token/domain/token.entity';

@Injectable()
export class MysqlRepository implements TokenRepository {
  constructor(
    @InjectModel(TokenModel) private readonly model: typeof TokenModel,
  ) {}

  async create(data: TokenEntity) {
    const token = await this.model.create({ ...data });
    return token;
  }
}
