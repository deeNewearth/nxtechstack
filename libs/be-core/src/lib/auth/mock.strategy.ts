// libs/be-core/src/lib/auth/mock.strategy.ts

import { Strategy } from 'passport-custom';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Role } from '../rbac/roles.enum';
import { Permission } from '../rbac/permissions.enum';

@Injectable()
export class MockStrategy extends PassportStrategy(Strategy, 'mock') {
  constructor() {
    super();
  }

  async validate(req: Request): Promise<any> {
    // Parse multiple roles and permissions from headers
    const roleHeader = req.headers['x-mock-role'];
    const permissionHeader = req.headers['x-mock-permission'];

    const roles = roleHeader
      ? (Array.isArray(roleHeader) ? roleHeader : roleHeader.split(',')).map((role) => role.trim() as Role)
      : [Role.Guest];

    const permissions = permissionHeader
      ? (Array.isArray(permissionHeader) ? permissionHeader : permissionHeader.split(',')).map((permission) => permission.trim() as Permission)
      : [Permission.Read];

    const user = {
      id: '123',
      roles,
      permissions,
    };

    return user; // Passport will attach this user to req.user
  }
}