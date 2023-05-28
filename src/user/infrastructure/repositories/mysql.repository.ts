import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserRepository } from 'src/user/domain/user.repository';
import { UserModel } from '../models/user.model';
import { UserEntity } from 'src/user/domain/user.entity';

@Injectable()
export class MysqlRepository implements UserRepository {
  constructor(
    @InjectModel(UserModel) private readonly model: typeof UserModel,
  ) {}

  findByEmail(email: string) {
    return this.model.findOne({
      where: {
        email,
      },
    });
  }

  create(data: UserEntity) {
    const user = this.model.create({ ...data });
    return user;
  }
}
