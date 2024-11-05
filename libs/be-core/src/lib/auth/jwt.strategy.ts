// libs/be-core/src/lib/auth/jwt.strategy.ts

import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import jwksRsa from 'jwks-rsa';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(configService: ConfigService) {
    const authStrategy = configService.get<string>('authStrategy');

    if (authStrategy === 'jwt') {
      const secretKey = configService.get<string>('jwtSecretKey');

      super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
        secretOrKey: secretKey,
      });
    } else if (authStrategy === 'okta') {
      const issuer = configService.get<string>('oktaIssuerUrl');
      super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
        secretOrKeyProvider: jwksRsa.expressJwtSecret({
          cache: true,
          rateLimit: true,
          jwksUri: `${issuer}/v1/keys`,
        }),
        issuer: issuer,
        audience: configService.get<string>('oktaClientId'),
        algorithms: ['RS256'],
      });
    } else if (authStrategy === 'mock') {
      // For mock strategy, provide a dummy configuration
      super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
        secretOrKey: 'mock-secret',
      });
    }
  }

  async validate(payload: any) {
    const user = {
      id: payload.sub,
      roles: payload.roles || [],
      permissions: payload.permissions || [],
    };

    return user;
  }
}

