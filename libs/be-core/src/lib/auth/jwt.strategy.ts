// libs/be-core/src/lib/auth/jwt.strategy.ts

import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Role } from '../rbac/roles.enum';
import { Permission } from '../rbac/permissions.enum';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET_KEY'),
    });
  }

  async validate(payload: any) {
    // *Assuming roles and permissions are included in the JWT payload*
    const user = {
      id: payload.sub,
      roles: payload.roles as Role[],
      permissions: payload.permissions as Permission[],
    };

    return user; // Passport will attach this user to req.user
  }
}
