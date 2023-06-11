import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { TokenService } from 'src/token/application/token.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly tokenService: TokenService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request.cookies[this.tokenService.getCookieName()];
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
