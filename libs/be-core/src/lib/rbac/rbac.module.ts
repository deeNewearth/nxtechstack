// libs/be-core/src/lib/rbac/rbac.module.ts

import { Module } from '@nestjs/common';
import { RolesPermissionsGuard } from './roles-permissions.guard';
import { Reflector } from '@nestjs/core';
import { PassportModule } from '@nestjs/passport';
import { MockStrategy } from '../auth/mock.strategy';
import { JwtStrategy } from '../auth/jwt.strategy';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { LoggingService } from '../services/logging.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [PassportModule.register({ session: true }), ConfigModule], // *Ensure session support is enabled*
  providers: [
    RolesPermissionsGuard,
    Reflector,
    MockStrategy,
    GqlAuthGuard,
    LoggingService,
    JwtStrategy,
  ],
  exports: [RolesPermissionsGuard],
})
export class RbacModule {}
