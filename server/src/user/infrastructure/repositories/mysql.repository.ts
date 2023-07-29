import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserRepository } from 'src/user/domain/user.repository';
import { UserModel } from '../models/user.model';

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

  create(name: string, email: string, password: string) {
    const user = this.model.create({
      name,
      email,
      password,
    });
    return user;
  }

  findById(id: number) {
    const user = this.model.findOne({
      where: {
        id,
      },
    });
    return user;
  }
}
