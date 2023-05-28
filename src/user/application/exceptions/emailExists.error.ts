import { HttpStatus } from '@nestjs/common';

export class EmailAlreadyExistsError extends Error {
  code: number;

  constructor() {
    super();
    this.message = 'Email already exists!';
    this.code = HttpStatus.BAD_REQUEST;
  }
}
