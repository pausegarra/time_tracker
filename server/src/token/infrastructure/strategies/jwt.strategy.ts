import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { TokenService } from 'src/token/application/token.service';
import { UserService } from 'src/user/application/user.service';
import { UserDTO } from 'src/user/infrastructure/dtos/user.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly tokenService: TokenService,
    private readonly userService: UserService,
  ) {
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
    const user = await this.userService.getUserById(payload.id);
    if (user === null) {
      throw new UnauthorizedException();
    }

    return UserDTO.toResponse(user);
  }
}
