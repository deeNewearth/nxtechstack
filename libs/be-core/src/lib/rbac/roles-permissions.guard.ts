// libs/be-core/src/lib/rbac/roles-permissions.guard.ts

import {
    Injectable,
    CanActivate,
    ExecutionContext,
    UnauthorizedException,
    ForbiddenException,
  } from '@nestjs/common';
  import { Reflector } from '@nestjs/core';
  import { Role } from './roles.enum';
  import { Permission } from './permissions.enum';
  import { ROLES_KEY } from './roles.decorator';
  import { PERMISSIONS_KEY } from './permissions.decorator';
  import { LoggingService } from '../services/logging.service';
  import { GqlAuthGuard } from '../auth/gql-auth.guard';
  import { GqlExecutionContext } from '@nestjs/graphql';

  
  @Injectable()
  export class RolesPermissionsGuard implements CanActivate {
    constructor(
      private reflector: Reflector,
      private logger: LoggingService,
      private gqlAuthGuard: GqlAuthGuard // *NEW CODE ADDED*
    ) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
    // Use GqlAuthGuard to authenticate the user
    const canActivate = await this.gqlAuthGuard.canActivate(context);

    if (!canActivate) {
      this.logger.warn('Authentication failed');
      throw new UnauthorizedException('Unauthorized');
    }
  
    // *Ensure the request and user are correctly extracted*
    const ctx = GqlExecutionContext.create(context); // *NEW CODE ADDED*
    const req = ctx.getContext().req; // *Ensure req is correctly accessed*

    if (!req) {
      this.logger.error('Request object is undefined in GraphQL context');
      throw new UnauthorizedException('Unauthorized');
    }

    const user = req.user;
  
      if (!user) {
        this.logger.warn('User not found in request');
        throw new UnauthorizedException('Unauthorized');
      }
  
      // Get required roles and permissions from metadata
      const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);
      const requiredPermissions = this.reflector.getAllAndOverride<Permission[]>(
        PERMISSIONS_KEY,
        [context.getHandler(), context.getClass()]
      );
  
      // Check roles
      if (requiredRoles && !this.hasRequiredRoles(user.roles, requiredRoles)) {
        this.logger.warn(`Access denied for user ${user.id}: insufficient roles`);
        throw new ForbiddenException('Access denied: insufficient roles');
      }
  
      // Check permissions
      if (
        requiredPermissions &&
        !this.hasRequiredPermissions(user.permissions, requiredPermissions)
      ) {
        this.logger.warn(
          `Access denied for user ${user.id}: insufficient permissions`
        );
        throw new ForbiddenException('Access denied: insufficient permissions');
      }
  
      this.logger.info(
        `Access granted to user ${user.id} for ${context.getHandler().name}`
      );
      return true;
    }
  
    private hasRequiredRoles(userRoles: Role[], requiredRoles: Role[]): boolean {
      // Check if user has at least one of the required roles
      const hasRoles = requiredRoles.some((role) => userRoles.includes(role));
      return hasRoles;
    }
  
    private hasRequiredPermissions(
      userPermissions: Permission[],
      requiredPermissions: Permission[]
    ): boolean {
      // Check if user has all the required permissions
      const hasPermissions = requiredPermissions.every((permission) =>
        userPermissions.includes(permission)
      );
      return hasPermissions;
    }
  }  