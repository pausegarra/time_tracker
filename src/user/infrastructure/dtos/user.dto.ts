import { UserEntity } from 'src/user/domain/user.entity';

export class UserDTO {
  id: number;
  name: string;
  email: string;

  constructor(id: number, name: string, email: string) {
    this.id = id;
    this.name = name;
    this.email = email;
  }

  static toResponse(user: UserEntity) {
    return new UserDTO(user.id, user.name, user.email);
  }
}
