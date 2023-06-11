import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request.cookies?.token;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: 'random',
    });
  }

  async validate(payload: any) {
    return { userId: payload.id };
  }
}
